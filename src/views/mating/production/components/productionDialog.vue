<template>
  <div>
    <dee-form ref="product" :form-data="productFormData" :form="form" :rules="rules" />
    <div class="product-dialog">
      <el-button @click="handleCommit">保存</el-button>
      <el-button @click="handleCancle">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductionDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    productionData: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    const validateId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入计划号'))
      } else {
        callback()
      }
    }
    const validateBatches = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入批架次'))
      } else if (Number(value) < Number(this.productionData[0].batches)) {
        callback(new Error('该批架次不能小于首行批架次!'))
      } else {
        callback()
      }
    }
    const validateManu = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入制造架次'))
      } else if (Number(value) < Number(this.productionData[0].manufacturing)) {
        callback(new Error('该制造架次不能小于首行制造架次!'))
      } else {
        callback()
      }
    }
    const validateType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入机型'))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入客户名称'))
      } else {
        callback()
      }
    }
    const validateTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入交付日期'))
      } else {
        callback()
      }
    }
    const validatePreTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入编制时间'))
      } else {
        callback()
      }
    }
    const preparationPerson = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入编制人'))
      } else {
        callback()
      }
    }
    return {
      productFormData: [
        {
          split: 2,
          data: [
            {
              title: '计划号',
              key: 'id',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '机型',
              key: 'type',
              component: {
                name: 'el-select',
                options: [
                  { value: 'AG600', label: 'AG600' }
                ]
              }
            }
          ]
        },
        {
          split: 2,
          data: [
            {
              title: '批架次',
              key: 'batches',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '制造架次',
              key: 'manufacturing',
              component: {
                name: 'el-input'
              }
            }
          ]
        },
        {
          split: 2,
          data: [
            {
              title: '客户名称',
              key: 'name',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '交付日期',
              key: 'deliverTime',
              component: {
                name: 'el-date-picker'
              }
            }
          ]
        },
        {
          split: 2,
          data: [
            {
              title: '编制时间',
              key: 'preparationTime',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '编制人',
              key: 'preparationPerson',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      form: {
        id: '',
        type: '',
        batches: '',
        manufacturing: '',
        name: '',
        deliverTime: '',
        preparationTime: '',
        preparationPerson: ''
      },
      rules: {
        id: [
          { validator: validateId, trigger: 'blur' }
        ],
        type: [
          { validator: validateType, trigger: 'blur' }
        ],
        batches: [
          { validator: validateBatches, trigger: 'blur' }
        ],
        manufacturing: [
          { validator: validateManu, trigger: 'blur' }
        ],
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        deliverTime: [
          { validator: validateTime, trigger: 'blur' }
        ],
        preparationTime: [
          { validator: validatePreTime, trigger: 'blur' }
        ],
        preparationPerson: [
          { validator: preparationPerson, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    dialogVisible() {
      this.form = {
        id: this.selectData[0].id,
        type: 'AG600',
        batches: this.selectData[0].batches,
        manufacturing: this.selectData[0].manufacturing,
        name: this.selectData[0].name,
        deliverTime: this.selectData[0].deliverTime,
        preparationTime: this.selectData[0].preparationTime,
        preparationPerson: this.selectData[0].preparationPerson
      }
      this.$refs.product.$refs.form.resetFields()
    }
  },
  mounted() {
    this.form = {
      id: this.selectData[0].id,
      type: 'AG600',
      batches: this.selectData[0].batches,
      manufacturing: this.selectData[0].manufacturing,
      name: this.selectData[0].name,
      deliverTime: this.selectData[0].deliverTime,
      preparationTime: this.selectData[0].preparationTime,
      preparationPerson: this.selectData[0].preparationPerson
    }
    this.$refs.product.$refs.form.resetFields()
  },
  methods: {
    handleCommit() {
      this.$refs.product.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('commit', this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancle() {
      this.$emit('cancle')
    }
  }
}
</script>
<style lang="scss">
.product-dialog {
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>
