<template>
  <div>
    <dee-form :form-data="topFormData" :form="topForm" />
    <dee-table
      :columns="bottomColumns"
      :data="bottomData"
      :selection-row="selectionRow"
      @select="hanleSelect"
      @select-all="handleSelectAll"
    >
      <dee-tools
        id="tools"
        ref="tools"
        slot="header"
        :tools="tools"
        mode="normal"
      />
    </dee-table>
    <div style="width:100%;display:flex;justify-content:center;margin-top:18px">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handleCancle">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Create',
  props: {
    dialogData: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectionRow: {},
      section: [],
      topFormData: [
        {
          split: 3,
          data: [
            {
              title: '方案',
              key: 'program',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '创建时间',
              key: 'creationTime',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '创建人',
              key: 'founder',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      topForm: {
        program: '',
        creationTime: '',
        founder: ''
      },
      tools: [
        {
          type: 'icon',
          name: '新增',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
              this.bottomData.push({
                model: '',
                sorting: '',
                sequence: ''
              })
            }
          }
        },
        {
          type: 'icon',
          name: '删除',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
              if (this.section.length === 0) {
                this.$message.error('请至少选择一项')
              }
            }
          }
        }
      ],
      bottomColumns: [
        { title: '机型', key: 'model' },
        { title: '架次', key: 'sorting' },
        { title: '当前顺序号', key: 'sequence' }
      ],
      bottomData: []
    }
  },
  watch: {
    title(val) {
      if (val === '新建') {
        this.topForm.program = ''
        this.topForm.creationTime = ''
        this.topForm.founder = ''
        this.bottomData = []
      } else {
        this.topForm.program = this.dialogData[0].label
        this.topForm.creationTime = this.$moment(new Date()).format('YYYY-MM-DD')
        this.topForm.founder = 'Adminintrator'
        this.bottomData.push({
          model: 'AG600',
          sorting: '001',
          sequence: '001'
        },
        {
          model: 'AG700',
          sorting: '001',
          sequence: '002'
        },
        {
          model: 'AG800',
          sorting: '001',
          sequence: '003'
        })
      }
    }
  },
  mounted() {
    if (this.title === '新建') {
      this.topForm.program = ''
      this.topForm.creationTime = ''
      this.topForm.founder = ''
      this.bottomData = []
    } else {
      this.topForm.program = this.dialogData[0].label
      this.topForm.creationTime = this.$moment(new Date()).format('YYYY-MM-DD')
      this.topForm.founder = 'Adminintrator'
      this.bottomData.push({
        model: 'AG600',
        sorting: '001',
        sequence: '001'
      },
      {
        model: 'AG700',
        sorting: '001',
        sequence: '002'
      },
      {
        model: 'AG800',
        sorting: '001',
        sequence: '003'
      })
    }
  },
  methods: {
    handleSave() {
      this.$emit('save', this.topForm, this.bottomData)
    },

    handleCancle() {
      this.$emit('cancle')
    },

    hanleSelect(section) {
      this.section = section
    },

    handleSelectAll(section) {
      this.section = section
    }
  }
}
</script>
