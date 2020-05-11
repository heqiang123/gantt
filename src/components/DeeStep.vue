<template>
  <el-steps direction="vertical" :active="active" finish-status="success" :style="{height: height}">
    <el-step v-for="(item,index) in steps" :key="index" :title="item.title" :description="item.description" />
  </el-steps>
</template>

<script>
export default {
  components: {},
  props: {
    steps: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},

  mounted: function() {
  },
  methods: {
    next(flag = null) {
      this.active = flag || 0
      if (this.active >= this.steps.length) {
        this.active = this.steps.length
        return true
      }
      return false
    },
    back() {
      this.active--
      if (this.active <= 0) {
        this.active = 0
      }
    }
  },
  filter: {}
}
</script>

<style scoped lang="scss">
</style>
