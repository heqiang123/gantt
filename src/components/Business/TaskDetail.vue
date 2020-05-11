<template>
  <div class="task-detail">
    <div class="background" style="margin-bottom: 15px">
      <dee-title title="任务信息" />
      <dee-readable-form :split="3" :form-data="taskDetail.taskInfo.formData" />
      <dee-title title="任务处理" />
      <el-row>
        <el-col :span="8">
          <slot name="handle-left" />
          <div>&nbsp;</div>
        </el-col>
        <el-col :span="8">
          <dee-form :split="1" :form="taskDetail.taskHandle.form" :form-data="taskDetail.taskHandle.formData">
            <el-button v-for="(item, i) in taskDetail.taskHandle.buttons" :key="i" v-on="item.handler">{{ item.name }}
            </el-button>
          </dee-form>
        </el-col>
        <el-col :span="8">
          <slot name="handle-right" />
          <div>&nbsp;</div>
        </el-col>
      </el-row>
    </div>
    <div class="background">
      <dee-title title="属性" />
      <dee-readable-form :split="3" :form-data="taskDetail.taskProp.formData" />
      <dee-title title="主要内容" />
      <dee-table
        :pagination="taskDetail.taskMain.pagination"
        :columns="taskDetail.taskMain.columns"
        :data="taskDetail.taskMain.data"
        v-bind="taskDetail.taskMain.options"
        v-on="taskDetail.taskMain.handler"
      />
      <dee-title title="附件" />
      <dee-table
        :pagination="taskDetail.taskAppendix.pagination"
        :columns="taskDetail.taskAppendix.columns"
        :data="taskDetail.taskAppendix.data"
        v-bind="taskDetail.taskAppendix.options"
        v-on="taskDetail.taskAppendix.handler"
      >
        <dee-tools slot="header" :tools="taskDetail.taskAppendix.options.tools" />
      </dee-table>
      <dee-title title="流程审批概况" />
      <dee-table
        :pagination="taskDetail.taskFlow.pagination"
        :columns="taskDetail.taskFlow.columns"
        :data="taskDetail.taskFlow.data"
        v-bind="taskDetail.taskFlow.options"
        v-on="taskDetail.taskFlow.handler"
      />
    </div>
  </div>
</template>

<script>
import DeeReadableForm from '../../components/Form/DeeReadableForm.vue'
import DeeForm from '../../components/Form/DeeForm.vue'
import DeeTitle from '../../components/DeeTitle.vue'
// import DeeTable from '../../components/Table/DeeTable.vue'
import DeeTools from '../../components/DeeLayout/DeeTools.vue'

export default {
  components: { DeeReadableForm, DeeForm, DeeTitle, DeeTools },
  props: {
    taskDetail: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {},
  filter: {}
}
</script>

<style lang="scss">
  .task-detail .background {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
</style>
