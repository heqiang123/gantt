<template>
  <home-layout>
    <div slot="task">
      <div class="container-title">
        <span />
        <span>我的任务</span>
      </div>
      <task-Bar />
    </div>
    <div slot="message">
      <div class="container-title">
        <span />
        <span>消息通知</span>
      </div>
      <dee-tab :tabs="tabs" @tabClick="tabPropsEvent">
        <messageList :slot="activeIndex" ref="tableView" />
      </dee-tab>
    </div>
    <div slot="taskList">
      <div class="container-title">
        <span />
        <span>任务列表</span>
      </div>
      <taskList />
    </div>
  </home-layout>
</template>
<script>
import homeLayout from '@/components/homeLayout'
import taskBar from './components/taskBar'
import messageList from './components/messageList'
import taskList from './components/taskList'
export default {
  name: 'HomePage',
  components: { homeLayout, taskBar, messageList, taskList },
  data() {
    return {
      activeIndex: '0',
      tabs: [
        {
          name: '退回通知',
          id: '0',
          data: [
            { path: 'assembly.vue' }
          ]
        },
        {
          name: '流程动态',
          id: '1',
          data: [
            { path: 'sorting.vue' }
          ]
        },
        {
          name: '任务动态',
          id: '2',
          data: [
            { path: 'sorting.vue' }
          ]
        },
        {
          name: '工程更改通知',
          id: '3',
          data: [
            { path: 'sorting.vue' }
          ]
        }
      ]
    }
  },
  methods: {
    tabPropsEvent(val) {
      this.activeIndex = val.index
    }
  }
}
</script>
<style lang="scss">
.title-common {
  height: 46px;
  display: flex;
  align-items: center;
}

</style>
