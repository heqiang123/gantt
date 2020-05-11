<template>
  <div style="height:100%">
    <structure-tree class="management-page" :is-pulate="true" :legend="true" :tree-data="treeData" :image-data="imageData" :is-show-search="isShowSearch" @node-click="handleClick">
      <div slot="manipulate" class="manipulate">
        <dee-tools
          id="tools"
          ref="tools"
          :tools="tools"
          mode="normal"
        />
      </div>
      <div slot="cMain" ref="tableTop" class="cMain">
        <dee-table
          slot="top"
          class="pane top-pane"
          :columns="scheduleColumns"
          :data="scheduleData"
          @row-click="handledbclick"
        >
          <management-filter slot="header" style="width:100%" :qitao-length="qitaoLength" :gz-length="gzLength" @setqt="handlesetqt" @setgz="handlesetgz" @setlong="handlesetlong" />
        </dee-table>
        <div style="width:100%;height:40px;align-items:center;display:flex;justify-content: flex-end;font-size: 14px">当前总条数:{{ scheduleData.length }}</div>
        <div class="table-bottom">
          <condition class="bottom-condtion" :assembly-gz="true" @search="search" />
          <dee-tab slot="bottom" :tabs="tabs" class="tab-height">
            <div slot="0">
              <management-all />
            </div>
            <div slot="1">
              <management-out />
            </div>
            <div slot="2">
              <management-stand />
            </div>
            <div slot="3">
              <management-orign />
            </div>
          </dee-tab>
        </div>
      </div>
    </structure-tree>
    <dee-dialog :title="'最长路径'" width="60%" :dialog-visible="dialogVisible" @handleClose="handleClose">
      <dee-table :columns="longestColumns" :data="longestData" />
    </dee-dialog>
  </div>
