<template>
  <div class="condition">
    <div class="condition-from">
      <dee-form
        v-if="assemblyState"
        :form-data="formData"
        :form="form"
        label-width="80px"
      />
      <dee-form
        v-if="assemblyGz"
        :form-data="formDatagz"
        :form="form"
        label-width="80px"
      />
      <dee-form
        v-else-if="radioState"
        :form-data="formDataradio"
        :form="form"
        label-width="80px"
      />
      <dee-form
        v-else-if="dispatch"
        :form-data="formDataDispatch"
        :form="form"
        label-width="80px"
      />
      <el-form v-else :model="formInline" label-width="80px" class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务名称">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开工时间">
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker v-model="formInline.date1" type="date" style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align:center">
                至
              </el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker v-model="formInline.date2" type="date" style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="完工时间">
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker v-model="formInline.date3" type="date" style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align:center">
                至
              </el-col>
              <el-col :span="11">
                <el-form-item>
                  <el-date-picker v-model="formInline.date4" type="date" style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="condition-btn">
      <el-button size="mini" type="primary" class="btn-button" @click="search">查询</el-button>
    </div>
  </div>
</template>
<script>
import DeeForm from '@/components/Form/DeeForm2'
export default {
  name: 'Condition',
  components: { DeeForm },
  props: {
    assemblyState: {
      type: Boolean,
      default: false
    },
    assemblyGz: {
      type: Boolean,
      default: false
    },
    radioState: {
      type: Boolean,
      default: false
    },
    dispatch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formInline: {
        date1: '',
        date2: ''
      },
      formData: [
        {
          split: 3,
          data: [
            {
              title: '物料号',
              key: 'number',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '物料名称',
              key: 'name',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '供应商',
              key: 'supplier',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      formDataradio: [
        {
          split: 3,
          data: [
            {
              title: '物料号',
              key: 'number',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '物料名称',
              key: 'name',
              component: {
                name: 'el-input'
              }
            },
            {
              component: {
                name: 'el-radio',
                options: [
                  {
                    label: '全部满足',
                    value: '全部满足'
                  },
                  {
                    label: '部分满足',
                    value: '部分满足'
                  },
                  {
                    label: '不满足',
                    value: '不满足'
                  },
                  {
                    label: '代料',
                    value: '代料'
                  }
                ]
              }
            }
          ]
        }
      ],
      formDatagz: [
        {
          split: 4,
          data: [
            {
              title: '物料号',
              key: 'number',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '物料名称',
              key: 'name',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '供应商',
              key: 'supplier',
              component: {
                name: 'el-input'
              }
            },
            {
              component: {
                name: 'el-radio',
                options: [
                  {
                    label: '关重件',
                    value: '关重件'
                  }
                ]
              }
            }
          ]
        }
      ],
      formDataDispatch: [
        {
          split: 2,
          data: [
            {
              title: '',
              key: 'number',
              component: {
                name: 'el-select'
              }
            },
            {
              title: '',
              key: 'name',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      form: {
        number: '',
        name: '',
        supplier: ''
      }
    }
  },
  methods: {
    search() {
      this.$emit('search', this.form)
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/variables.scss';
.condition {
  height: 48px;
  display: flex;
  align-items: center;
  .dee-form2 {
    padding-right: 16px;
    padding-left: 0;
    .el-form-item {
      margin-bottom: 0!important;
      .el-radio {
        margin-right:8px
      }
      .el-radio__label {
        color:$formLabelColor;
        font-weight: 400!important;
        padding-left: 6px!important
      }
      .el-form-item__label {
        font-size: $fontSize14;
        line-height: $height36;
        color:$formLabelColor;
        font-weight: 400!important;
      }
      .el-input__inner {
        height: $height36;
        line-height: $height36;
      }
    }
  }
  &-from {
    flex: 1;
    .el-row {
      margin-right: 8px;
      .el-form-item {
        margin-bottom:0;
        .el-form-item__content {
          height: $height36;
          line-height: $height36;
          .el-input__icon {
            line-height: $height36;
          }
        }
        .el-form-item__label {
          font-size: $fontSize14;
          line-height: $height36;
          font-weight: 400!important
        }
        .el-input__inner {
          height: $height36;
          line-height: $height36;
        }
      }
    }
  }
  &-btn {
    width:99px;
    .btn-button {
      width:99px;
      height:34px;
      background:linear-gradient(180deg,rgba(103,145,218,1) 0%,rgba(100,130,220,1) 100%);
      border-radius:2px;
      border:0px solid rgba(151,151,151,1);
    }
  }
}
</style>
