<template>
  <assembly-plan :is-pulate="true" :is-arrow="true" @node-click="handleNodeClick">
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
  name: 'Matwork',
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
            }
          }
        },
        {
          type: 'icon',
          name: '生效',
          icon: '/icons/check.png',
          handler: {
            click: () => {
            }
          }
        },
        {
          type: 'icon',
          name: '计划更新',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
            }
          }
        }
      ]
    }
  },
  mounted() {
    this.handleNodeClick({ data: 'BBOM-AG600-001' })
  },
  methods: {
    handleNodeClick(data, node, event) {
      eventBus.$emit('getTreeData', data)
    }
  }
}
</script>
<style lang="scss">

</style>
