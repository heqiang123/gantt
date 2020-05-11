<template>
  <div class="homeLayout">
    <div class="homeLayout-aside">
      <slot name="task" />
    </div>

    <div class="homeLayout-main">
      <div class="main-message">
        <slot name="message" />
      </div>
      <div class="main-task">
        <slot name="taskList" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeLayout',
  data() {
    return {
    }
  }

}
</script>

<style lang="scss">
  .homeLayout {
    display: flex;
    height: 100%;
    &-aside {
      width: 384px;
      min-width: 384px;
      background-color: #ffffff;
      border:1px solid rgba(217,217,217,1);
      box-sizing: border-box;
      height: 100%;
      padding: 8px;
      overflow-y: scroll;
    }

    &-main {
      flex: 1;
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      .main-message {
        height:355px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(230,230,230,1);
      }
      .main-task {
        flex: 1;
        margin-top: 8px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(230,230,230,1);
        overflow-y: scroll;
      }
    }
  }
</style>
