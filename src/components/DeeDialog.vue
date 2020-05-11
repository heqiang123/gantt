<template>
  <el-dialog
    style="min-width: 1366px"
    :title="title"
    :close-on-click-modal="false"
    :modal="true"
    :before-close="handleClose"
    top="7vh"
    :visible.sync="dialogVisible"
    :width="width"
    :lock-scroll="false"
  >
    <slot />
    <div slot="footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: function() {
        return ''
      }
    },
    width: {
      type: String,
      default: function() {
        return '40%'
      }
    },
    dialogVisible: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
      this.$emit('update:dialogVisible', false)
    }
  },
  filter: {}
}
</script>

<style lang="scss">
</style>
