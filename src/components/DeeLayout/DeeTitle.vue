<template>
  <div class="dee-title">
    <div>
      <svg-icon
        v-if="icon"
        :icon-class="icon"
        class="icon-img"
      />
      <h2 class="title-text">{{ title }}</h2>
    </div>
    <dee-tools
      v-if="tools && tools.length"
      :tools="tools"
      mode="dual"
      size="large"
    />
    <slot />
  </div>
</template>

<script>
import DeeTools from './DeeTools.vue'
export default {
  name: 'Unit',
  components: { DeeTools },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    tools: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dee-title {
  position: relative;
  color: #212121;
  height: 36px;
  line-height: 36px;
  display: flex;
  justify-content: space-between;
  .icon-img {
    padding: 0px !important;
    color: #a7aab0;
  }
  .title-text {
    padding: 0;
    margin: 0;
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    color: #4b4c4d;
  }
}
</style>
