<template>
  <el-main style="padding: 0">
    <el-tabs id="tab" v-model="activeName" type="card" @tab-remove="removeTab" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in permission"
        :key="item.name"
        :label="item.title"
        :closable="item.closable"
        :name="item.name"
      >
        <span slot="label">
          {{ item.title }}
        </span>
      </el-tab-pane>
    </el-tabs>
    <!--<keep-alive>-->
    <router-view style="margin:15px 12px;overflow-y: auto" :style="{height:height}" @addTab="addTab" />
    <!--</keep-alive>-->
  </el-main>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      height: 0,
      activeName: '',
      permission: []
    }
  },
  watch: {
    '$store.state.main.screenHeight': function(val) {
      this.height = val - 65 + 'px'
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.height = window.innerHeight - 65 + 'px'
      const that = this
      window.onresize = function() { // 定义窗口大小变更通知事件
        that.$store.commit('setWidth', { screenWidth: window.innerWidth })
        that.$store.commit('setHeight', { screenHeight: window.innerHeight })
      }
    })
  },
  methods: {
    tabClick(tab, event) {
      this.activeName = tab.name
      this.$router.push({ path: this.activeName })
    },
    addTab(title, name, flag, params) {
      if (this.permission.findIndex(x => x.name === name) === -1) {
        this.permission.push({
          title: title,
          name: name,
          closable: flag
        })
        this.activeName = name
        this.$router.push({ path: name, query: params })
      } else {
        this.activeName = name
        this.$router.push({ path: name, query: params })
      }
    },
    removeTab(targetName) {
      this.permission.splice(this.permission.findIndex(v => v.name === targetName), 1)
      this.activeName = this.permission[this.permission.length - 1].name
      this.$router.push({ path: this.activeName })
    }
  }
}
</script>

<style scoped lang="scss">
  #tab {
    /deep/ .el-tabs__nav {
      border: 0;
    }
    /deep/ .el-tabs__item {
      font-size: 16px;
      color: #555;
      border: 0;
    }

    /deep/ .el-tabs__item:hover {
      background-color: #e5e5e5;
      border-radius: 10px;
    }

    /deep/ .el-tabs__item.is-active {
      font-size: 16px;
      color: #2A68C9;
      background-color: transparent;
      font-weight: bold;
    }

    /deep/ .el-tabs__item.is-active span:first-child {
      padding-bottom: 5px;
      border-bottom: 4px solid #2A68C9;
      border-radius: 2px;
    }

    /deep/ .el-tabs__nav-scroll {
      height: 56px;
      display: flex;
      align-items: center;
      padding: 0 20px;
    }

    /deep/ .el-tabs__header {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
      margin: 0;
    }
  }
</style>
