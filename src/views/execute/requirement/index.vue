<template>
  <div style="height:100%" class="requirement-page">
    <layout-bord>
      <template slot="tree">
        <div v-for="(item, index) in asideData" :key="index" class="requirement-aside" @click="handleaside">
          <span>{{ item.title }}</span>
          <span style="margin-left: 8px">{{ item.date }}</span>
          <span style="margin-left: 8px;color: rgb(111, 129, 208)">{{ item.state }}</span>
        </div>
      </template>
      <template slot="main">
        <div class="requirement-main">
          <!-- <condition :dispatch="true" /> -->
          <dee-table :columns="reqirementColumns" :data="reqirementData" :selection-row="selectionRow" @cell-click="handledbclick" @select="handleSelect" @select-all="handleSelectAll">
            <dee-search-server slot="header" v-model="serData" :show-btn="false" :form-config="serForm" :btn-list-tools="tools" />
            <!-- <dee-tools
              id="tools"
              slot="header"
              ref="tools"
              :tools="tools"
              mode="normal"
            /> -->
          </dee-table>
        </div>
      </template>
    </layout-bord>
    <dee-dialog :dialog-visible="dialogVisible" @handleClose="handleClose">
      <require-tab />
    </dee-dialog>
  </div>

</template>
<script>
import layoutBord from '@/components/layoutBord'
// import condition from '@/business-components/mating/condition'
import requireTab from './components/requireTab'
import status from './components/status'
import { getRequirement } from '@/api/execute'
export default {
  name: 'Requirement',
  components: { layoutBord, requireTab },
  data() {
    return {
      serForm: [
        {
          key: 'search',
          component: {
            name: 'search',
            placeholder: '请输入关键字'
          }
        }
      ],
      serData: {},
      asideData: [],
      tools: [
        {
          type: 'icon',
          name: '保存',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
              this.$confirm('确认保存吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
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
          name: '工序指派',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              this.handleProgess()
            }
          }
        },
        {
          type: 'icon',
          name: '整本指派',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
              this.$confirm('确认整本指派吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '整本指派成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消整本指派'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '撤销指派',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
              this.$confirm('确认撤销指派吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '撤销指派成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消撤销指派'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '计划更新',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              this.$confirm('确认计划更新吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '计划更新成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消计划更新'
                })
              })
            }
          }
        }
      ],
      reqirementColumns: [
        { title: '任务编号', key: 'taskNum' },
        { title: '工序号', key: 'number' },
        { title: '工序名称', key: 'name' },
        { title: '计划开始时间', key: 'planStartTime' },
        { title: '计划结束时间', key: 'planEndTime' },
        { title: '前置节点', key: 'front' },
        { title: '状态', key: 'state' },
        { title: '执行资源', key: 'sourse' },
        {
          title: '资源准备情况',
          key: 'sourse',
          component: {
            show: true,
            name: status
          }
        }
      ],
      reqirementData: [],
      selectionRow: {},
      dialogVisible: false,
      selection: []
    }
  },
  mounted() {
    this.getRequirement()
  },
  methods: {
    getRequirement() {
      getRequirement().then(res => {
        this.asideData = res.data.items.items
        this.reqirementData = res.data.items.model
      })
    },

    handledbclick(row, column, cell, event) {
      if (column.property === 'sourse') {
        this.dialogVisible = true
      }
    },

    handleClose() {
      this.dialogVisible = false
    },

    handleaside() {
      getRequirement().then(res => {
        this.reqirementData = res.data.items.model
      })
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
.requirement-page{
  .requirement-aside {
    width: 100%;
    height: 50px;
    font-size: 12px;
    line-height: 50px;
    margin: 8px 0;
    padding: 0 8px;
    border-bottom: 1px solid #d9d9d9;
    cursor: pointer;
  }

  .requirement-main {
    height: 100%;
    width: 100%;
    padding: 8px
  }
}

</style>
