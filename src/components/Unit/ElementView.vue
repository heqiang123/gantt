<template>
  <div class="element-com" @click="handler(scope.row)">
    <unit :icon-value="unitKey ? scope.row[unitKey] : scope.row.value" :classification-icon="unitype? scope.row[unitype] : scope.row.classification" />
  </div>
</template>

<script>
import Unit from './index.vue'
export default {
  components: { Unit },
  /* eslint-disable */
  props: {
    value: { 
      require: true
    },
    handler: {
      type: Function,
      default:()=>{}
    },
    unitKey: {
      type: String,
      default:()=>''
    },
    unitype: {
      type: String,
      default:()=>''
    },
    scope: { 
      default: null, 
    }, 
    // 通过 component 中 props 字段传过来的数据，此字段需要先在 component 中配置
    myProps: { 
      default: null 
    } 
  },
  /* eslint-disable */
  data() {
    return {
      resultData: [],
      classificationIcon: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {}
}
</script>
<style lang="scss">

</style>
