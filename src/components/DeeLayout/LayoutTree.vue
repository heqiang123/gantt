<template>
  <div class="layout-com-box">
    <div class="left-layout-box transition-box" :class="{'layout-pack-up': isPackUp, 'layout-expansion': !isPackUp}">
      <div v-if="isPackUp" class="left-packup-content" @click="isPackUp=false">
        <p class="left-packup-title-top">
          {{ treeTitle }}
        </p>
        <p class="left-packup-title-bottom">
          可展开
          <svg-icon icon-class="dayu" />
        </p>
      </div>
      <div v-if="!isPackUp" class="left-block-style">
        <div class="left-comtent-top-fiexed">
          <slot name="left-top" />
        </div>
        <div class="left-layout-content">
          <slot name="left-content" />
        </div>
        <div class="expansion-btn-box" @click="isPackUp=true">
          <span>可收起</span> <span><svg-icon icon-class="xiaoyu" /></span>
        </div>
      </div>
    </div>
    <div class="right-layout-box block-style" :class="{'right-expansion': !isPackUp}">
      <slot name="right-content" class="right-content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  components: {},
  props: {
    treeTitle: {
      type: String,
      default: '工艺结构'
    }
  },
  data() {
    return {
      isPackUp: false
    }
  },
  computed: {},
  watch: {},
  mounted: function() {},
  methods: {},
  filter: {}
}
</script>

<style lang="scss">
 .layout-com-box{
    position: absolute;
    top:8px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    .left-layout-box{
        margin-right: 8px;
        background: white;
        border: 1px solid #BFBFBF;
        position: relative;
        height: 100%
    }
    .left-packup-content{
        cursor: pointer;
        height: 100%;
    }
    .left-packup-title-top{
        width: 14px;
        font-size: 14px;
        position: absolute;
        top: 10px;
        left: 15px;
        color: #212121;
        line-height: 20px;
        font-weight:500;
    }
    .left-packup-title-bottom{
        width: 14px;
        font-size: 14px;
        position: absolute;
        bottom: 10px;
        left: 15px;
        line-height: 20px;
        color: #999999
    }
    .left-block-style{
        height: 100%;
        overflow: auto;
    }
    .left-comtent-top-fiexed{
        position: absolute;
        z-index: 10;
        top: 0px;
        left: 0;
        right: 0;
        height: 50px;
        background: #FFF;
        padding: 12px;
    }
    .left-layout-content{
        padding: 70px 12px;
    }
    .expansion-btn-box{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        font-size: 14px;
        border-top:1px solid rgba(217,217,217,1);
        padding:0 12px;
        line-height: 40px;
        color: #999999;
        background: #FFF;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }
    .right-layout-box{
        position: relative;
        overflow:auto;
        height: 100%;
        flex: 1;
        box-sizing: border-box
    }
    .layout-pack-up{
        width: 44px;
    }
    .layout-expansion{
        // width: 340px;
        min-width: 260px;
    }
    .tree-search-box {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
    }
 }
</style>
