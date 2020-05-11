<template>
  <el-collapse v-model="activeName" class="collapse" accordion>
    <el-collapse-item title="C阶段型号更改申请 - C6688" name="1">
      <div style="font-size: 16px"><span style="color: #999999">2019-3-28 11:00</span><span
        style="float: right;color: #2A68C9;font-weight: bold"
      >启动</span></div>
    </el-collapse-item>
    <el-collapse-item title="S阶段 - S592" name="2">
      <div style="font-size: 16px"><span style="color: #999999">2019-3-25 12:00</span><span
        style="float: right;color: #F75A27;font-weight: bold"
      >审阅</span></div>
    </el-collapse-item>
    <el-collapse-item title="产品代号申请单 - A110789" name="3">
      <div style="font-size: 16px"><span style="color: #999999">2019-3-2 12:00</span><span
        style="float: right;color: #0DB45E;font-weight: bold"
      >已发放</span></div>
    </el-collapse-item>
    <el-collapse-item title="B型号更改申请" name="4">
      <div style="font-size: 16px"><span style="color: #999999">2019-2-28 11:00</span><span
        style="float: right;color: #2A68C9;font-weight: bold"
      >启动</span></div>
    </el-collapse-item>
    <el-collapse-item title="B型号更改申请" name="5">
      <div style="font-size: 16px"><span style="color: #999999">2019-2-28 11:00</span><span
        style="float: right;color: #2A68C9;font-weight: bold"
      >启动</span></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      activeName: '1'
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
  .collapse .el-collapse-item__header {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
</style>
