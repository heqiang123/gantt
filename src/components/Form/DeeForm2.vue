/**
* @Description: 新form组件
* @author lyk
* @date 2019/6/13
*/
<template>
  <el-form
    ref="form"
    class="dee-form2"
    :model="form"
    :rules="rules"
    :label-width="labelWidth"
    v-bind="params"
    :label-position="labelPosition"
    @submit.native.prevent="preOnSubmit"
  >
    <el-row v-for="(row,rowIndex) in formData" :key="rowIndex" :gutter="20">
      <div v-if="row.title" class="sub-title">{{ row.title }}</div>
      <div class="form-item-container">
        <el-col
          v-for="item in row.data"
          :key="item.key"
          :span="widthRange(row.split).includes(item.width)?item.width*splitNumber(row.split):splitNumber(row.split)"
        >
          <el-form-item
            :class="labelPosition==='top'?'label-top':''"
            :label="(item.title===''||!item.hasOwnProperty('title'))?item.title:item.title===' '?item.title:item.title+':'"
            :prop="item.key"
            :style="item.style"
            :label-width="(item.title===''||!item.hasOwnProperty('title'))?'0':labelWidth"
          >
            <span
              v-if="item.component && item.component.name==='link'"
              class="link"
              style="line-height: 40px"
              v-on="item.handler"
            >{{ form[item.key] }}</span>
            <span v-else-if="item.component && item.component.name==='readable'" style="line-height: 40px"> {{ item.component.formatter?format(item.component.formatter.type,item.component.formatter.pattern,form[item.key]):form[item.key] }} </span>
            <slot v-else-if="item.component && item.component.name==='custom'" :item="item" :name="item.key" />
            <el-input
              v-else-if="item.component && item.component.name === 'el-input'"
              v-model="form[item.key]"
              v-bind="item.component"
              v-on="item.handler"
              @keyup.enter.native="item.submit"
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
              v-else-if="item.component && item.component.name === 'el-autocomplete'"
              v-model="form[item.key]"
              v-bind="item.component"
              @keyup.enter.native="item.submit"
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
            <!--            <el-checkbox-group-->
            <!--              v-else-if="item.component && item.component.name === 'el-checkbox'"-->
            <!--              v-model="form[item.key]"-->
            <!--              v-bind="item.component"-->
            <!--              v-on="item.handler"-->
            <!--            >-->
            <!--              <template>-->
            <!--                <el-checkbox-->
            <!--                  v-for="(option,index) in item.component.options"-->
            <!--                  :key="index"-->
            <!--                  v-bind="option.component"-->
            <!--                  v-on="option.handler"-->
            <!--                >-->
            <!--                  {{ option.component.labelName }}-->
            <!--                </el-checkbox>-->
            <!--              </template>-->
            <!--            </el-checkbox-group>-->
            <el-checkbox
              v-else-if="item.component && item.component.name === 'el-checkbox'"
              :key="item.key"
              v-model="form[item.key]"
              v-bind="item.component"
              v-on="item.handler"
            >
              {{ item.component.labelName }}
            </el-checkbox>
            <!-- <el-select
              v-else-if="item.component && item.component.name === 'el-select'"
              v-model="form[item.key]"
              v-bind="item.component"
              v-on="item.handler"
            >
              <el-option
                v-for="(option,index) in item.component.options"
                :key="index"
                v-bind="option"
              />
            </el-select> -->
            <dee-select
              v-else-if="item.component && item.component.name === 'el-select'"
              v-model="form[item.key]"
              :item-obj="item"
              :form-value="form"
            />
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
              value-format="yyyy-MM-dd"
              :editable="item.component.editable?item.component.editable:false"
              :type="item.component.type?item.component.type:'date'"
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
            <dee-upload
              v-else-if="item.component && item.component.name === 'upload'"
              :id="item.key"
              v-bind="item.component"
              :data="form[item.key]"
              v-on="item.handler"
              @uploadData="(val)=>{form[item.key]=[...val]}"
            />
          </el-form-item>
        </el-col>
      </div>
    </el-row>
    <div v-if="$slots.content" class="form-content">
      <slot name="content" />
    </div>
    <el-form-item v-if="formButtons.length>0||$slots.default" :class="formBtnPosition">
      <div v-if="formButtons.length>0">
        <el-button
          v-for="(item,index) in formButtons"
          :key="item.text+index"
          v-bind="item.component"
          v-on="item.handler"
          @click="click(item.type,item.validate)"
        >
          {{ item.text }}
        </el-button>
      </div>
      <slot />
    </el-form-item>
  </el-form>
