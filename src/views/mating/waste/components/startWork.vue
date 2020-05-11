<template>
  <div class="work">
    <div class="work-tools">
      <div v-for="(item, index) in liData" :key="index" class="tools-li">
        <img :src="item.image" alt="" style="width: 24px;height: 24px">
        <div class="li-box">{{ item.description }}</div>
        <div>总项数: {{ item.total }}</div>
        <div>不满足数: {{ item.dissatisfy }}</div>
      </div>
    </div>
    <div class="work-table">
      <dee-table :columns="workColumns" :data="workData" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Work',
  data() {
    return {
      workColumns: [
        { title: '库存物料名称' },
        { title: '物料名称' },
        { title: '牌号' },
        { title: '规格' },
        { title: '技术条件' },
        { title: '需求数量' },
        { title: '缺件数量' }
      ],
      workData: [],
      liData: [
        {
          image: '/icons/o-kunchu.png',
          description: '生产物料',
          total: '20',
          dissatisfy: '12'
        },
        {
          image: '/icons/o-skill.png',
          description: '工具工装',
          total: '20',
          dissatisfy: '12'
        },
        {
          image: '/icons/c-existingpart.png',
          description: '生产设备',
          total: '20',
          dissatisfy: '12'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.work {
  &-tools {
    display: flex;
    .tools-li {
      text-align: center;
      width: calc(100% / 3);
      margin-right: 8px;
      .li-box {
        width: 80px;
        height: 30px;
        margin: 8px auto;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        font-weight: 0;
        border: 1px solid #d9d9d9
      }
      >div {
        margin-top: 8px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  &-table {
    margin-top: 8px
  }
}
</style>
