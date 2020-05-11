<template>
  <div>
    <dee-table :columns="planColumns" :data="planData" />
  </div>
</template>
<script>
export default {
  name: 'PlanDistribte',
  data() {
    return {
      planColumns: [
        { title: '张三' },
        { title: '李四' },
        { title: '王五' },
        { title: '赵六' }
      ],
      planData: []
    }
  }
}
</script>
