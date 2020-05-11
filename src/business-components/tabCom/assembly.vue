<template>
  <div ref="assembly" style="height:100%">
    <features-legend :legend="legend" :legend-btn="legendBtn" :features-btn="featuresBtn" @handleSelect="handleSelect" />
    <!-- <features-legend :legend="legend" :legend-btn="legendBtn" @handleSelect="handleSelect" /> -->
    <condition />
    <gantt :key="key" :gantt-columns="ganttColumns" :gantt-data="ganttData" :gantt-height="ganttHeight" />
    <dee-dialog :title="'工作订单'" width="80%" :dialog-visible="dialogVisible" @handleClose="handleClose">
      <sorting />
    </dee-dialog>
  </div>
</template>
<script>
import featuresLegend from '@/business-components/plan/featuresLegend'
import condition from '@/business-components/mating/condition'
import gantt from '@/business-components/gantt'
import sorting from './sorting'
import eventBus from '@/utils/eventBus'
import { getGantt } from '@/api/gantt'
export default {
  name: 'Assembly',
  components: { featuresLegend, condition, gantt, sorting },
  data() {
    return {
      sort: '',
      isShowGantt: true,
      ganttColumns: [
        { name: 'stand', width: 80, align: 'center', label: '站位' }
      ],
      legendBtn: true,
      dialogVisible: false,
      ganttData: [],
      ganttHeight: {
        height: ''
      },
      legend: [
        { name: '执行中', style: { 'background-color': 'rgba(101,180,109,1)' }},
        { name: '已下达', style: { 'background-color': 'rgba(230,165,107,1)' }},
        { name: '计划中', style: { 'background-color': 'rgba(107,168,230,1)' }}
      ],
      featuresBtn: [
        { name: '工作订单' }
      ]
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.ganttHeight.height = `${this.$refs.assembly.clientHeight - 82}px`
      this.getGantt()
      eventBus.$on('getAllData', target => {
        getGantt().then(res => {
          this.sort = target.batches
          if (target.batches === 2001) {
            this.ganttData = res.data.stadardData1
          } else if (target.batches === 2002) {
            this.ganttData = res.data.stadardData2
          } else {
            this.ganttData = res.data.stadardData3
          }
        })
      })
      eventBus.$on('getPlanData', target => {
        console.log(target)
        getGantt().then(res => {
          if (target.standerd === '31') {
            this.ganttData = res.data.standData1
          } else if (target.standerd === '41') {
            this.ganttData = res.data.standData2
          } else if (target.standerd === '51') {
            this.ganttData = res.data.standData3
          } else if (target.standerd === '52') {
            this.ganttData = res.data.standData4
          } else if (target.standerd === '53') {
            this.ganttData = res.data.standData5
          } else if (target.standerd === '54') {
            this.ganttData = res.data.standData6
          }
        })
      })
    })
  },
  methods: {
    handleSelect() {
      this.$nextTick(() => {
        this.dialogVisible = true
      })
    },

    handleClose() {
      this.dialogVisible = false
    },

    getGantt() {
      getGantt().then(res => {
        this.ganttData = res.data.stadardData1
      })
    }

  }
}
</script>
