<template>
  <div>
    <dee-tab :tabs="tabs">
      <div slot="0">
        <person-distribte />
      </div>
      <div slot="1">
        <device-distribte />
      </div>
      <div slot="2">
        <plan-distribte />
      </div>
      <div slot="3">
        <plan-distribte />
      </div>
      <div slot="4">
        <plan-distribte />
      </div>
    </dee-tab>
  </div>
</template>
<script>
export default {
  name: 'RequireTab',
  data() {
    return {
      tabs: [
        {
          name: '人员分配情况',
          id: '0',
          data: [
            { path: 'personDistribte.vue' }
          ]
        },
        {
          name: '设备分配情况',
          id: '1',
          data: [
            { path: 'deviceDistribte.vue' }
          ]
        },
        {
          name: '物料情况',
          id: '2',
          data: [
            { path: 'planDistribte.vue' }
          ]
        },
        {
          name: '工装工具情况',
          id: '3',
          data: [
            { path: 'planDistribte.vue' }
          ]
        }
      ]
    }
  }
}
</script>
