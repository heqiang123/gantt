<template>
  <div class="assistants">
    <div class="assistant-item">
      <img src="../../icons/components/card/cardAssistant/wenjian.png" @click="getInfo('/productDetailedList')">
      <div>产品自制外购清单计算</div>
    </div>
    <div class="assistant-item">
      <img src="../../icons/components/card/cardAssistant/wenjian.png" @click="getInfo('/materialReview')">
      <div>物料反查</div>
    </div>
    <div class="assistant-item">
      <img src="../../icons/components/card/cardAssistant/wenjian.png" @click="getInfo('/processedTask')">
      <div>处理过任务</div>
    </div>
    <div class="assistant-item">
      <img src="../../icons/components/card/cardAssistant/wenjian.png" @click="getInfo('/personalCommitTaskProcess')">
      <div>个人提交任务进程</div>
    </div>
    <div class="assistant-item">
      <img src="../../icons/components/card/cardAssistant/wenjian.png" @click="getInfo('/craftsmenSummaryParts')">
      <div>PBOM评审工具</div>
    </div>
    <div class="assistant-item">
      <img src="../../icons/components/card/cardAssistant/wenjian.png" @click="getInfo('/queryProductCode')">
      <div>产品代号查询</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    initData() {
    },
    getInfo(path) {
      this.$router.push(path)
      console.log('path=>', path)
    }
  },
  filter: {}
}
</script>
<style lang="scss" scoped>
  .assistants {
    display: flex;
    flex-flow:row wrap;
    height: 380px;
    .assistant-item {
      width: 50%;
      height: 107px;
      padding-top: 20px;
      text-align: center;
      img {
        cursor: pointer;
      }
    }
  }
</style>
