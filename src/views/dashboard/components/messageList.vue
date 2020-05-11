<template>
  <div class="message-list">
    <div v-for="(item, index) in messageList" :key="index" class="list-box">
      <img :src="item.image" alt="">
      <span>{{ item.name }}</span>
      <span>{{ item.num }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Messagelist',
  data() {
    return {
      messageList: [
        {
          image: '/icons/back1.png',
          name: '计划退回',
          num: '36'
        },
        {
          image: '/icons/audit.png',
          name: '异常信息退回',
          num: '46'
        },
        {
          image: '/icons/approval.png',
          name: '代料申请退回',
          num: '56'
        },
        {
          image: '/icons/reback.png',
          name: '补废退回',
          num: '66'
        },
        {
          image: '/icons/change.png',
          name: '零星领用退回',
          num: '76'
        },
        {
          image: '/icons/proofreading.png',
          name: '工时申请退回',
          num: '86'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.message-list {
  padding: 19px 0 25px 0;
  display: flex;
  flex-wrap: wrap;
  .list-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 15px 47px 15px 42px;
    width: calc(100% / 3 - 96px);
    height:82px;
    border-radius:7px;
    border:1px solid rgba(209,209,209,1);
  }
}

</style>
