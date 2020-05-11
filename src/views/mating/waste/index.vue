<template>
  <div style="height:100%">
    <work-order :is-pulate="true">
      <template slot="manipulate">
        <condition :assembly-state="false" @search="search" />
      </template>
      <div slot="cMain" ref="main" style="height:100%">
        <dee-tools id="tools" ref="tools" :tools="tools" mode="normal" />
        <features-legend :legend="legend" @handleSelect="handleSelect" />
        <gantt :gantt-columns="ganttColumns" :gantt-data="ganttData" :gantt-height="ganttHeight" />
      </div>
    </work-order>
    <dee-dialog :title="'开工条件检查'" :dialog-visible="dialogVisible" @handleClose="handleClose">
      <start-work />
    </dee-dialog>
  </div>

</template>

<script>
import workOrder from '@/business-components/mating/workOrder'
import condition from '@/business-components/mating/condition'
import gantt from '@/business-components/gantt'
import featuresLegend from '@/business-components/plan/featuresLegend'
import startWork from './components/startWork'
export default {
  components: { workOrder, condition, gantt, featuresLegend, startWork },
  props: {},
  data() {
    return {
      ganttHeight: {
        height: ''
      },
      dialogVisible: false,
      tools: [
        {
          type: 'icon',
          name: '保存',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
            }
          }
        },
        {
          type: 'icon',
          name: '开工条件检查',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              console.log(111)
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
            }
          }
        },
        {
          type: 'icon',
          name: '撤销下达',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
            }
          }
        },
        {
          type: 'icon',
          name: '计划更新',
          icon: '/icons/check.png',
          handler: {
            click: () => {
            }
          }
        },
        {
          type: 'icon',
          name: '站位调整',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
            }
          }
        },
        {
          type: 'icon',
          name: '工程更改',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
            }
          }
        },
        {
          type: 'icon',
          name: '待处理问题',
          icon: '/icons/check.png',
          handler: {
            click: () => {
            }
          }
        }
      ],
      legend: [
        { name: '已生成', style: { 'background-color': 'teal' }},
        { name: '已下达', style: { 'background-color': 'blue' }},
        { name: '已开工', style: { 'background-color': 'red' }},
        { name: '已完工', style: { 'background-color': 'yellow' }},
        { name: '已保留', style: { 'background-color': 'black' }},
        { name: '已超期', style: { 'background-color': 'pink' }},
        { name: '旗子', type: 'image' },
        { name: '关键路径', style: { 'background-color': 'orange' }}
      ]
    }
  },

  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.ganttHeight.height = `${this.$refs.main.clientHeight - 66}px`
    })
  },
  methods: {
    handleOpenDialog() {
      this.dialogVisible = true
    },

    handleClose() {
      this.dialogVisible = false
    }
  }
}

</script>
<style lang='scss'>
</style>
