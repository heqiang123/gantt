
export default {
  props: {},

  data() {
    return {
      // 保留每个单元格校验结果JSON
      resultList: []
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    change(val) {
      if (val.key) {
        if (!this.resultList[val.index]) {
          this.resultList[val.index] = {}
        }
        const list = []
        this.$set(this.resultList[val.index], val.key, val.effectiveState)
        this.resultList.forEach(item => {
          Object.keys(item).forEach(x => {
            if (!item[x]) {
              list.push(x)
            }
          })
        })
        this.$emit('checkResult', !list.length)
      }
    }
  }
}
