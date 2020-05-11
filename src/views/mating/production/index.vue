<template>
  <div ref="production" class="production">
    <dee-table
      ref="multipleTable"
      :columns="productionColumns"
      :data="productionData"
      :options="options"
      :selection-row="selectionRow"
      @row-click="handleRowClick"
      @row-dblclick="handleRowDblclick"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <dee-tools
        id="tools"
        slot="header"
        ref="tools"
        :tools="tools"
        mode="normal"
      />
    </dee-table>
    <div style="width:100%;height:40px;align-items:center;display:flex;justify-content: flex-end;font-size: 14px">当前总条数:{{ productionData.length }}</div>
    <div style="height:2px;width:100%;background-color:#EBEEF5" />
    <dee-table :options="options1" :row-calss-state="true" :columns="productionBotColumns" :data="productionBotData">
      <div slot="header" class="production-header">
        <dee-tools
          id="tools"
          ref="tools"
          style="width:50%"
          :tools="toolsBottom"
          mode="normal"
        />
        <features-legend style="width:50%;padding-top:8px" :legend="legend" />
      </div>
    </dee-table>
    <div style="width:100%;height:40px;align-items:center;display:flex;justify-content: flex-end;font-size: 14px">当前总条数:{{ productionBotData.length }}</div>
    <dee-dialog :title="'编辑'" :dialog-visible="dialogVisible" @handleClose="handleClose">
      <production-dialog :dialog-visible="dialogVisible" :production-data="productionData" :select-data="selectData" @commit="handleCommit" @cancle="handleCancle" />
    </dee-dialog>
  </div>
