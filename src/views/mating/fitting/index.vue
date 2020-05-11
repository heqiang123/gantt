<template>
  <assembly-plan :is-pulate="true" :is-arrow="true" @node-click="handleNodeClick" @standClick="handleRowClick" @standallClick="handleAllClick">
    <div slot="manipulate">
      <dee-tools
        id="tools"
        ref="tools"
        :tools="tools"
        mode="normal"
      />
    </div>
    <div slot="cMain" style="height:100%">
      <apply-tab />
    </div>
  </assembly-plan>
</template>
<script>
import assemblyPlan from '@/business-components/mating/assemblyPlan'
import applyTab from '@/business-components/mating/fitting/apply'
import eventBus from '@/utils/eventBus'
export default {
  name: 'Fitting',
  components: { assemblyPlan, applyTab },
  data() {
    return {
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
      ]
    }
  },
  mounted() {
    this.handleNodeClick({ data: 'AG600-001' })
  },
  methods: {
    handleNodeClick(data, node, event) {
      eventBus.$emit('getTreeData', data)
    },

    handleRowClick(row, event, column) {
      eventBus.$emit('getPlanData', row)
    },

    handleAllClick(row) {
      eventBus.$emit('getAllData', row)
    }

  }
}
</script>
<style lang="scss">

</style>
