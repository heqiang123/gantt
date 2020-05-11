<template>
  <div v-if="formConfig.length || btnListTools.length" class="dee-search-server">
    <el-form ref="searchForm" :inline="true" :rules="rules" :model="form" class="demo-form-inline" size="small" @submit.native.prevent="preOnSubmit">
      <el-form-item
        v-for="(item, itemIndex) in formConfig"
        :key="item.key + itemIndex"
        :prop="item.key"
        :label="(item.title===''||!item.hasOwnProperty('title'))?item.title:item.title===' '?item.title:item.title+':'"
      >
        <el-input
          v-if="item.component.name === 'search'"
          v-model="form[item.key]"
          clearable
          :placeholder="item.component.placeholder"
          @keyup.enter.native="handleSeach(formInline[item.key])"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" @click="handleSeach(formInline[item.key])" />
        </el-input>
        <el-input
          v-if="item && item.component.name === 'el-input'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        >
          <el-button
            v-if="item.slot"
            :slot="item.slot.position"
            v-bind="item.slot.component"
            icon="el-icon-search"
            v-on="item.slot.handler"
          />
        </el-input>
        <el-autocomplete
          v-else-if="item && item.component.name === 'el-autocomplete'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        />
        <el-input-number
          v-else-if="item && item.component.name === 'el-input-number'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        />
        <el-radio-group
          v-else-if="item && item.component.name === 'el-radio'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        >
          <template>
            <el-radio
              v-for="(option,index) in item.options"
              :key="index"
              style="padding: 5px 0"
              :label="option.value"
            >
              {{ option.label }}
            </el-radio>
          </template>
        </el-radio-group>
        <el-checkbox
          v-else-if="item && item.component.name === 'el-checkbox'"
          :key="item.key"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        >
          {{ item.labelName }}
        </el-checkbox>
        <el-select
          v-else-if="item && item.component.name === 'el-select'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        >
          <el-option
            v-for="(option,index) in item.options"
            :key="index"
            v-bind="option"
          />
        </el-select>
        <dee-search-select
          v-else-if="item && item.component.name === 'dee-search-select'"
          v-model="form[item.key]"
          :item-obj="item"
        />
        <el-cascader
          v-else-if="item && item.component.name === 'el-cascader'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        />
        <el-switch
          v-else-if="item && item.component.name === 'el-switch'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        />
        <el-slider
          v-else-if="item && item.component.name === 'el-slider'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        />
        <el-time-select
          v-else-if="item && item.component.name === 'el-time-select'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        />
        <el-time-picker
          v-else-if="item && item.component.name === 'el-time-picker'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        />
        <el-date-picker
          v-else-if="item && item.component.name === 'el-date-picker'"
          v-model="form[item.key]"
          :editable="item.editable?item.editable:false"
          :type="item.type?item.type:'date'"
          v-bind="item"
          v-on="item.handler"
        />
        <el-rate
          v-else-if="item && item.component.name === 'el-rate'"
          v-model="form[item.key]"
          v-bind="item"
          v-on="item.handler"
        />
      </el-form-item>
      <el-form-item v-if="formConfig.length && showBtn">
        <el-button type="primary" @click="submit">{{ searchText }}</el-button>
        <el-button @click="reset">{{ resetText }}</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button v-for="(item, index) in btnList" :key="index" type="primary" :disabled="item.isDisable" @click="onSubmit(item)">{{ item.name }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-for="(item, index) in btnGroup" :key="index" type="primary" :disabled="item.isDisable" v-on="item.handler">{{ item.name }}</el-button>
      </el-form-item> -->
    </el-form>
    <slot />
    <dee-tools class="search-tool" :tools="btnListTools" mode="normal" collapse :dis-tools="disListTools" v-on="toolbarListeners" />
  </div>
</template>

<script>
// import DeeTools from '../DeeLayout/DeeTools'
export default {
  components: { },
  props: {
  //   handleClick: {
  //     type: Function,
  //     required: true
  //   }
    toolbarListeners: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: function() {
        return {}
      }
    },
    showBtn: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    btnListTools: {
      type: Array,
      default: () => []
    },
    disListTools: {
      type: Array,
      default: () => []
    },
    btnList: {
      type: Array,
      default: () => []
    },
    btnGroup: {
      type: Array,
      default: () => []
    },
    formConfig: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    width: {
      type: String,
      default: '120px'
    },
    searchText: {
      type: String,
      default: '查询'
    },
    resetText: {
      type: String,
      default: '重置'
    }
  },
  data() {
    return {
      form: this.value
    }
  },
  computed: {},
  watch: {
    value(newVal) {
      this.form = newVal
    },
    form(newVal) {
      this.$emit('input', newVal)
    }
  },
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {
    search() {
      this.$emit('search', this.form)
    },
    reset() {
      this.$refs['searchForm'].resetFields()
      this.search()
    },
    submit() {
      this.search()
    },
    preOnSubmit() {
      this.search()
    },
    onSubmit(paramsObj) {
      if (paramsObj.isRule) {
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
            this.$emit('handlebtn', paramsObj)
          }
        })
      } else {
        this.$emit('handlebtn', paramsObj)
      }
    },
    handleSeach(seachValue) {
      this.$emit('handleSeach', seachValue)
    }
  },
  filter: {}
}
</script>

<style lang="scss">
  .dee-search-server{
    margin: 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 33px;
    width: 100%;
    .search-input {
      width: 242px;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    .search-tool{
      position: absolute;
      right: 8px;
    }
  }
</style>