</template>
<script>
import structureTree from '@/business-components/plan/structureTree'
import condition from '@/business-components/mating/condition'
import managementFilter from './components/managementFilter'
import eventBus from '@/utils/eventBus'
import { getManage } from '@/api/mating'
import { getTree } from '@/api/tree'
export default {
  name: 'Management',
  components: { structureTree, condition, managementFilter },
  data() {
    return {
      offset: 0.5,
      standShow: false,
      isScreen: true,
      isShowSearch: true,
      dialogVisible: false,
      radio: '',
      treeData: [],
      options: {
        height: ''
      },
      imageData: [
        { type: 'AG600', image: '/icons/airpane.png' }
      ],
      serFormConfig: [
        {
          component: 'el-input',
          key: 'AONum',
          title: 'AO编号'
        }, {
          component: 'el-date-picker',
          key: 'start_time',
          title: '开工时间'
        }, {
          component: 'el-date-picker',
          key: 'display_time',
          title: '完工时间'
        }
      ],
      scheduleColumns: [
        { title: 'AO号', key: 'type' },
        { title: '站位', key: 'stand', width: '50' },
        { title: '齐套', key: 'setBox', width: '50' },
        { title: '关重件齐套', key: 'setBoxgz', width: '100' },
        { title: '计划开始时间', key: 'planStart' },
        { title: '计划结束时间', key: 'planEnd' },
        { title: '要求配置时间', key: 'requireTime' },
        { title: '配置单号', key: 'number' }
      ],
      scheduleData: [],
      longestColumns: [
        { title: '序号', width: '50px', key: 'id' },
        { title: '齐套', key: 'prepareState' },
        { title: '关重件齐套', key: 'problemState' },
        { title: 'AO编号', key: 'AONum' },
        { title: '计划开始时间', key: 'planStartTime' },
        { title: '计划结束时间', key: 'planEndTime' },
        { title: '前置节点', key: 'deliverNum' },
        { title: '实际开始时间', key: 'activeStart' },
        { title: '实际结束时间', key: 'activeEnd' }
      ],
      longestData: [],
      qitaoLength: 0,
      gzLength: 0,
      tools1: [
        {
          type: 'icon',
          name: '生成',
          icon: '/icons/c-backups3.png',
          handler: {
            click: () => {
              this.$confirm('确认生成吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '生成成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消生成'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '生效',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              this.$confirm('确认生效吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '生效成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消生效'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '需求更新',
          icon: '/icons/c-newchangeapp.png',
          handler: {
            click: () => {
              this.$confirm('确认需求更新吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '需求更新成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消需求更新'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '配套申请',
          icon: '/icons/o-doc.png',
          handler: {
            click: () => {
              this.$confirm('确认配套申请吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '配套申请成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消配套申请'
                })
              })
            }
          }
        }
      ],
      tools2: [
        {
          type: 'icon',
          name: '返回',
          icon: '/icons/c-backups3.png',
          handler: {
            click: () => {
              this.$router.push({
                name: 'simulation'
              })
            }
          }
        }
      ],
      title: 'BBOM-AG600-001',
      formData: [
        {
          split: 1,
          data: [
            {
              title: '编号',
              key: 'number',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      form: {
        number: ''
      },
      tabs: [
        {
          name: '全部清单',
          id: '0',
          data: [
            { path: 'managementAll.vue' }
          ]
        },
        {
          name: '外购成品缺件',
          id: '1',
          data: [
            { path: 'managementOut.vue' }
          ]
        },
        {
          name: '标准件缺件',
          id: '2',
          data: [
            { path: 'managementStand.vue' }
          ]
        },
        {
          name: '元器件缺件',
          id: '3',
          data: [
            { path: 'managementOrign.vue' }
          ]
        }
      ]
    }
  },
  computed: {
    tools() {
      return this.$route.query.flag ? this.tools2 : this.tools1
    }
  },
  mounted() {
    this.getManage()
    this.getPartTree('AG600')
    if (screen.width === 1920) {
      this.isScreen = true
    } else {
      this.isScreen = false
    }
    if (this.$route.query.flag) {
      this.isShowSearch = false
    } else {
      this.isShowSearch = true
    }
    this.$nextTick(() => {
      this.options.height = `${this.$refs.tableTop.clientHeight / 2 - 176}px`
    })
  },
  methods: {
    getManage() {
      getManage().then(res => {
        this.scheduleData = res.data.items.model
        this.longestData = res.data.items.longest
        const qitao = this.scheduleData.filter(res => {
          return res.setBox === '是'
        })
        const gz = this.scheduleData.filter(res => {
          return res.setBoxgz === '是'
        })
        this.qitaoLength = qitao.length
        this.gzLength = gz.length
        this.scheduleData.forEach((scg, index) => {
          switch (index) {
            case 0:
              scg.stand = '31'
              break
            case 1:
              scg.stand = '41'
              break
            case 2:
              scg.stand = '51'
              break
            case 3:
              scg.stand = '52'
              break
            case 4:
              scg.stand = '53'
              break
            case 5:
              scg.stand = '54'
              break
            default:
              break
          }
        })
        if (this.title.indexOf('31') > -1) {
          this.scheduleData.forEach(res => {
            this.$set(res, 'stand', 31)
            // res.stand = 31
          })
        } else if (this.title.indexOf('41') > -1) {
          this.scheduleData.forEach(res => {
            this.$set(res, 'stand', 41)
            // res.stand = 41
          })
        } else if (this.title.indexOf('51') > -1) {
          this.scheduleData.forEach(res => {
            this.$set(res, 'stand', 51)
            // res.stand = 51
          })
        } else if (this.title.indexOf('52') > -1) {
          this.scheduleData.forEach(res => {
            this.$set(res, 'stand', 52)
            // res.stand = 52
          })
        } else if (this.title.indexOf('53') > -1) {
          this.scheduleData.forEach(res => {
            this.$set(res, 'stand', 53)
            // res.stand = 53
          })
        } else if (this.title.indexOf('54') > -1) {
          this.scheduleData.forEach(res => {
            this.$set(res, 'stand', 54)
            // res.stand = 54
          })
        }
        // this.scheduleData.push()
      })
    },

    handleClick(data, node, event) {
      this.title = data.label
      this.getManage()
      eventBus.$emit('getFilter', data.label)
      console.log(data)
      // await this.selectStand(data)
      // this.scheduleData.push()
    },

    handledbclick(row, column, event) {
      eventBus.$emit('dbclickAO', row)
    },

    search() {
      eventBus.$emit('clickgz')
    },

    getPartTree(data) {
      getTree(data).then(res => {
        this.treeData = res.data
      })
    },

    handlesetqt() {
      const qitao = this.scheduleData.filter(res => {
        return res.setBox === '是'
      })
      const feiqitao = this.scheduleData.filter(res => {
        return res.setBox === '否'
      })
      this.scheduleData = [...qitao, ...feiqitao]
    },

    handlesetgz() {
      const gz = this.scheduleData.filter(res => {
        return res.setBoxgz === '是'
      })
      const feigz = this.scheduleData.filter(res => {
        return res.setBoxgz === '否'
      })
      this.scheduleData = [...gz, ...feigz]
    },

    handlesetlong() {
      this.dialogVisible = true
    },

    handleClose() {
      this.dialogVisible = false
    }

  }
}
</script>
<style lang="scss">
 .management-page{
     .manipulate{
         display: flex;
         justify-content: flex-end;
     }
     .cMain{
         height: 100%;
     }
     .tab-height {
       height: calc(100% - 80px);
     }
     .table-bottom {
       position: relative;
       margin-top: 10px;
       .bottom-condtion {
         width: 60%;
         position: absolute;
         z-index: 1;
         right: 20px;
         top: -14px;
         .btn-button {
           height: 30px;
         }
        .el-form-item__content {
          height: 28px;
          line-height: 28px;
          .el-input__icon {
            line-height: 28px;
          }
        }
        .el-form-item__label {
          font-size: 14px;
          line-height: 28px;
        }
        .el-input__inner {
          height: 28px;
          line-height: 28px;
        }
       }
       .bottom-radio {
         position: absolute;
         z-index: 2;
         left: 468px;
         top: 4px;
       }
       .bottom-Screen {
         position: absolute;
         z-index: 2;
         left: 468px;
         top: 4px;
       }
     }
 }
</style>
