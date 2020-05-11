<template>
  <div class="process" style="height:100%">
    <div class="process-overview">
      <div class="overview-title">
        <span />
        <span>站位预览</span>
      </div>
      <div class="overview-stand">
        <div v-for="(item, index) in standData" :key="index" class="stand-image" :class="[active === index ? 'active' : '']" @click="handleChange(index)">
          <div class="image-position" :class="[active === index ? 'active-position' : '']">{{ item.position }}</div>
          <img :src="item.image">
          <div class="image-bottom">{{ item.content }}</div>
        </div>
      </div>
    </div>
    <div ref="main" class="process-concrete">
      <condition :assembly-state="false" @search="search" />
      <div class="concrete-title">
        <dee-tools id="tools" ref="tools" class="title-tools" :tools="tools" mode="normal" />
        <features-legend :legend="legend" class="title-legnd" @handleSelect="handleSelect" />
      </div>
      <gantt :gantt-columns="ganttColumns" :gantt-data="ganttData" :gantt-height="ganttHeight" :links="links" :scale="false" />
    </div>
    <dee-dialog :title="'开工条件检查'" :dialog-visible="dialogVisible" @handleClose="handleClose">
      <start-work />
    </dee-dialog>
    <dee-dialog :title="'站位调整'" :dialog-visible="dialogVisiblestand" @handleClose="handleClosestand">
      <dee-form :form-data="standformdata" :form="standform" />
      <div class="process-button">
        <el-button @click="dialogVisiblestand = false">保存</el-button>
        <el-button @click="dialogVisiblestand = false">取消</el-button>
      </div>
    </dee-dialog>
  </div>

</template>

<script>
import condition from '@/business-components/mating/condition'
import gantt from '@/business-components/gantt'
import startWork from './components/startWork'
import eventBus from '@/utils/eventBus'
import featuresLegend from '@/business-components/plan/featuresLegend'
import { getGantt } from '@/api/gantt'
export default {
  components: { condition, gantt, featuresLegend, startWork },
  props: {},
  data() {
    const that = this
    return {
      select: '',
      standformdata: [
        {
          split: 2,
          data: [
            {
              title: '目标站位',
              key: 'mubstand',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      standform: {
        currentstand: '',
        mubstand: ''
      },
      standData: [
        {
          image: '/icons/stand.png',
          content: 'AG600-第001架',
          position: '31站位'
        },
        {
          image: '/icons/stand.png',
          content: '',
          position: '41站位'
        },
        {
          image: '/icons/stand.png',
          content: '',
          position: '51站位'
        },
        {
          image: '/icons/stand.png',
          content: '',
          position: '52站位'
        },
        {
          image: '/icons/stand.png',
          content: '',
          position: '53站位'
        },
        {
          image: '/icons/stand.png',
          content: '',
          position: '54站位'
        }
      ],
      active: 0,
      ganttHeight: {
        height: ''
      },
      dialogVisible: false,
      dialogVisiblestand: false,
      ganttData: [],
      ganttColumns: [
        { name: 'id', width: 18, align: 'center', label: '序号' },
        { name: 'prepareState', width: 50, align: 'center', label: '准备状态' },
        { name: 'problemState', width: 50, align: 'center', label: '问题状态' },
        { name: 'AONum', width: 40, align: 'center', label: 'AO编号' },
        { name: 'planStartTime', width: 80, align: 'center', label: '计划开始时间' },
        { name: 'planEndTime', width: 80, align: 'center', label: '计划结束时间' },
        { name: 'deliverNum', width: 18, align: 'center', label: '前置节点' },
        { name: 'activeStart', width: 80, align: 'center', label: '实际开始时间' },
        { name: 'activeEnd', width: 80, align: 'center', label: '实际结束时间' }
      ],
      links: [
        { id: 1, source: 1, target: 2, type: '0' },
        { id: 2, source: 2, target: 3, type: '0' },
        { id: 3, source: 3, target: 4, type: '0' },
        { id: 4, source: 4, target: 5, type: '0' },
        { id: 5, source: 5, target: 6, type: '0' },
        { id: 6, source: 6, target: 7, type: '0' }
      ],
      tools: [
        {
          type: 'icon',
          name: '保存',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
              this.$confirm('确认保存吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '开工条件检查',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              this.handleOpenDialog()
            }
          }
        },
        {
          type: 'icon',
          name: '下达',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
              if (this.select === '') {
                that.$message.error('请至少选择一项')
              } else {
                this.$confirm('确认下达吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
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
        },
        {
          type: 'icon',
          name: '撤销下达',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
              if (this.select === '') {
                that.$message.error('请至少选择一项')
              } else {
                this.$confirm('确认撤销下达吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$message({
                    type: 'success',
                    message: '撤销下达成功!'
                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消撤销下达'
                  })
                })
              }
            }
          }
        },
        {
          type: 'icon',
          name: '计划更新',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              if (this.select === '') {
                that.$message.error('请至少选择一项')
              } else {
                this.$confirm('确认计划更新吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$message({
                    type: 'success',
                    message: '计划更新成功!'
                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消计划更新'
                  })
                })
              }
            }
          }
        },
        {
          type: 'icon',
          name: '站位调整',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
              if (this.select === '') {
                that.$message.error('请至少选择一项')
              } else {
                this.dialogVisiblestand = true
              }

              // this.getGantt()
            }
          }
        },
        {
          type: 'icon',
          name: '工程更改',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
              // this.getGantt()
            }
          }
        },
        {
          type: 'icon',
          name: '待处理问题',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              // this.getGantt()
            }
          }
        }
      ],
      legend: [
        // { name: '已生成', style: { 'background-color': 'teal' }},
        // { name: '已下达', style: { 'background-color': 'blue' }},
        // { name: '已开工', style: { 'background-color': 'red' }},
        // { name: '已完工', style: { 'background-color': 'yellow' }},
        // { name: '已保留', style: { 'background-color': 'black' }},
        // { name: '已超期', style: { 'background-color': 'pink' }},
        { name: '强关联', type: 'image' },
        { name: '关键路径', style: { 'background-color': 'orange' }}
      ]
    }
  },

  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.ganttHeight.height = `${this.$refs.main.clientHeight - 90}px`
      this.getGantt()
      eventBus.$on('taskSelect', target => {
        this.select = target
      })
    })
  },
  methods: {
    handleOpenDialog() {
      this.dialogVisible = true
    },

    handleClose() {
      this.dialogVisible = false
    },

    getGantt() {
      getGantt().then(res => {
        this.ganttData = res.data.processData
      })
    },

    handleChange(index) {
      this.active = index
      if (index === 0) {
        this.getGantt()
      } else {
        this.ganttData = []
      }
    },

    handleClosestand() {
      this.dialogVisiblestand = false
    },

    search() {
      console.log(1)
    },

    handleSelect() {
      console.log(1)
    }
  }
}

