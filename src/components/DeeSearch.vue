<template>
  <div class="dee-search">
    <el-input v-model="text" class="search-input" size="medium">
      <i
        slot="suffix"
        class="el-icon-search el-input__icon"
        style="cursor: pointer"
        @click="handleClick(text)"
      />
    </el-input>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    handleClick: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      text: ''
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {},
  filter: {}
}
</script>

<style lang="scss">
  .dee-search .search-input {
    width: 242px;
  }
</style>
