<template>
  <div
    class="dee-title-com"
    style="padding: 10px 0 0 10px"
  >
    <div class="title-box">
      <div
        style="width:4px;height:20px;background:rgba(42,104,201,1);border-radius:2px;align-self: center;margin-right: 7px"
      />
      {{ title }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
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
  methods: {},
  filter: {}
}
</script>

<style lang="scss">
.dee-title-com{
  display: flex;
  justify-content: space-between;
  .title-box{
    font-size:18px;
    font-weight:bold;
    color:rgba(51,51,51,1);
    display: flex;
    flex-direction: row;
  }
}
</style>
