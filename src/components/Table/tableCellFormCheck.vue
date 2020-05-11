<template>
  <div class="flex-start topLevel">
    <div :class="{ require: isRequire }" style="align-self:end" />
    <div>
      <el-form ref="ruleForm" :model="scope.row" :rules="rules">
        <el-form-item :prop="bindKey">
          <el-input
            v-if="component && component.name === 'el-input'"
            v-model="scope.row[bindKey]"
            v-bind="component"
            placeholder="请输入"
            v-on="handler"
            @change="change"
          />
          <el-select
            v-else-if="component && component.name === 'el-select'"
            v-model="scope.row[bindKey]"
            v-bind="component"
            @change="change"
            v-on="handler"
          >
            <el-option
              v-for="option in component.options"
              :key="option.value"
              v-bind="option"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    // 行对像
    scope: {
      type: Object,
      default: null
    },
    // 需要与列的key值对应
    bindKey: {
      type: String,
      default: ''
    },
    // 控制 * 是否显示
    isRequire: {
      type: Boolean,
      default: false
    },
    // 校验
    formRules: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 事件对象
    handler: {
      type: Object,
      default: null
    },

    component: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      rules: {}
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$set(this.rules, this.bindKey, this.formRules)
    this.validation(this.scope.row[this.bindKey])
  },
  methods: {
    change(val) {
      this.$set(this.scope.row, this.bindKey, val)
      this.validation(val)
    },
    validation(val) {
      this.$refs['ruleForm'].validate().then(res => {
        this.$emit('changeForm', { val: val, row: this.scope.row, index: this.scope.$index, key: this.bindKey, effectiveState: res })
      }).catch(e => {
        this.$emit('changeForm', { val: val, row: this.scope.row, index: this.scope.$index, key: this.bindKey, effectiveState: e })
      })
    }
  }
}
</script>

<style lang="scss">
  .topLevel {
    .require:before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
    .el-form-item__content{
      margin-bottom: 15px;
    }
  }
</style>