</script>
<style lang='scss' scoped>
.process {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-overview {
    height: 198px;
    padding: 14px 0 26px 0;
    background-color: #ffffff;
    margin-bottom: 8px;
    .overview-title {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      padding-left: 25px;
      font-size: 16px;
      color:rgba(40,41,43,1);
      font-weight: 700;
      span:first-child {
        display: inline-block;
        width:6px;
        height:15px;
        background:linear-gradient(180deg,rgba(66,118,206,1) 0%,rgba(47,104,167,1) 100%);
        border:0px solid rgba(151,151,151,1);
        margin-right: 4px;
      }
    }
    .overview-stand {
      display: flex;
      padding: 0 45px 0 10px;
      .stand-image {
        height: 129px;
        display: flex;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        position: relative;
        text-align: center;
        // width: 230px;
        width: calc(100% / 6 - 20px);
        margin: 0 20px;
        background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(255,255,255,1) 100%);
        border-radius:4px;
        border:1px solid rgba(221,221,221,1);
        .image-position {
          position: absolute;
          right: 0;
          top: 0;
          width: 33%;
          height:27px;
          line-height: 27px;
          color:rgba(255,255,255,1);
          background:rgba(189,189,189,1);
          font-size: 16px;
          box-shadow:2px 1px 8px 0px rgba(86,141,197,0.32);
          border-radius:1px;
          border:0px solid rgba(221,221,221,1);
        }
        .image-bottom {
          position: absolute;
          width: 100%;
          right: 0;
          bottom: 0;
          height:24px;
          background:linear-gradient(180deg,rgba(244,244,244,1) 0%,rgba(255,255,255,1) 100%);
          box-shadow:2px 1px 8px 0px rgba(86,141,197,0.32);
          border-radius:4px;
          border:0px solid rgba(221,221,221,1);
        }
      }
    }
  }
  &-concrete {
    padding: 0 8px;
    flex: 1;
    background-color: #ffffff;
    .concrete-title {
      display: flex;
      margin-bottom: 8px;
      .title-tools {
        flex: 1
      }
      .title-legnd {
        width: 200px;
      }

    }
  }
}
.active {
  box-shadow:2px 1px 8px 0px rgba(86,141,197,0.32)
}
.active-position {
  background:rgba(101,180,109,1)!important;
}
 .process-button {
   width: 100%;
   display: flex;
   justify-content: center;
 }
// /deep/.features-btn {
//   margin-bottom: 8px
// }
</style>
