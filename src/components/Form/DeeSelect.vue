<template>
  <div>
    <el-select
      v-if="itemObj.component"
      v-model="selectValue"
      v-bind="itemObj.component"
      v-on="itemObj.handler"
    >
      <el-option
        v-for="(option,index) in deeOptions"
        :key="index"
        :label="option[itemObj.component.labelWord || itemObj.component.optionsLabelW|| 'label']"
        :value="option[itemObj.component.valueWord || 'value']"
        v-bind="option"
      />
    </el-select>
  </div>
</template>

<script>
// import { getTableList } from '../../api/searchCom.js'
// import { get } from '../../utils/http'

export default {
  components: {},
  props: {
    value: {
      type: [Array, String],
      default: () => ''
    },
    itemObj: {
      type: Object,
      default: () => {}
    },
    formValue: {
      type: Object,
      default: () => {}
    }

  },
  data() {
    return {
      selectValue: '',
      deeOptions: [],
      loading: false,
      origeOPtions: []
    }
  },
  computed: {

  },
  watch: {
    selectValue: {
      deep: true,
      handler: function(val) {
        this.$emit('input', val)
        // this.originalData = val
      }
    },
    value: {
      immediate: true,
      handler: function(val) {
        this.selectValue = val
      }
    },
    formValue: {
      deep: true,
      handler: function(newval) {
        if (newval[this.itemObj.component.optionsFilter]) {
          this.deeOptions = this.origeOPtions.filter((item) => {
            return item.filter.split('@-@')[0] === newval[this.itemObj.component.optionsFilter]
          })
        }
      }
    },
    itemObj: {
      immediate: true,
      deep: true,
      handler: function(val) {
        this.deeOptions = val.component && val.component.options ? JSON.parse(JSON.stringify(val.component.options)) : []
        if (val.component.dicType === '0' && val.component.optionsdic) {
          this.deeOptions = []
          this.$store.dispatch('dictionary/getFilterOPtions', val.component.optionsdic).then(res => {
            if (!val.component.optionsFilter) {
              this.$set(this, 'deeOptions', res)
            } else {
              this.origeOPtions = JSON.parse(JSON.stringify(res))
              if (this.formValue[val.component.optionsFilter]) {
                this.deeOptions = this.origeOPtions.filter((item) => {
                  return item.filter.split('@-@')[0] === this.formValue[val.component.optionsFilter]
                })
              }
            }
          })
        } else if (val.component.dicType === '1' && val.component.optionsObj) {
          this.$set(this.itemObj.component, 'valueWord', 'id')
          this.deeOptions = []
          // const searverParams = {
          //   indices: [val.component.optionsObj.toLowerCase()],
          //   pageForm: 0,
          //   pageSize: 40,
          //   searchItems: {
          //     items: [
          //       {
          //         'fieldName': 'tableName',
          //         'operator': 'EQ',
          //         'value': val.component.optionsObj
          //       }
          //     ]
          //   }
          // }
          // getTableList(searverParams).then(res => {
          //   this.$set(this, 'deeOptions', res.items.data)
          // })
        }
      }
    }
  },
  mounted: function() {},
  methods: {
    // remoteMethod(query) {
    //   if (query !== '') {
    //     this.loading = true
    //     const formData = { name: query }
    //     get(this.itemObj.url || '/api/users', formData).then(res => {
    //       this.options = []
    //       if (res.items) {
    //         res.items.forEach(el => {
    //           this.options.push({
    //             value: el[this.itemObj.valueWord || 'id'],
    //             label: el[this.itemObj.labelWord || 'name']
    //           })
    //         })
    //       }
    //     })
    //   } else {
    //     this.options = []
    //   }
    // }
  },
  filter: {}
}
</script>

<style scoped lang="scss">
</style>
