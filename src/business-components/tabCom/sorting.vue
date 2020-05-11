<template>
  <div ref="sorting" style="height:100%">
    <!-- <features-legend :legend="legend" @handleSelect="handleSelect" /> -->
    <condition :assembly-state="false" @search="search" />
    <dee-table :columns="ganttcolumns" :data="ganttData" />
    <!-- <gantt :refgantt="'refgantt'" :gantt-columns="ganttColumns" :gantt-data="ganttData" :gantt-height="ganttHeight" :index="1" /> -->
  </div>
</template>
<script>
import featuresLegend from '@/business-components/plan/featuresLegend'
import condition from '@/business-components/mating/condition'
import gantt from '@/business-components/gantt'
import { getsorting } from '@/api/mating'
export default {
  name: 'Sorting',
  components: { featuresLegend, condition, gantt },
  data() {
    return {
      ganttHeight: {
        height: ''
      },
      legend: [
        { name: '执行中', style: { 'background-color': 'teal' }},
        { name: '已下达', style: { 'background-color': 'blue' }},
        { name: '计划中', style: { 'background-color': 'red' }}
      ],
      ganttcolumns: [
        { title: '准备状态', key: 'prepareState' },
        { title: '问题状态', key: 'problemState' },
        { title: '任务名称', key: 'taskName' },
        { title: '计划开始时间', key: 'planStartTime' },
        { title: '计划结束时间', key: 'planEndTime' },
        { title: '实际开工时间', key: 'activeStart' },
        { title: '实际完工时间', key: 'activeEnd' },
        { title: '前置节点', key: 'deliverNum' }
      ],
      ganttData: []
      // ganttColumns: [
      //   { name: 'stand', width: '80', align: 'center', label: '站位' }
      // ],
      // ganttData: [
      //   { stand: '1' }
      // ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.ganttHeight.height = `${this.$refs.sorting.clientHeight - 84}px`
      this.getsorting()
    })
  },
  methods: {
    getsorting() {
      getsorting().then(res => {
        console.log('444', res)
        this.ganttData = res.data.items.model
      })
    }
  }
}
</script>
