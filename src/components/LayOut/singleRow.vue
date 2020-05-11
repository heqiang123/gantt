/**
* @Description:
* @author cxg
* @date 2019/8/23
*/
<template>
  <div class="single-row-com">
    <div class="block-style fill-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  computed: {},
  mounted() {},
  methods: {}
}

</script>
<style lang='scss'>
.single-row-com{
    height: 50%;
    box-sizing: border-box;
    padding: 4px;
    .block-style{
      padding: 0
    }
}
</style>
