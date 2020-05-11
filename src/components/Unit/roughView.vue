/**
* @Description: 粗糙度
* @author cxg
* @date 2019/9/19
*/
<template>
  <div class="rough-surface">
    <!-- {{ type }} -->
    <div class="rough-value">{{ value }}</div>
    <div class="gou-box">
      <div class="gou-wei" />
      <div v-if="type === '去除材料'" class="gou-hen" />
      <div v-if="type === '不用去除材料'" class="gou-yuan" />
    </div>
    <!-- <svg-icon class="select-icon-item roughness" :icon-class="type" /> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: String,
      default: () => ''
    },
    type: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}

</script>
<style lang='scss' scoped>
.rough-surface {
    text-align: center;
    position: relative;
    // width: 30px;
    height: 36px;
    padding-top: 20px;
    box-sizing: border-box;
    .rough-value{
      position: absolute;
      top: -2px;
      left: -17px;
      width: 54px;
      font-size: 12px;
      text-align: center;
    }
    .gou-box{
        height: 1px;
        width: 45px;
        background: #333;
        position: relative;
        transform:rotate(-60deg);
        transform-origin: center center;
        .gou-wei{
            position: absolute;
            height: 1px;
            width: 20px;
            left: 0;
            bottom: 0;
            background: #333;
            transform:rotate(-60deg);
            transform-origin: left top
        }
        .gou-hen{
            position: absolute;
            height: 1px;
            width: 20px;
            left: 0;
            bottom: 0;
            background: #333;
            transform:rotate(60deg);
            transform-origin: right top
        }
        .gou-yuan{
            height: 14px;
            width: 14px;
            border: 1px solid #333;
            border-radius: 7px;
            position: absolute;
            bottom: 0;
            left: 4px;
        }
    }
  }
  .roughness{
    padding-top: 20px;
    font-size: 34px;
  }
</style>
