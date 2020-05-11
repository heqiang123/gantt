/**
* @Description: 只读form数据格式化
* @author cxg
* @date 2019/8/28
*/
<template>
  <div>
    <dee-readable-form :form-data="readData" :label-width="labelWidth" />
  </div>
</template>

<script>
import DeeReadableForm from './DeeReadableForm.vue'
export default {
  components: {
    DeeReadableForm
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    formData: {
      type: Array,
      required: true
    },
    labelWidth: {
      type: String,
      default: function() {
        return '90px'
      }
    }
  },
  data() {
    return {
      readData: []
    }
  },
  computed: {},
  watch: {
    form(val) {
      this.formData.forEach((element) => {
        this.$set(element, 'value', val[element.key])
      })
    }
  },
  created() {
    this.readData = this.formData
    this.formData.forEach((element) => {
      this.$set(element, 'value', this.form[element.key])
    })
  },
  mounted() {},
  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
