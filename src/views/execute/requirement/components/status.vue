/**
* @Description:
* @author cxg
* @date 2020/04/30
*/
<template>
  <div class="-page">
    <span v-if="state" class="el-icon-check" style="color: #65B46D;font-size: 20px" />
    <span v-else class="el-icon-close" style="color: #E6A56B;font-size: 20px" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      state: 1
    }
  },

  computed: {},
  mounted() {
    this.state = Math.random() > 0.5 ? 1 : 0
  },
  methods: {}
}

</script>
<style lang='scss'>
</style>
