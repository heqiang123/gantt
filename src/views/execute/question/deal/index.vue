<template>
  <div style="height:100%" class="deal-page">
    <layout-bord>
      <template slot="tree">
        <div v-for="(item, index) in asideData" :key="index" class="requirement-aside" @click="handleaside(item)">
          <div class="ra-box">
            <span>{{ item.title }}</span>
            <span style="font-size: 14px;font-weight: bold">{{ item.reason }}</span>
          </div>
          <div class="ra-box">
            <span>{{ item.startdate | formatData }} - {{ item.enddate | formatData }}</span>
            <dee-tools
              id="tools"
              ref="tools"
              :tools="tools"
              mode="normal"
            />
          </div>
          <!-- <span style="margin-left: 8px">{{ item.date }}</span> -->
          <!-- <span style="margin-left: 8px;color: rgb(111, 129, 208)">{{ item.reason }}</span> -->
        </div>
      </template>
      <template slot="main">
        <div class="requirement-main">
          <div style="margin: 8px 0" class="right-header">
            <span class="chunk-title">任务详情</span>
            <dee-tools
              id="tools"
              :tools="toolsRight"
              mode="normal"
            />
          </div>
          <div>
            <dee-form-box
              :form-data="formData"
              :form="monmentData"
              label-width="100px"
            />
          </div>
          <div class="chunk-title" style="margin: 8px 0">
            问题详情
          </div>
          <div>
            <dee-form-box
              :form-data="formData1"
              :form="monmentData"
              label-width="120px"
            />
          </div>
          <dee-dialog :title="'操作记录'" width="80%" :dialog-visible="showLogs" @handleClose="showLogs=false">
            <dee-table :columns="reqirementColumns" :data="reqirementData" />
          </dee-dialog>

        </div>
      </template>
    </layout-bord>
  </div>

</template>
<script>
import moment from 'moment'
import layoutBord from '@/components/layoutBord'
import { dealQuestion } from '@/api/execute'
export default {
  name: 'Requirement',
  components: { layoutBord },
  filters: {
    formatData(data) {
      return moment(data).format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      reqirementColumns: [
        { title: '处理人', key: 'code' },
        { title: '操作', key: 'qObj' },
        { title: '处理意见', key: 'qObj1' },
        { title: '时间', key: 'qlevel' }
      ],
      reqirementData: [
        {
          code: '张三',
          qObj: '驳回',
          qObj1: '信息不正确，请补充',
          qlevel: '2020-03-01'
        },
        {
          code: '李四',
          qObj: '提交',
          qObj1: '信息已补充完整，请尽快解决',
          qlevel: '2020-03-02'
        },
        {
          code: '王五',
          qObj: '已解决',
          qObj1: '问题已解决',
          qlevel: '2020-03-03'
        },
        {
          code: '王五',
          qObj: '确认',
          qObj1: '问题确认已解决',
          qlevel: '2020-03-04'
        }
      ],
      showLogs: false,
      asideData: [],
      selectionRow: {},
      dialogVisible: false,
      selection: [],
      formData: [
        {
          label: '工作订单号',
          key: 'code',
          component: {
            name: 'readable'
          }
        },
        {
          label: '装配单元',
          key: 'unit',
          component: {
            name: 'readable'
          }
        }, {
          label: '架次号',
          key: 'sortie',
          component: {
            name: 'readable'
          }
        }, {
          label: 'AO',
          key: 'AO',
          component: {
            name: 'readable'
          }
        }, {
          label: '工步信息',
          key: 'step',
          component: {
            name: 'readable'
          }
        }
      ],
      formData1: [
        {
          label: '问题提出时间',
          key: 'startdate'
        },
        {
          label: '问题级别',
          key: 'level'
        }, {
          label: '提出人',
          key: 'creatPerson'
        }, {
          label: '要求解决时间',
          key: 'enddate'
        }, {
          label: '状态',
          key: 'state'
        }, {
          label: '责任人',
          key: 'person'
        },
        {
          label: '备注',
          key: 'remark',
          width: 3
        }
      ],
      monmentData: {},
      tools: [
        {
          type: 'icon',
          name: '接收',
          icon: '/icons/b-processmaterials.png',
          handler: {
            click: () => {
              this.$confirm('确认接收吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '接收成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                })
              })
            }
          }
        }],
      toolsRight: [
        {
          type: 'icon',
          name: '接收',
          icon: '/icons/b-processmaterials.png',
          handler: {
            click: () => {
              this.$confirm('确认接收吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '接收成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '驳回',
          icon: '/icons/c-return.png',
          handler: {
            click: () => {
              this.$confirm('确认接收吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '接收成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '完成',
          icon: '/icons/o-Referencedoc.png',
          handler: {
            click: () => {
              this.$confirm('确认接收吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '接收成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '升级',
          icon: '/icons/c-newchange.png',
          handler: {
            click: () => {
              this.$confirm('确认接收吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '接收成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '操作记录',
          icon: '/icons/o-resourse.png',
          handler: {
            click: () => {
              this.showLogs = true
            }
          }
        }
      ]
    }
  },
  mounted() {
    this.dealQuestion()
  },
  methods: {
    dealQuestion() {
      dealQuestion().then(res => {
        this.asideData = res.data.items.items
        this.monmentData = { ...this.asideData[0], code: 'AG600' + '-' + this.asideData[0].sortie }
      })
    },

    handledbclick(row, column, event) {
      this.dialogVisible = true
    },

    handleClose() {
      this.dialogVisible = false
    },

    handleaside(item) {
      this.monmentData = { ...item, code: 'AG600' + '-' + item.sortie }
    },

    handleProgess() {
      if (this.selection.length === 0) {
        this.$message.error('请至少选择一项')
      } else {
        this.selection.forEach(item => {
          item.state = '已派工'
        })
      }
    },

    handleSelect(selection, row) {
      this.selection = selection
    },

    handleSelectAll(selection, row) {
      this.selection = selection
    }

  }
}
</script>
<style lang="scss">
.deal-page{
  .requirement-aside {
    width: 100%;
    height: 80px;
    font-size: 14px;
    line-height: 30px;
    margin: 8px 0;
    padding:8px;
    border-bottom: 1px solid #d9d9d9;
    cursor: pointer;
    .ra-box{
        display: flex;
        justify-content: space-between;
    }
    }
    .requirement-main {
        height: 100%;
        width: 100%;
        padding: 8px;
        .right-header{
            display: flex;
            justify-content: space-between;
        }
    }
}

</style>
