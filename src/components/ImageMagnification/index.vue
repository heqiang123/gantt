<template>
  <!-- 过渡动画 -->
  <div class="img-view" @click="bigImg">
    <!-- 遮罩层 -->
    <div class="img-layer">
      <div class="img">
        <img :src="imgSrc">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  },
  methods: {
    bigImg() {
      // 发送事件
      this.$emit('clickit')
    }
  }
}
</script>
<style scoped>
/*动画*/
.fade-enter-active,
.fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
    transform: translate3D(100%, 0, 0);
}

/* bigimg */

.img-view {
    position: relative;
    width: 100%;
    height: 100%;
}

/*遮罩层样式*/
.img-view .img-layer {
    position: fixed;
    z-index: 99999999999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.img-view .img{
    height: 100%;
    width: 100%;
    /* line-height: 500px;
    text-align: center; */
}
/*不限制图片大小，实现居中*/
.img-view .img img {
    max-height: 100%;
    display: block;
    position: absolute;
    top: 50%;
    right: 50%;
    z-index: 1000;
   transform:translate(50%,-50%);

    /* margin: auto;
     */
}
</style>
