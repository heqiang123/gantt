<template>
  <div>
    <dee-tab :tabs="tabs">
      <div slot="0">
        1
      </div>
      <div slot="1">
        2
      </div>
      <div slot="2">3</div>
      <div slot="3">4</div>
    </dee-tab>
  </div>
</template>
<script>
export default {
  name: 'SimulationTab',
  data() {
    return {
      tabs: [
        { name: '全部', id: '0' },
        { name: '标准件', id: '1' },
        { name: '元器件', id: '2' },
        { name: '外购产品', id: '3' }
      ]
    }
  }
}
</script>
