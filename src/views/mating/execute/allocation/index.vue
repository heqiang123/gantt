/**
* @Description:
* @author cxg
* @date 2020/04/10
*/
<template>
  <div
    ref="allocation"
    v-loading="loading"
    class="allocation"
    element-loading-text="自动分配中。请稍后"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="allocation-condtion">
      <div class="condtion-form">
        <dee-form :form-data="formData" :form="form" :form-buttons="formButtons" :form-btn-position="formBtnPosition" />
      </div>
      <div class="condition-button">
        <el-button size="mini" type="primary" @click="search">查询</el-button>
        <el-button size="mini" type="primary" @click="search">清空</el-button>
      </div>
    </div>
    <dee-table
      :index-row="{title: '序号' }"
      :row-calss-state="true"
      :columns="allocationColumns"
      :data="allocationData"
      :options="options"
      :selection-row="selectionRow"
      @select="hanleSelect"
      @select-all="handleSelectAll"
      @row-click="handledbclick"
    >
      <features-legend slot="header" :legend-btn="true" :legend="legend" :features-btn="featuresBtn" @handleSelect="handleSelect" />
    </dee-table>
    <div style="width:100%;height:40px;align-items:center;display:flex;justify-content: flex-end;font-size: 14px">当前总条数:{{ allocationData.length }}</div>
    <dee-table :index-row="{title: '序号' }" :columns="allocationMarColumns" :data="allocationMarData" style="margin-top: 8px" />
    <div style="width:100%;height:40px;align-items:center;display:flex;justify-content: flex-end;font-size: 14px">当前总条数:{{ allocationMarData.length }}</div>
  </div>
</template>

<script>
import featuresLegend from '@/business-components/plan/featuresLegend'
import { getAllocaTion } from '@/api/mating'
export default {
  name: 'Allocation',
  components: { featuresLegend },
  data() {
    return {
      offset: 0.5,
      loading: false,
      formData: [
        {
          split: 4,
          data: [
            {
              title: '物料号',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '物料名称',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '牌号',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '技术状态',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      form: {},
      allocationColumns: [
        { title: '物料号', key: 'number' },
        { title: '物料名称', key: 'name' },
        { title: '牌号', key: 'grade' },
        { title: '规格', key: 'norm' },
        { title: '技术条件', key: 'conditions' },
        { title: '需求数量', key: 'demandNum' },
        { title: '分配数量', key: 'distribution' },
        { title: '计量单位', key: 'unit' },
        { title: '需求来源', key: 'demandOrigin' },
        { title: '当前状态', key: 'state' }
      ],
      allocationData: [],
      options: {
        height: ''
      },
      allocationMarColumns: [
        { title: '物料号', key: 'number' },
        { title: '物料名称', key: 'name' },
        { title: '库存编号', key: 'stockNum' },
        { title: '库存名称', key: 'stockName' },
        { title: '库房', key: 'stock' },
        { title: '库位', key: 'stockPosition' },
        { title: '质量编号', key: 'qualityNum' },
        { title: '库存数量', key: 'stockCount' },
        { title: '可用数量', key: 'useCount' },
        { title: '分配数量', key: 'deandCount' }
      ],
      allocationMarData: [],
      legend: [
        { name: '已满足', style: { background: '#88c8e7' }},
        { name: '未满足', style: { background: '#debc7c' }}
      ],
      featuresBtn: [
        { name: '返回' },
        { name: '自动分配' },
        { name: '全部占用' },
        { name: '分配' },
        { name: '取消分配' },
        { name: '占用' },
        { name: '取消占用' },
        { name: '出库登账' }
      ],
      selectionRow: {},
      section: []
    }
  },

  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.options.height = `${this.$refs.allocation.clientHeight / 2 - 34}px`
    })
    this.getAllocaTion()
  },
  methods: {
    getAllocaTion() {
      getAllocaTion().then(res => {
        this.allocationData = res.data.items.model
        this.allocationMarData = res.data.items.standing
      })
    },

    handleSelect(val) {
      if (val === '返回') {
        this.$router.push({
          path: 'alloca'
        })
      } else if (val === '自动分配') {
        this.$confirm(`确认${val}吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          const time = setTimeout(() => {
            this.$message({
              type: 'success',
              message: `${val}成功!`
            })
            this.loading = false
            clearTimeout(time)
          }, 3000)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: `已取消${val}`
          })
        })
      } else if (val === '占用' || val === '取消分配') {
        if (this.section.length === 0) {
          this.$message.error('请至少选择一项')
        } else {
          const occupy = this.section.filter(occ => {
            return occ.state !== '已分配'
          })
          if (occupy.length > 0) {
            this.$message.error(`当前状态不可${val}`)
          } else {
            this.$confirm(`确认${val}吗?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (val === '占用') {
                this.section.forEach(sec => {
                  sec.state = '已占用'
                })
              } else if (val === '取消分配') {
                this.section.forEach(sec => {
                  sec.state = '未分配'
                })
              }
              this.$message({
                type: 'success',
                message: `${val}成功!`
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: `已取消${val}`
              })
            })
          }
        }
      } else if (val === '取消占用') {
        if (this.section.length === 0) {
          this.$message.error('请至少选择一项')
        } else {
          const occupyData = this.section.filter(occ => {
            return occ.state !== '已占用'
          })
          if (occupyData.length > 0) {
            this.$message.error(`当前状态不可${val}`)
          } else {
            this.$confirm(`确认${val}吗?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.section.forEach(sec => {
                sec.state = '未占用'
              })
              this.$message({
                type: 'success',
                message: `${val}成功!`
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: `已取消${val}`
              })
            })
          }
        }
      } else if (val === '出库登账') {
        this.$confirm(`确认${val}吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: `${val}成功!`
          })
          this.$router.push({
            path: 'alloca'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: `已取消${val}`
          })
        })
      } else {
        if (this.section.length === 0) {
          this.$message.error('请至少选择一项')
        } else {
          this.$confirm(`确认${val}吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: `${val}成功!`
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: `已取消${val}`
            })
          })
        }
      }
    },

    handledbclick(row, column, event) {
      getAllocaTion().then(res => {
        this.allocationMarData = res.data.items.standing
      })
    },

    hanleSelect(section) {
      this.section = section
    },

    handleSelectAll(section) {
      this.section = section
    }
  }
}

</script>
<style lang='scss'>
.allocation {
  height: 100%;
  width: 100%;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 8px;
  &-condtion {
    display:flex;
    align-items: center;
    .condtion-form {
      flex: 1;
      .el-form-item {
        margin-bottom: 0!important
      }
    }
    .condtion-button {
      width: 140px;
    }
  }
}

</style>
<style>
  .el-table .warning-row {
    background: red;
  }

.el-table .success-row {
  background: black;
}
</style>
