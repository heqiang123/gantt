/**
* @Description:
* @author cxg
* @date 2020/04/28
*/
<template>
  <div class="table-view-com">
    <dee-table :columns="reqirementColumns" :data="reqirementData" selection-row>
      <dee-search-server slot="header" v-model="serData" :show-btn="false" :form-config="serForm" :btn-list-tools="tools" />
    </dee-table>
  </div>
</template>

<script>
import { preliminary } from '@/api/execute'
export default {
  components: {},
  props: {
    type: {
      default: () => '0',
      type: String
    }
  },
  data() {
    return {
      serData: {},
      serForm: [
        {
          key: 'search',
          component: {
            name: 'search',
            placeholder: '请输入关键字'
          }
        }
      ],
      reqirementColumns: [
        { title: '问题编号', key: 'code' },
        { title: '问题类型', key: 'qObj.t' },
        { title: '问题描述', key: 'qObj.d' },
        { title: '问题级别', key: 'qlevel' },
        { title: '提出人', key: 'examer' },
        { title: '提出时间', key: 'reason' },
        { title: '责任人', key: 'person' },
        { title: '要求解决时间', key: 'startdate' },
        { title: '附件', key: 'person' },
        { title: '状态', key: 'result' },
        { title: '装配单元', key: 'unit' },
        { title: 'AO', key: 'AO' },
        { title: '工步', key: 'step' }
      ],
      reqirementData: [],
      tools: [
        {
          type: 'icon',
          name: '添加',
          icon: '/icons/c-submission.png',
          handler: {
            click: () => {
              this.$confirm('确认提交吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '编辑',
          icon: '/icons/c-submission.png',
          handler: {
            click: () => {
              this.$confirm('确认提交吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '删除',
          icon: '/icons/o-Referencedoc.png',
          handler: {
            click: () => {
              this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '确认成功!'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '提交',
          icon: '/icons/c-submission.png',
          handler: {
            click: () => {
              this.$confirm('确认提交吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '确认',
          icon: '/icons/o-Referencedoc.png',
          handler: {
            click: () => {
              this.$confirm('是否确认?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '确认成功!'
                })
              })
            }
          }
        }
      ]
    }
  },

  computed: {},
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      preliminary().then(res => {
        this.reqirementData = res.data.items.items
      })
    }
  }
}

</script>
<style lang='scss'>
</style>
