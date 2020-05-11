<template>
  <structure-tree :is-pulate="true" :is-arrow="true" :tree-data="treeData" :legend="true" :image-data="imageData" @node-click="handleClick">
    <div slot="manipulate">
      <dee-tools
        id="tools"
        ref="tools"
        :tools="tools"
        mode="normal"
      />
    </div>
    <div slot="cMain" ref="main" style="height: 100%">
      <features-legend :legend-btn="true" :legend="legend" @handleSelect="handleSelect" />
      <condition @search="search" />
      <gantt :gantt-columns="ganttColumns" :gantt-data="ganttData" :gantt-height="ganttHeight" />
    </div>
  </structure-tree>
</template>

<script>
import structureTree from '@/business-components/plan/structureTree'
import featuresLegend from '@/business-components/plan/featuresLegend'
import condition from '@/business-components/mating/condition'
import gantt from '@/business-components/gantt'
import { getTree } from '@/api/tree'
import { getGantt } from '@/api/gantt'
export default {
  name: 'Dashboard',
  components: { structureTree, condition, gantt, featuresLegend },
  data() {
    return {
      ganttHeight: {
        height: ''
      },
      imageData: [
        { type: 'AG600', image: '/icons/airpane.png' }
      ],
      treeData: [],
      structureData: [],
      ganttData: [],
      mainData: '123',
      selectName: 'AOL-CAS-52-001001',
      tools: [
        {
          type: 'icon',
          name: '生成',
          icon: '/icons/c-newpart.png',
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
          name: '计划更新',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
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
      ],
      ganttColumns: [
        { name: 'number', width: '180', align: 'center', label: 'AO' }
      ],
      legend: [
        { name: '周期不足', style: { 'background-color': 'rgba(101,180,109,1)' }},
        { name: '周期紧张', style: { 'background-color': 'rgba(230,165,107,1)' }},
        { name: '周期充足', style: { 'background-color': 'rgba(107,168,230,1)' }}
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.ganttHeight.height = `${this.$refs.main.clientHeight - 90}px`
    })
    this.getPartTree('AG600')
    this.handleClick({ data: 'AOL-CAS-52-001001' })
  },
  methods: {
    handleClick(data, node, event) {
      this.selectName = data.label
      getGantt(data.label).then(res => {
        this.ganttData = res.data.viewDataMarial
      })
    },

    handleNodeClick(data, node, event) {
      this.mainData = data.label
    },

    getPartTree(data) {
      getTree(data).then(res => {
        this.treeData = res.data
      })
    },

    search(val) {
      console.log(val)
    },

    handleSelect(val) {
      getGantt().then(res => {
        if (val === '外购成品') {
          this.ganttData = res.data.allData
        } else if (val === '标准件') {
          this.ganttData = res.data.standData
        } else if (val === '元器件') {
          this.ganttData = res.data.originData
        } else {
          this.ganttData = res.data.viewDataMarial
        }
      })
    }

  }
}
</script>
