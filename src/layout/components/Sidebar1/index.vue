<template>
  <div class="sidebar-com has-logo">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" class="dee-menu-item" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div class="sidebar-user-info">
      <el-popover
        placement="right-end"
        width="200"
        trigger="hover"
      >
        <span slot="reference">
          <svg-icon class="user-m-icon" icon-class="renyuan" />
          <div class="user-text">admin</div>
        </span>
        <div style="cursor: pointer" @click="outLogin">退出</div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    outLogin() {
      this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss">
 .sidebar-com{
   .el-menu{
     background: inherit
   }
  .el-menu-item{
    height: 60px;
    line-height: 60px;
  }
  .menu-icon{
    font-size: 22px;
  }
  .sidebar-user-info{
    position: absolute;
    display: inline-block;
    z-index:10;
    bottom: 0;
    left: 0;
    right:0;
    height: 70px;
    color: #FFF;
    text-align: center;
    .user-m-icon{
      font-size: 30px !important;
      margin: 0 0 4px 0 !important;
      cursor: pointer;
    }
    .user-text{
      font-size: 14px;
    }
  }
 }
 .el-menu--vertical .el-menu{
    background: #3E7579 !important;
 }
</style>
