<template>
  <div>
    <span v-for="(item, index) in btns" :key="index">
      <span
        v-if="!item.showFun || item.showFun(scope.row)"
        class="btn-icon-box"
        :title="item.operation"
        @click="item.handleClick(scope.row, scope.$index) || nullFun"
      >
        <img class="self-btn-icon" :src="item.icon">
      </span>
    </span>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  name: 'EditTableRow',
  props: {
    scope: {
      default: null
    },
    btns: {
      type: Array,
      default: []
    }
  },
  /* eslint-disable */
  computed: {
    state() {
      return this.scope.row.state
    }
  },
  mounted() {},
  methods: {
    nullFun() {}
  }
}
</script>
<style lang="scss">
  .self-btn-icon{
    width: 18px;
    height: 18px;
  }
  .btn-icon-box{
    display: inline-block;
    padding-right: 8px;
    cursor: pointer;
  }
</style>

