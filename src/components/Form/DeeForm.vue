/**
 * @Description: form组件
 * @author lyk
 * @date 2019/6/4
*/
<template>
  <el-form ref="form" class="dee-form" :model="form" :rules="rules" :label-width="labelWidth">
    <el-row v-for="row in sliceFormData.length" :key="row">
      <el-col v-for="item in sliceFormData[row-1]" :key="item.title" :span="24/split">
        <el-form-item :label="item.title" :prop="item.key">
          <el-input
            v-if="item.component && item.component.name === 'el-input'"
            v-model="form[item.key]"
            v-bind="item.component"
            @keyup.enter.native="item.submit"
            v-on="item.handler"
          />
          <el-autocomplete
            v-if="item.component && item.component.name === 'el-autocomplete'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          />
          <el-input-number
            v-else-if="item.component && item.component.name === 'el-input-number'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          />
          <el-radio-group
            v-else-if="item.component && item.component.name === 'el-radio'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          >
            <template>
              <el-radio
                v-for="(option,index) in item.component.options"
                :key="index"
                style="padding: 5px 0"
                :label="option.value"
              >
                {{ option.label }}
              </el-radio>
            </template>
          </el-radio-group>
          <el-checkbox-group v-else-if="item.component && item.component.name === 'el-checkbox'" v-model="form[item.key]" v-bind="item.component" v-on="item.handler">
            <template>
              <el-checkbox
                v-for="(option,index) in item.component.options"
                :key="index"
                :label="option.label"
              />
            </template>
          </el-checkbox-group>
          <el-select
            v-else-if="item.component && item.component.name === 'el-select'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          >
            <el-option
              v-for="option in item.component.options"
              :key="option.value"
              v-bind="option"
            />
          </el-select>
          <el-cascader
            v-else-if="item.component && item.component.name === 'el-cascader'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          />
          <el-switch
            v-else-if="item.component && item.component.name === 'el-switch'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          />
          <el-slider
            v-else-if="item.component && item.component.name === 'el-slider'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          />
          <el-time-select
            v-else-if="item.component && item.component.name === 'el-time-select'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          />
          <el-time-picker
            v-else-if="item.component && item.component.name === 'el-time-picker'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          />
          <el-date-picker
            v-else-if="item.component && item.component.name === 'el-date-picker'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          />
          <el-rate
            v-else-if="item.component && item.component.name === 'el-rate'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          />
          <el-color-picker
            v-else-if="item.component && item.component.name === 'el-color-picker'"
            v-model="form[item.key]"
            v-bind="item.component"
            v-on="item.handler"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item v-if="$slots.default">
      <slot />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  components: {},
  props: {
    rules: {
      type: Object,
      default: function() {
        return {}
      }
    },
    split: {
      type: Number,
      required: true
    },
    labelWidth: {
      type: String,
      default: function() {
        return '93px'
      }
    },
    form: {
      type: Object,
      required: true
    },
    formData: {
      type: Array,
      default: function() {
        return []
      }
    },
    formConfig: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      sliceFormData: [],
      checkedCities: ''
    }
  },
  computed: {},
  watch: {
    formData: {
      handler: function(val) {
        this.sliceFormData = this.sliceArray(val)
      }
    },
    formConfig: {
      handler: function(val) {
        this.sliceFormData = this.sliceArray(val)
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      if (this.formData && this.formData.length) {
        this.sliceFormData = this.sliceArray(this.formData)
      } else {
        this.sliceFormData = this.sliceArray(this.formConfig)
      }
    })
  },
  methods: {
    handleCheckAllChange(val) {
      // this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    validate() {
      return this.$refs['form'].validate()
    },
    reset() {
      this.$refs['form'].resetFields()
    },
    sliceArray(e) {
      let num = 0
      const array = []
      for (let i = 0; i < e.length; i++) {
        if (i % this.split === 0 && i !== 0) {
          array.push(e.slice(num, i))
          num = i
        }
        if ((i + 1) === e.length) {
          array.push(e.slice(num, (i + 1)))
        }
      }
      return array
    }
  },
  filter: {}
}
</script>

<style lang="scss">
  .dee-form {
    padding: 0 20px;

    .el-input__inner {
      width: 75%;
    }

    .el-textarea__inner {
      width: 75%;
    }

    .el-select {
      width: 75%;
    }

    .el-select .el-input__inner {
      width: 100%;
    }
  }
</style>
