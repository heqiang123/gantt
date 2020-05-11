<template>
  <div class="task-list">
    <div v-for="(item, index) in 9" :key="index" class="list-box">
      <div class="box-title">
        <img src="/icons/home-airplane.png" alt="">
        <span style="margin-left:10px">AO-51-0909-010，AG600-001</span>
      </div>
      <div class="list-content">
        <dee-table :columns="columns" :data="data" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TaskList',
  data() {
    return {
      columns: [
        { title: '共计', align: 'center', key: 'total' },
        { title: '已完成', align: 'center', key: 'complete' },
        { title: '正常未完', align: 'center', key: 'normalcomplete' },
        { title: '延期未完', align: 'center', key: 'delinecomplete' }
      ],
      data: [
        { total: '50', complete: '20', normalcomplete: '10', delinecomplete: '20' }
      ]
    }
  }
}
</script>
<style lang="scss">
  .task-list {
    display: flex;
    flex-wrap: wrap;
    .list-box {
      margin: 10px 17px 35px 36px;
      width: calc(100% / 3 - 66px);
      height: 150px;
      .box-title {
        height: 50px;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
