/**
* @Description:
* @author cxg
* @date 2019/8/23
*/
<template>
  <div class="inter-row-com">
    <div class="block-style fill-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    }
  },

  computed: {},
  mounted() {},
  methods: {}
}

</script>
<style lang='scss'>
.inter-row-com{
    height: 100%;
    padding: 4px;
    box-sizing: border-box;
    .block-style{
      padding: 0
    }
}
</style>
