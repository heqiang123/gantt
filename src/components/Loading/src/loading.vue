<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      :class="[customClass, backgroundColor,{ 'is-fullscreen': fullscreen }]"
    >
      <div class="loading-container">
        <div class="loading-area">
          <img alt="" class="loading-icon" src="../../../icons/components/loading/orient_loading.gif">
          <div class="loading-text">加载中</div>
          <!--          <div id="preloader_1">-->
          <!--            <span></span>-->
          <!--            <span></span>-->
          <!--            <span></span>-->
          <!--            <span></span>-->
          <!--            <span></span>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: '',
      backgroundColor: 'backgroundColor'
    }
  },
  methods: {
    handleAfterLeave() {
      this.$emit('after-leave')
    },
    setText(text) {
      this.text = text
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/mixin.scss";

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .loading-area {
      width: 72px;
      height: 76px;
      /*box-shadow: 0 2px 16px 0 rgba(42, 117, 206, 0.3);*/
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .loading-icon {
      margin-top: 10px;
      height: 38px;
      width: 38px;
    }

    .loading-text {
      font-size: 12px;
      @include color(color);
      margin-top: 7px;
    }

    #preloader_1 {
      /*position: relative;*/
      display: flex;
      width: 36px;
      justify-content: space-between;
      height: 20px;
      align-items: flex-end;
    }

    #preloader_1 span {
      display: block;
      /*bottom: 0;*/
      width: 5px;
      height: 3px;
      background: #fff;
      /*position: absolute;*/
      animation: preloader_1 1.5s infinite ease-in-out;
    }

    #preloader_1 span:nth-child(2) {
      animation-delay: .2s;
    }

    #preloader_1 span:nth-child(3) {
      animation-delay: .4s;
    }

    #preloader_1 span:nth-child(4) {
      animation-delay: .6s;
    }

    #preloader_1 span:nth-child(5) {
      animation-delay: .8s;
    }

    @keyframes preloader_1 {
      0% {
        height: 5px;
        transform: translateY(0px);
        background: #fff;
      }
      25% {
        height: 16px;
        transform: translateY(0px);
        background: #fff;
      }
      50% {
        height: 5px;
        transform: translateY(0px);
        background: #fff;
      }
      100% {
        height: 5px;
        transform: translateY(0px);
        background: #fff;
      }
    }
  }

  .backgroundColor {
    height: 100%;
    position: absolute;
    z-index: 10000;
    background-color: rgba(255, 255, 255, .4);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
  }
</style>