</template>
<script>
import featuresLegend from '@/business-components/plan/featuresLegend'
import productionDialog from './components/productionDialog'
import { getProduction, getPlanProduction } from '@/api/mating'
import { compare } from '@/utils/util'
export default {
  name: 'Production',
  components: { featuresLegend, productionDialog },
  data() {
    return {
      selectionRow: {},
      selectData: [],
      options: {
        height: '1px'
      },
      options1: {
        maxHeight: '1px',
        height: '1px'
      },
      dialogVisible: false,
      tools: [
        {
          type: 'icon',
          name: '添加',
          icon: '/icons/c-backups3.png',
          handler: {
            click: () => {
              this.productionData.push({
                // id: this.productionData.length + 1,
                id: `JHAG600${this.$moment(new Date()).format('YYYY-MM-DD')}011`,
                type: '',
                batches: '',
                manufacturing: '',
                name: '',
                deliverTime: '',
                preparationTime: this.$moment(new Date()).format('YYYY-MM-DD'),
                preparationPerson: '编辑'
              })
              this.$nextTick(() => {
                this.$refs.multipleTable.$refs.deeTable.bodyWrapper.scrollTop = this.$refs.multipleTable.$refs.deeTable.bodyWrapper.scrollHeight
              })
            }
          }
        },
        {
          type: 'icon',
          name: '编辑',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              this.handleEdit()
            }
          }
        },
        {
          type: 'icon',
          name: '删除',
          icon: '/icons/c-newchangeapp.png',
          handler: {
            click: () => {
              this.handleDel()
            }
          }
        },
        {
          type: 'icon',
          name: '送审',
          icon: '/icons/o-doc.png',
          handler: {
            click: () => {
              if (this.selectData.length === 0) {
                this.$message.error('请至少选择一项数据')
              } else {
                const prepareData = this.selectData.filter(res => {
                  return res.preparationPerson === '编辑'
                })
                if (prepareData.length === 0) {
                  this.$message.error('当前状态不可送审')
                } else {
                  this.$confirm('确认送审吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.selectData.forEach(sel => {
                      sel.preparationPerson = '审批中'
                    })
                    this.$message({
                      type: 'success',
                      message: '送审成功!'
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消送审'
                    })
                  })
                }
              }
            }
          }
        },
        {
          type: 'icon',
          name: '下达',
          icon: '/icons/o-doc.png',
          handler: {
            click: () => {
              if (this.selectData.length === 0) {
                this.$message.error('请至少选择一项数据')
              } else {
                const prepareData = this.selectData.filter(res => {
                  return res.preparationPerson === '审批中'
                })
                if (prepareData.length === 0) {
                  this.$message.error('当前状态不可下达')
                } else {
                  this.$confirm('确认下达吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.selectData.forEach(sel => {
                      sel.preparationPerson = '已下达'
                    })
                    this.$message({
                      type: 'success',
                      message: '下达成功!'
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消下达'
                    })
                  })
                }
              }
            }
          }
        }
      ],
      toolsBottom: [],
      // toolsBottom: [
      //   {
      //     type: 'icon',
      //     name: '保存',
      //     icon: '/icons/c-backups3.png',
      //     handler: {
      //       click: () => {
      //         this.$confirm('是否保存?', '提示', {
      //           confirmButtonText: '确定',
      //           cancelButtonText: '取消',
      //           type: 'warning'
      //         }).then(() => {
      //           this.$message({
      //             type: 'success',
      //             message: '保存成功!'
      //           })
      //         }).catch(() => {
      //           this.$message({
      //             type: 'info',
      //             message: '已取消保存'
      //           })
      //         })
      //       }
      //     }
      //   }
      // ],
      productionColumns: [
        { title: '计划号', key: 'id' },
        { title: '机型', key: 'type', component: { name: 'el-input' }},
        { title: '批架次', key: 'batches', component: { name: 'el-input' }},
        { title: '制造架次', key: 'manufacturing', component: { name: 'el-input' }},
        { title: '要求交付日期', key: 'deliverTime', component: { name: 'el-date-picker' }},
        { title: '客户名称', key: 'name', component: { name: 'el-input' }},
        { title: '编制时间', key: 'preparationTime' },
        { title: '状态', key: 'preparationPerson' }
      ],
      productionData: [],
      legend: [
        { name: '理论工期不足', style: { background: '#E6A568' }}
      ],
      productionBotColumns: [
        { title: '站位', key: 'standerd' },
        { title: '计算开工', key: 'startTime' },
        { title: '计算完工', key: 'endTime' },
        { title: '是否超时', key: 'timeOut' },
        { title: '计划开工', key: 'planStartTime',
          component: {
            name: 'el-date-picker'
          }},
        { title: '计划完工', key: 'planEndTime', component: {
          name: 'el-date-picker'
        }},
        { title: '当前状态', key: 'state' },
        { title: 'AO数量', key: 'AONum' }
      ],
      productionBotData: []
    }
  },
  mounted() {
    this.getProduction()
    this.$nextTick(() => {
      this.options.height = `${this.$refs.production.clientHeight / 2 - 64}px`
      this.options1.maxHeight = `${this.$refs.production.clientHeight / 2 - 84}px`
      this.options1.height = `${this.$refs.production.clientHeight / 2 - 100}px`
    })
  },
  methods: {
    getProduction() {
      getProduction().then(res => {
        this.productionData = res.data.items
        getPlanProduction(res.data.items[0].batches).then(pol => {
          this.productionBotData = pol.data.data
        })
      })
    },

    handleRowClick(row, event, column) {
      if (!row.name || !row.type || !row.batches || !row.manufacturing ||
      !row.deliverTime || !row.preparationTime) {
        this.productionBotData = []
      } else {
        getPlanProduction(row.batches).then(pol => {
          this.productionBotData = pol.data.data
        })
      }
    },

    handleRowDblclick(row, event, column) {
      if (row.show) {
        this.$set(row, 'show', false)
        this.$message.success('保存成功')
        console.log('last', this.productionData.slice(this.productionData.length - 1))
        this.$store.dispatch('fitting/changeSetting', { productionBotData: this.productionData.slice(this.productionData.length - 1) })
        getPlanProduction(row.batches).then(pol => {
          this.productionBotData = pol.data.data
        })
      } else {
        this.$set(row, 'show', true)
      }
    },

    handleClose() {
      this.dialogVisible = false
      this.selectData = []
      this.$refs.multipleTable.$refs.deeTable.clearSelection()
    },

    handleCommit(val) {
      this.productionData = this.productionData.filter(f => {
        return this.selectData.every(s => s.id !== f.id)
      })
      this.selectData.forEach(s => {
        s.id = val.id
        s.type = val.type
        s.batches = val.batches
        s.manufacturing = val.manufacturing
        s.name = val.name
        s.deliverTime = val.deliverTime
        s.preparationTime = val.preparationTime
        s.preparationPerson = val.preparationPerson
      })
      this.productionData = this.productionData.concat(this.selectData)
      this.productionData = this.productionData.sort(compare('id'))
      this.$refs.multipleTable.$refs.deeTable.clearSelection()
      this.selectData = []
      this.dialogVisible = false
    },

    handleCancle() {
      this.dialogVisible = false
      this.selectData = []
      this.$refs.multipleTable.$refs.deeTable.clearSelection()
    },

    handleSelect(selection) {
      this.selectData = selection
    },

    handleSelectAll(selection) {
      this.selectData = selection
    },

    handleDel() {
      if (this.selectData.length === 0) {
        this.$message.error('请至少选择一项数据')
      } else {
        this.productionData = this.productionData.filter(f => {
          return this.selectData.every(s => s.id !== f.id)
        })
      }
      this.selectData = []
    },

    handleEdit() {
      if (this.selectData.length === 0) {
        this.$message.error('请至少选择一项数据')
      } else {
        this.dialogVisible = true
        this.title = '编辑'
      }
    }

  }
}
</script>
<style lang="scss">
  .production {
    height: 100%;
    width: 100%;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 8px;
    .features-legend {
      margin: 0!important;
      .legend-legend li {
        height: 19px!important;
      }
    }
    &-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