</template>

<script>
import { formatNumber, formatDate, formatMoney } from '../../utils/util'
import DeeUpload from './DeeUpload.vue'
import DeeSelect from './DeeSelect.vue'

export default {
  components: { DeeUpload, DeeSelect },
  props: {
    rules: {
      type: Object,
      default: function() {
        return {}
      }
    },
    labelWidth: {
      type: String,
      default: function() {
        return '90px'
      }
    },
    labelPosition: {
      type: String,
      default: function() {
        return 'right'
      }
    },
    form: {
      type: Object,
      required: true
    },
    formData: {
      type: Array,
      required: true
    },
    formButtons: {
      type: Array,
      default: function() {
        return []
      }
    },
    formBtnPosition: {
      type: String,
      default: function() {
        return 'left'
      }
    },
    params: {
      type: Object,
      default: function() {
        return {
          validateOnRuleChange: false
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    widthRange() {
      return function(split) {
        let num = [1]
        switch (split) {
          case 1:
            num = [1]
            break
          case 2:
            num = [1, 2]
            break
          case 3:
            num = [1, 2, 3]
            break
          case 4:
            num = [1, 2, 3, 4]
        }
        return num
      }
    },
    splitNumber() {
      return function(split) {
        let num = 24
        switch (split) {
          case 1:
            num = 24
            break
          case 2:
            num = 12
            break
          case 3:
            num = 8
            break
          case 4:
            num = 6
            break
        }
        return num
      }
    }
  },
  watch: {},
  created: function() {
  },
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {
    preOnSubmit() {
      return false
    },
    click(type, validate) {
      if (type === 'submit') {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$emit('on-submit')
          }
        })
      } else if (type === 'cancel') {
        this.reset()
        this.$emit('on-cancel')
      } else {
        if (validate) {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$emit(`on-${type}`)
            }
          })
        } else {
          this.$emit(`on-${type}`)
        }
      }
    },
    validate() {
      return this.$refs['form'].validate()
    },
    reset() {
      this.$refs['form'].resetFields()
    },
    format(type, pattern, val) {
      let value = val
      switch (type) {
        case 'number':
          value = formatNumber(val, pattern)
          break
        case 'date':
          value = formatDate(val, pattern)
          break
        case 'money':
          value = formatMoney(val, pattern)
          break
        case 'diction':
          value = pattern[val]
          break
      }
      return value
    }
  },
  filter: {}
}
</script>

<style lang="scss">
  @import "../../styles/index";
  @import "../../styles/variables";

  .dee-form2 {
    padding: 0 20px;
     .form-content{
       padding-bottom: 20px;
     }
    .link {
      cursor: pointer;
      color: $link-color;
    }

    .label-top{
      .el-form-item__label {
        padding-bottom: 0 !important;
        display: inline-block;
        line-height: 32px;
      }
    }

    .el-select {
      width: 100%;
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 100%;
    }

    .el-autocomplete, .el-autocomplete.el-input__inner {
      width: 100%;
    }

    .el-cascader {
      width: 100% !important;
    }

    .form-item-container {
      display: flex;
      flex-wrap: wrap;
    }

    .el-form-item {
      margin-bottom: 22px !important;
    }

    .el-form-item__content {
      line-height: 32px;
    }

    .noPadding {
      .el-form-item__content {
        margin-left: 0 !important;
      }
    }

    .right {
      display: flex;
      justify-content: flex-end;

      .el-form-item__content {
        margin-left: 0 !important;
      }
    }

    .center {
      display: flex;
      justify-content: center;

      .el-form-item__content {
        margin-left: 0 !important;
      }
    }

    .left {
      display: flex;
      justify-content: flex-start;
    }
  }
</style>
