<template>
  <structure-tree :is-pulate="true" :legend="true" :tree-data="treeData" :image-data="imageData" @node-click="handleClick">
    <template slot="manipulate">
      <span style="font-weight:bold">现场工艺配制</span>
      <dee-tools
        id="tools"
        ref="tools"
        :tools="tools"
        mode="normal"
      />
    </template>
    <div slot="cMain" ref="main" style="height: 100%">
      <standing
        :part-title="partTitle"
        :stand-title="true"
        :stand-btn="standBtn"
        :stand-position="standPosition"
        :standing-state="standingState"
        @assembly="handleAssembly"
        @resources="handleResources"
        @changeStand="handleStand"
        @craftsmanship="handleCraftsmanship"
        @sorting="handleSorting"
      />
      <sy-table v-if="changeSync.isShowAssembly && standBtn" />
      <gantt v-else :gantt-columns="ganttColumns" :gantt-data="ganttData" :gantt-height="ganttHeight" :is-subscales="true" />
    </div>
  </structure-tree>
</template>

<script>
import structureTree from '@/business-components/plan/structureTree'
import standing from '@/business-components/plan/standing'
import gantt from '@/business-components/gantt'
import syTable from '../components/syTable'
import { getTree } from '@/api/tree'
import { getGantt } from '@/api/gantt'
export default {
  name: 'Dashboard',
  components: { structureTree, gantt, standing, syTable },
  data() {
    return {
      ganttHeight: {
        height: ''
      },
      imageData: [
        { type: 'AG600', image: '/icons/airpane.png' }
      ],
      treeData: [],
      standBtn: true,
      standPosition: true,
      partTitle: 'AG600-001',
      standingState: '',
      ganttData: [],
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
          name: '更改',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              this.$confirm('确认更改吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '更改成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消更改'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '发布',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
              this.$confirm('确认发布吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '发布成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消发布'
                })
              })
            }
          }
        }
      ],
      changeSync: {
        isShowAssembly: false,
        isShowResources: true
      }
    }
  },
  computed: {
    ganttColumns() {
      if (this.standBtn) {
        return [
          { name: 'id', width: '40', align: 'center', label: '序号' },
          { name: 'number', width: '180', align: 'center', label: 'AO' },
          { name: '', width: '40', align: 'center', label: '关系' }
        ]
      } else {
        return [
          { name: 'stand', width: '180', align: 'center', label: '站位' }
        ]
      }
    }
  },
  watch: {
    standBtn(val) {
      if (val) {
        this.ganttHeight.height = `${this.$refs.main.clientHeight - 135}px`
      } else {
        this.ganttHeight.height = `${this.$refs.main.clientHeight - 40}px`
      }
    }
  },
  mounted() {
    this.getPartTree('AG600')
    this.$nextTick(() => {
      this.ganttHeight.height = `${this.$refs.main.clientHeight - 135}px`

      this.getGantter()
    })
  },
  methods: {
    handleClick(data, node, event) {
      this.partTitle = data.label
      if (data.label.indexOf('31') > -1) {
        this.standingState = '31站位'
      } else if (data.label.indexOf('41') > -1) {
        this.standingState = '41站位'
      } else if (data.label.indexOf('51') > -1) {
        this.standingState = '51站位'
      } else if (data.label.indexOf('52') > -1) {
        this.standingState = '52站位'
      } else if (data.label.indexOf('53') > -1) {
        this.standingState = '53站位'
      } else if (data.label.indexOf('54') > -1) {
        this.standingState = '54站位'
      }
      getGantt(data.label).then(res => {
        this.ganttData = res.data.syncData
        if (!this.standBtn) {
          this.ganttData = res.data.syncDataview
        }
      })
    },

    getPartTree(data) {
      getTree(data).then(res => {
        this.treeData = res.data
      })
    },

    getGantter() {
      getGantt().then(res => {
        this.ganttData = res.data.syncData
        if (!this.standBtn) {
          this.ganttData = res.data.syncDataview
        }
      })
    },

    handleNodeClick(data, node, event) {
      this.mainData = data.label
      console.log(data, node, event)
    },

    handleAssembly() {
      this.changeSync.isShowAssembly = false
      this.changeSync.isShowResources = true
    },

    handleResources() {
      this.changeSync.isShowAssembly = true
      this.changeSync.isShowResources = false
    },

    handleStand() {
      getGantt().then(res => {
        this.ganttData = res.data.syncData
      })
    },

    handleCraftsmanship() {
      this.standBtn = true
      this.standPosition = true
      this.getGantter()
    },

    handleSorting() {
      this.standBtn = false
      this.standPosition = false
      this.getGantter()
    }

  }
}
</script>
