/**
* @Description: ipad布局
* @author cxg
* @date 2020/04/26
*/
<template>
  <div class="layout-ipad">
    <div class="ipad-header">
      <div style="display: flex;align-items: center">
        <svg-icon class="svg-icon home-svg-icon" icon-class="home" @click="goHome" />
        <span class="line-box" />
        <svg-icon class="svg-icon fanhui-svg-icon" icon-class="fanhui" @click="goBack" />
        <span style="padding-left: 8px">{{ $route.meta.title }}</span>
      </div>
      <div style="display: flex;align-items: center">
        <svg-icon class="svg-icon" icon-class="geren" />
        <span style="padding:0 10px">制造部 wangxin</span>
        <span class="svg-icon el-icon-refresh" @click="freshFun" />
      </div>
    </div>
    <div class="ipad-body">
      <app-main />
    </div>
    <div v-if="$route.name !== 'scanhome'" class="ipad-footer">
      <div class="btn-box" @click="scanFun">
        <div class="btn-box-content">
          <div class="scan-btn">
            <img src="/image/scan-icon.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain } from './components'
export default {
  components: { AppMain },
  data() {
    return {
    }
  },

  computed: {},
  mounted() {},
  methods: {
    scanFun() {
      this.$router.push('/scan/home')
    },
    goHome() {
      this.$router.push('/')
    },
    goBack() {
      this.$router.go(-1)
    },
    freshFun() {
      location.reload()
    }
  }
}

</script>
<style lang='scss'>
.layout-ipad{
    height: 100%;
    .ipad-header{
        position: fixed;
        height: 80px;
        left: 0;
        right: 0;
        background:linear-gradient(270deg,rgba(52,160,49,1) 0%,rgba(28,59,146,1) 100%);
        z-index: 2;
        color: #FFF;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        padding: 10px 30px 0 30px;
        align-items: center;
        .svg-icon{
          font-size: 30px;
        }
        .home-svg-icon{
          margin-right: 14px;
          position: relative;
        }
        .line-box{
          top: 1px;
          display: inline-block;
          background: #FFF;
          width: 2px;
          height: 22px;
        }
        .fanhui-svg-icon{
          margin-left: 14px
        }
    }
    .ipad-footer{
        position: fixed;
        height: 58px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        background: #FFF;
        border-top: 1px solid #dadada;
        display: flex;
        justify-content: center;
        .btn-box{
            position: relative;
            .btn-box-content{
                background-image: url(/image/footline.png);
                background-repeat: no-repeat;
                position: absolute;
                height: 92px;
                background-size: contain;
                width: 140px;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10;
                left: -70px;
                bottom: 0;
                .scan-btn{
                    width: 70px;
                    height: 70px;
                    background:linear-gradient(192deg,rgba(52,159,49,1) 0%,rgba(79,108,187,1) 100%);
                    border-radius: 35px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 40px;
                        height: 40px;
                    }
                }
            }
        }
    }
    .ipad-body{
        padding: 80px 0 60px 0;
        height: 100%;
        background: rgba(242, 242, 242, 1);
    }
}
</style>
