<template>
  <div class="task-bar">
    <div v-for="(item, index) in barList" :key="index" class="bar-box">
      <div class="box-image">
        <div>
          <img :src="item.image" alt="">
          <div>{{ item.name }}</div>
        </div>
        <img style="margin-left:18px" src="/icons/element.png" alt="">
      </div>
      <div class="box-task">
        <div v-for="(task,taskItem) in taskData" :key="taskItem" class="task-barwait">
          <span>{{ task.name }}</span>
          <span>{{ task.num }}</span>
        </div>
      </div>
    </div>
    <!-- <div class="bar-wait">
      <div class="wait-image">
        <img src="/icons/receive.png" alt="">
        <img style="margin-left:18px" src="/icons/element.png" alt="">
      </div>
      <div class="wait-task">
        <div v-for="(task,taskItem) in 6" :key="taskItem" class="task-barwait">
          <span>待接收任务</span>
          <span>36</span>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'TaskBar',
  data() {
    return {
      barList: [
        {
          image: '/icons/receive.png',
          name: '配套管理'
        },
        {
          image: '/icons/submit.png',
          name: '异常信息'
        },
        {
          image: '/icons/receive.png',
          name: '装配计划'
        }
      ],
      taskData: [
        { name: '待发出', num: '36' },
        { name: '待确认', num: '46' },
        { name: '已退回', num: '56' }
      ]
    }
  }
}
</script>
<style lang="scss">
.task-bar {
  padding: 0 43px 0 24px;
  .bar-box {
    display: flex;
    align-items: center;
    height: 240px;
    border-bottom: 1px solid #EEEEEE;
    .box-image {
      width: 126px;
      display: flex;
      align-items: center;
    }
    .box-task {
      flex: 1;
      .task-barwait {
        padding-right: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height:35px;
        margin: 26px 0;
        background:linear-gradient(270deg,rgba(211,227,251,1) 0%,rgba(244,253,255,1) 100%);
        border:1px solid;
        border-image:linear-gradient(270deg, rgba(107,212,173,1), rgba(255,255,255,1)) 1 1;
      }
    }
  }
  .bar-wait {
    display: flex;
    align-items: center;
    height: 450px;
    .wait-image {
      width: 126px;
      display: flex;
      align-items: center;
    }
    .wait-task {
      flex: 1;
      .task-barwait {
        padding-right: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height:35px;
        margin: 26px 0;
        background:linear-gradient(270deg,rgba(211,227,251,1) 0%,rgba(244,253,255,1) 100%);
        border:1px solid;
        border-image:linear-gradient(270deg, rgba(107,212,173,1), rgba(255,255,255,1)) 1 1;
      }
    }
  }
}
</style>
