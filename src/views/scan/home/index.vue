/**
import { setTimeout } from 'timers';
* @Description:
* @author cxg
* @date 2020/04/08
*/
<template>
  <div class="qr-code" :class="{'is-qr-code':isScan}">
    <div class="code-image">
      <span />
      <span />
      <span />
      <span />
      <div v-if="!isScan" class="line" />
      <!-- <img src="/icons/ewm.png" alt="二维码"> -->
    </div>
    <!-- <span class="info-box">注：请扫描工卡获取个人任务，或扫描生产卡片获取任务</span>
    <div class="in-search-b">
      <input v-model="codeData" type="text" class="input-box-content"> <el-button size="mini" type="primary" @click="goPage">扫码</el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      codeData: '',
      isScan: false
    }
  },

  computed: {},
  mounted() {
    if (this.$route.query.num1) {
      setTimeout(() => {
        this.$router.push({ path: '/padexecute/fitting', query: { num1: this.$route.query.num1 }})
      }, 3000)
    } else {
      setTimeout(() => {
        const codeType = localStorage.getItem('codeType')
        if (codeType === 'JY0508') {
          localStorage.setItem('codeType', 'MS0508')
          this.$router.push({ path: '/padexecute/checkout' })
        } else if (codeType === 'MS0508') {
          this.$router.push({ path: '/padexecute/visual' })
          localStorage.setItem('codeType', 'ZP0508')
        } else {
          this.$router.push({ path: '/padexecute/fitting' })
          localStorage.setItem('codeType', 'JY0508')
        }
      }, 3000)
    }

    setTimeout(() => {
      this.isScan = true
    }, 2000)
  },
  methods: {
    goPage() {
      if (this.codeData === 'ZP0508') {
        this.$router.push({ path: '/padexecute/fitting' })
      } else if (this.codeData === 'JY0508') {
        this.$router.push({ path: '/padexecute/checkout' })
      } else if (this.codeData === 'MS0508') {
        this.$router.push({ path: '/padexecute/visual' })
      } else {
        this.$message.error('获取任务失败')
      }
    }
  }
}

</script>
<style lang='scss'>
.qr-code {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #000;
  background-size: cover;
  background-position: center;
  // background: rgba($color: #000000, $alpha: 0.6);
  .code-image {
    position: relative;
    height: 300px;
    width: 300px;
    .line {
      top: 2px;
      position: absolute;
      animation:line 1.5s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: linear;
      height: 2px;
      width: 300px;
      background-color: rgb(112,112,112);
    }
    @keyframes line
    {
      from {top:2px;}
      to {top:298px;}
    }
    span {
      display: inline-block;
      position: absolute;
      width: 50px;
      height: 50px;
      &:nth-child(1) {
        left: 0;
        top: 0;
        border:2px solid rgb(0,255,153);
        border-right: none;
        border-bottom: none
      }
      &:nth-child(2) {
        right: 0;
        top: 0;
        border:2px solid rgb(0,255,153);
        border-left: none;
        border-bottom: none
      }
      &:nth-child(3) {
        left: 0;
        bottom: 0;
        border:2px solid rgb(0,255,153);
        border-right: none;
        border-top: none
      }
      &:nth-child(4) {
        right: 0;
        bottom: 0;
        border:2px solid rgb(0,255,153);
        border-left: none;
        border-top: none
      }
    }
    img {
      width: 300px;
      height: 300px;
    }
  }
  .in-search-b{
    display: flex;
    align-items: center;
  }
  .input-box-content{
    height: 26px;
    width: 300px;
    margin: 0 10px;
  }
  .info-box{
    line-height: 50px;
  }
}
.is-qr-code{
    background-image: url('/image/scanback.jpg');
}
</style>
