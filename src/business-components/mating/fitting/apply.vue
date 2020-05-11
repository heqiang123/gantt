<template>
  <div style="height:100%">
    <dee-tab :tabs="tabs" style="height:100%">
      <div slot="0" style="height:100%">
        <assembly />
      </div>
    </dee-tab>
  </div>
</template>
<script>
import assembly from '@/business-components/tabCom/assembly'
export default {
  name: 'ApplyTabName',
  components: { assembly },
  data() {
    return {
      tabs: [
        {
          name: '装配计划',
          id: '0'
          // data: [
          //   { path: 'assembly.vue' }
          // ]
        }
        // {
        //   name: '工作订单',
        //   id: '1',
        //   data: [
        //     { path: 'sorting.vue' }
        //   ]
        // }
      ]
    }
  }
}
</script>
<style lang="scss">
.dee-panel {
  .el-tabs .el-tabs__content {
    height: calc(100% - 32px);
    .el-scrollbar__wrap {
      // overflow: hidden;
      .el-scrollbar__view {
        height: calc(100% - 8px)
      }
    }
  }
}

</style>
