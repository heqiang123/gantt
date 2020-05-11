<template>
  <div>
    <div :ref="refgantt" :key="key" :style="ganttHeight" />
  </div>
</template>
<script>
import eventBus from '@/utils/eventBus'
import gantt from 'dhtmlx-gantt' // 引入模块
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip.js'
import 'dhtmlx-gantt/codebase/locale/locale_cn' // 本地化
export default {
  name: 'DhtmlxGantt',
  props: {
    refgantt: {
      type: String,
      default: () => {
        return 'gantt'
      }
    },
    ganttColumns: {
      type: Array,
      default: () => {
        return []
      }
    },
    ganttData: {
      type: Array,
      default: () => {
        return []
      }
    },
    ganttHeight: {
      type: Object,
      default: () => {
        return {
          height: '600px'
        }
      }
    },
    links: {
      type: Array,
      default: () => {
        return []
      }
    },
    scale: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    isSubscales: {
      type: Boolean,
      default: () => {
        return false
      }
    }
    // dialogVisible: {
    //   type: Boolean,
    //   default: () => {
    //     return false
    //   }
    // }
  },
  data() {
    return {
      selectData: [],
      tasks: {
        data: []
        // links: [
        //   { id: 1, source: 1, target: 2, type: '0' }
        // ]
      },
      state: {
        isMount: false
      }
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
  },
  watch: {
    ganttData(val) {
      this.reload()
      gantt.clearAll()
      this.$nextTick(() => {
        gantt.init(this.$refs[this.refgantt])
      })
      gantt.config.redo = true
      gantt.config.start_date = val[0].start_date
      this.tasks.data = val
      gantt.parse(this.tasks)
    },
    ganttColumns(val) {
      gantt.config.redo = true
      gantt.config.columns = val
    },
    dialogVisible(val) {
      if (!val) {
        gantt.init(this.$refs.refgantt)
      } else {
        gantt.init(this.$refs.gantt)
      }
    },
    isSubscales(val) {
      if (val) {
        gantt.config.scale_unit = 'week'
        gantt.config.date_scale = '第%w周'
      }
    }
  },
  mounted() {
    this.reload()
    this.tasks.links = this.links
    this.tasks.data = this.ganttData
    gantt.templates.tooltip_text = function(start, end, task) {
      return `<div class="gantt-box">
                <div class="box-left">
                  <div class="left-label">
                    <div><b>物料编号:</b></div>
                    <div><b>牌号:</b></div>
                    <div><b>技术条件:</b></div>
                    <div><b>需求数量:</b></div>
                    <div><b>库存数量:</b></div>
                  </div>
                  <div class="left-value">
                    <div>${task.personName}</div>
                    <div>${task.personName}</div>
                    <div>${task.personName}</div>
                    <div>${task.personName}</div>
                    <div>${task.personName}</div>
                  </div>
                </div>
                <div class="box-right" style="margin-left: 16px">
                  <div class="right-label">
                    <div><b>库存名称:</b></div>
                    <div><b>规格:</b></div>
                    <div><b>供应商:</b></div>
                    <div><b>需求时间:</b></div>
                    <div><b>可用数量:</b></div>
                  </div>
                  <div class="right-value">
                    <div>${task.personName}</div>
                    <div>${task.personName}</div>
                    <div>${task.personName}</div>
                    <div>${task.personName}</div>
                    <div>${task.personName}</div>
                  </div>
                </div>
              </div>`
    }
    // gantt.config.readonly = true
    // gantt.config.show_chart = false

    gantt.config.date_format = '%Y-%m-%d'
    gantt.config.show_progress = false
    gantt.config.columns = JSON.parse(JSON.stringify(this.ganttColumns))

    // gantt.config.min_column_width = 60
    if (this.isSubscales) {
      gantt.config.scale_unit = 'week'
      gantt.config.date_scale = '第%w周'
      // gantt.config.subscales = [
      //   {
      //     unit: 'week',
      //     step: 1,
      //     date: '第%w周'
      //   }
      // ]
    } else {
      if (this.scale) {
        gantt.config.scale_unit = 'month'
        gantt.config.date_scale = '%Y.%m'
      } else {
        gantt.config.scale_unit = 'day'
        gantt.config.date_scale = '%Y.%m.%d'
      }
      gantt.config.start_date = new Date(2020, 0, 1)
      gantt.config.end_date = new Date(2023, 11, 31)
      const weekScaleTemplate = function(date) {
        const dateToStr = gantt.date.date_to_str('%W')
        const dateWeek = dateToStr(gantt.date.add(date, 1, 'week'))
        return Number(dateWeek) % 4 === 0 ? '第4周' : `第${Number(dateWeek) % 4}周`
      }
      gantt.config.subscales = [
        {
          unit: 'week',
          step: 1,
          template: weekScaleTemplate
        }
      ]
    }

    gantt.templates.task_text = function(start, end, task) {
      if (task.correlation) {
        return '<div class="correlation-flag">' + task.text + '</div><img class="aqizi" src="/image/qizi.png">'
      } else {
        return '<div>' + task.text + '</div>'
      }
    }
    if (this.state.isMount) {
      gantt.clearAll()
    }
    this.$nextTick(() => {
      gantt.init(this.$refs[this.refgantt])
    })
    gantt.attachEvent('onTaskDrag', function(id, mode, task, original) {
      eventBus.$emit('taskDrag', task)
      console.log(id, mode, task, original)
    // any custom logic here
    })

    gantt.attachEvent('onTaskSelected', function(id) {
      eventBus.$emit('taskSelect', id)
      console.log('xrze', id)
    // any custom logic here
    })

    // 数据解析
    gantt.parse(this.tasks)
    this.state.isMount = true
  },
  destroyed() {
    gantt.clearAll()
    this.reload()
    gantt.config.columns.forEach(res => {
      this.$set(res, 'width', '18')
    })
  },
  methods: {
    reload() {
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss">
  .gantt-box {
    display: flex;
    height: 150px;
    .box-left, .box-right {
      display: flex;
      height: 30px;
      align-items: center;
      .left-value, .right-value {
        margin-left: 8px;
        height: 30px;
        line-height: 30px;
      }
      .left-label, .right-label {
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .link_layer{
    background: #000;
  }
  .correlation-flag{
    width: 100%;
  }
  .aqizi{
    position: absolute;
    top: 0;
    width: 20px;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0px;
  }
</style>
