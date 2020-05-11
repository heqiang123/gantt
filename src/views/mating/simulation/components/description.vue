<template>
  <div class="description">
    <div v-for="(item, index) in descripDate" :key="index" class="description-box">
      <div class="box-image">
        <img :src="item.image" alt="">
      </div>
      <div class="box-content">
        <div>{{ item.title }}</div>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Description',
  data() {
    return {
      descripDate: [
        {
          image: '/icons/c-Receive.png',
          title: '总项数:8462',
          name: '不满足数:3466'
        },
        {
          image: '/icons/o-notes.png',
          title: '涉及物料总数:95446',
          name: '齐套满足率:75%'
        },
        {
          image: '/icons/o-rgroup.png',
          title: '最高: AG600-01    85%',
          name: '最低: AG700-01    44%'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
  .description {
    font-size: 14px;
    display: flex;
    &-box {
      width: calc(100% / 3);
      display: flex;
      .box-image {
        width: 40px;
        height: 40px;
        margin-right: 8px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .box-content {
        // flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &:first-child {
        justify-content: flex-start;
      }
      &:nth-child(2) {
        justify-content: center;
      }
      &:last-child {
        justify-content: flex-end;
      }
    }
  }
</style>
