<template>
  <structure-tree :is-pulate="true" :legend="true" :operate="true" :tree-data="treeData" :tree-type="false" @node-click="handleClick">
    <div slot="cMain" ref="main" style="height: 100%">
      <description />
      <features-legend :legend-btn="true" :legend="legend" @handleSelect="handleSelect" />
      <condition :radio-state="true" :assembly-state="false" @search="search" />
      <dee-table :columns="simColumns" :data="simData" :options="options" />
    </div>
  </structure-tree>
</template>

<script>
import structureTree from '@/business-components/plan/structureTree'
import featuresLegend from '@/business-components/plan/featuresLegend'
import condition from '@/business-components/mating/condition'
import description from './components/description'
import AGblock from './components/AGblock'
import { getmlutiTree } from '@/api/tree'
import { getsimulation } from '@/api/mating'
export default {
  name: 'Dashboard',
  components: { structureTree, condition, featuresLegend, description },
  data() {
    return {
      treeData: [],
      ganttHeight: {
        height: ''
      },
      structureData: [],
      ganttData: [],
      mainData: '123',
      selectName: 'AOL-CAS-52-001001',
      simColumns: [
        { title: '名称', key: 'name', align: 'center' },
        { title: 'AG600-001',
          key: 'name',
          align: 'center',
          component: {
            name: AGblock,
            props: {
              values: 'AG600'
            }
          }
        },
        { title: 'AG700-001', key: 'name', align: 'center',
          component: {
            name: AGblock,
            props: {
              values: 'AG700'
            }
          }},
        { title: 'AG800-001', key: 'name', align: 'center',
          component: {
            name: AGblock,
            props: {
              values: 'AG800'
            }
          }}
      ],
      simData: [],
      options: {
        height: ''
      },
      ganttColumns: [
        { name: 'number', width: '180', align: 'center', label: '名称' }
      ],
      legend: [
        { name: '不满足', style: { 'background-color': 'rgba(230,165,107,1)' }},
        { name: '部分满足', style: { 'background-color': 'rgba(107,168,230,1)' }},
        { name: '全部满足', style: { 'background-color': 'rgba(101,180,109,1)' }}
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.ganttHeight.height = `${this.$refs.main.clientHeight - 130}px`
      this.options.height = `${this.$refs.main.clientHeight - 130}px`
    })
    this.isShowSearch = false
    this.handleClick({ data: 'AOL-CAS-52-001001' })
    this.getmlutiTree()
  },
  methods: {
    getmlutiTree() {
      getmlutiTree().then(res => {
        this.treeData = res.data
      })
    },

    handleClick(data, node, event) {
      this.selectName = data.label
      getsimulation().then(res => {
        this.simData = res.data.items.model
      })
      // getGantt(data.label).then(res => {
      //   this.ganttData = res.data.subData
      // })
    },

    handleNodeClick(data, node, event) {
      this.mainData = data.label
      console.log(data, node, event)
    },

    search(val) {
      console.log(val)
    },

    handleSelect(val) {
      getsimulation().then(res => {
        this.simData = res.data.items.model
      })
      // getGantt().then(res => {
      //   this.ganttData = res.data.subData
      // })
    }

  }
}
</script>
