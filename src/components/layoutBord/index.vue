<template>
  <div class="layoutBord">
    <div class="layoutBord-aside">
      <slot name="tree" />
    </div>
    <div class="layoutBord-collapse">
      <slot name="image" />
    </div>
    <div class="layoutBord-main">
      <slot name="main" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutBord',
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleCollapse() {
      this.$emit('collapse', this.isCollapse)
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss">
  .layoutBord {
    display: flex;
    height: 100%;
    &-aside {
      width: 384px;
      min-width: 384px;
      background-color: #ffffff;
      border:1px solid rgba(217,217,217,1);
      box-sizing: border-box;
      height: 100%;
      padding: 8px;
      overflow-y: scroll;
    }
    &-collapse {
      width: 8px;
      display: flex;
      align-items: center;
      min-height: 100%;
    }
    &-main {
      flex:1;
      height: 100%;
      width: calc(100% - 392px);
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1)
    }
  }
</style>
