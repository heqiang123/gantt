/**
* @Description: 侧边栏
* @author lyk
* @date 2019/6/4
*/
<template>
  <div class="sidebar-container">
    <el-aside class="aside">
      <el-menu class="menu" :unique-opened="true" :collapse="true">
        <div>
          <el-menu-item
            title=""
            class="top-icon-wrapper"
          >
            <img alt="" class="top-icon" src="/image/logo.png">
          </el-menu-item>
          <div class="splitter" />
        </div>
        <!-- <transition-group> -->
        <div
          v-for="(item,topMenuIndex) in routes"
          :key="topMenuIndex"
        >
          <el-menu-item
            v-if="!item.hidden"
            :index="topMenuIndex+''"
            :title="item.meta.title"
            @click.native="toPage(item)"
            @mouseenter.native="showSubmenu(item)"
          >
            <svg-icon v-if="item.meta && item.meta.icon" class="user-m-icon" :icon-class="item.meta.icon" />
          </el-menu-item>
        </div>
        <!-- </transition-group> -->
        <div class="bottom-menu">
          <div v-for="(item,bottomMenuIndex) in menuBottomData" :key="bottomMenuIndex">
            <el-menu-item
              :index="menuTopData.length+bottomMenuIndex+''"
              :title="item.meta.title"
              v-on="item.meta.handler"
              @mouseenter.native="showSubmenu(item, true)"
            >
              <svg-icon v-if="item.meta && item.meta.icon" class="user-m-icon" :icon-class="item.meta.icon" />
            </el-menu-item>
          </div>
        </div>
      </el-menu>
      <div v-if="submenuData.children" id="submenu" :class="submenu" @mouseleave="hideSubmenu">
        <div class="submenu-title">
          <div class="submenu-title-name textOverflow" :title="submenuData.meta.title">
            <!-- <img
              alt=""
              style="width: 24px;height: 24px;"
              :src="submenuData.meta.icon"
              class="submenu-title-name-icon"
            > -->
            {{ submenuData.meta.title }}
          </div>
        </div>
        <div v-if="submenuData.children.length>0">
          <div v-for="(y ,i) in submenuData.children" :key="i">
            <div v-if="!y.hidden" style="display: flex;flex-direction: row" @click="toPage(y, submenuData.path + '/')">
              <div class="submenu-item-no-icon">
                <div class="submenu-item-name">
                  <div class="submenu-item-name-shape" />
                  {{ y.meta.title }}
                </div>
              </div>
            </div>
            <div v-if="!y.hidden && y.children && y.children.length> 1">
              <div v-for="(gitem, index) in y.children" :key="index" style="display: flex;flex-direction: row" @click="toPage(gitem, submenuData.path + '/' + y.path + '/')">
                <div class="submenu-item-no-icon">
                  <div class="submenu-item-name">
                  &nbsp; &nbsp; &nbsp;
                    <div class="submenu-item-name-shape" />
                    {{ gitem.meta.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-aside>
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
// import { isEnableConfigurationTeam } from '../../../api/permission/index'

export default {
  components: { },
  props: {},
  data() {
    return {
      menuIndex: '',
      menuTopData: [],
      menuBottomData: [
        {
          meta: { title: 'admin', icon: 'user', self: true },
          children: [
            {
              meta: {
                title: '注销',
                clickFun: () => {
                  this.submenu = 'submenu-default'
                  this.$store.dispatch('user/logout')
                  this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                }
              }
            }
          ]
        }
      ],
      menuChildData: [],
      submenuData: {},
      submenuTitleData: {},
      submenu: 'submenu-default',
      // submenu: 'submenu-show',
      isAdmin: false,
      isEnableConfigurationTeamState: false
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    routes() {
      return this.$router.options.routes
    }
  },
  watch: {
    // menuIndex: function(val) {
    //   if (val !== '') {
    //     this.submenuData = []
    //     this.menuChildData.forEach(x => {
    //       if (x.parent === val) {
    //         this.submenuData.push(x)
    //       }
    //     })
    //   }
    // }
  },
  mounted: async function() {
    await this.initData()
  },
  methods: {
    toPage(item, basePath) {
      if (item.meta.clickFun) {
        item.meta.clickFun()
      } else if (basePath || item.children && item.children.length === 1) {
        this.submenu = 'submenu-default'
        this.$router.push({ path: (basePath || '') + item.path })
      } else {
        this.submenu = 'submenu-show'
        this.submenuData = item
      }
    },
    showSubmenu(item, spceil) {
      if (item.children && item.children.length > 1 || spceil) {
        this.submenu = 'submenu-show'
        this.submenuData = item
      } else {
        this.submenu = 'submenu-default'
      }
    },
    // async isAdministrator() {
    //   await isAdministrator().then(res => {
    //     this.isAdmin = res.items
    //   }).catch(e => {
    //     this.initData()
    //   })
    // },
    // async isEnableConfigurationTeam() {
    //   await isEnableConfigurationTeam().then(res => {
    //     this.isEnableConfigurationTeamState = res.items
    //   })
    // },
    initData() {
      // this.routes.map(x => {
      //   if (!x.hasOwnProperty('parent')) {
      //     this.submenuTitleData[x.name] = x
      //     if (x.meta && !x.meta.isBottom && !x.hidden) {
      //       this.menuTopData.push(x)
      //     } else {
      //       this.menuBottomData.push(x)
      //     }
      //   }
      // })
      // if (!this.isAdmin) {
      //   this.menuChildData = this.menuChildData.filter(item => item.path !== '/typePropManage')
      // }
      // if (!this.isEnableConfigurationTeamState) {
      //   this.menuChildData = this.menuChildData.filter(item => item.path !== '/configurationTeam')
      // }
    },
    hasChild(name) {
      const flag = false
      if (name.children && name.children.length > 1) {
        return true
      }
      // this.menuChildData.forEach(x => {
      //   if (x.parent === name) {
      //     flag = true
      //   }
      // })
      return flag
    },
    hideSubmenu() {
      const that = this
      that.submenu = 'submenu-default'
    },
    handleDragStart(e, item) {
      this.dragging = item
    },
    handleDragEnd(e, item) {
      this.dragging = null
    },
    // 首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = 'move'// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = 'move'// 为需要移动的元素设置dragstart事件
      if (item === this.dragging) {
        return
      }
      const newItems = [...this.menuTopData]
      const src = newItems.indexOf(this.dragging)
      const dst = newItems.indexOf(item)
      newItems.splice(dst, 0, ...newItems.splice(src, 1))
      this.menuTopData = newItems
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../../styles/variables';
  @import '../../../styles/element-variables';
  @import '../../../styles/mixin';

  a {
    text-decoration: transparent;
  }
  .textOverflow {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .top-icon:hover {
    background-color: transparent !important;
    cursor: default;
  }

  .top-icon-wrapper {
    padding: 0 !important;
    display: flex;
    justify-content: center;
  }

  .top-icon {
    width: 56px;
    height: 56px;
  }

  .submenu-default {
    visibility: hidden;
    position: absolute;
    width: 0;
    top: 0;
    left: $asideBarWidth;
    opacity: 0.95;
    transition: width .3s;
    z-index: 100;
    height: 100%;
  }

  .submenu-show {
    // @include sidebar();
    background:  linear-gradient( #324A8D 20%, #4BAE47 100%);
    position: fixed;
    width: 200px;
    top: 0;
    left: $asideBarWidth;
    opacity: 0.95;
    z-index: 999999999999999999999;
    height: 100%;
    transition: width .3s;
    overflow: auto;
  }

  .menu {
    padding: 0;
    overflow-x: hidden;
    height: 100%;
    // @include sidebar();
    background:  linear-gradient( #324A8D 20%, #4BAE47 100%);
  }

  .bottom-menu {
    position: absolute;
    bottom: 5px;
    width: 100%
  }

  .submenu-title-name-icon {
    padding-right: 15px;
    vertical-align: middle
  }

  .aside {
    width: $asideBarWidth !important;
    overflow-x: hidden;
    height: 100%;
    /deep/ .el-menu--collapse {
      width: $asideBarWidth
    }

    /deep/ .el-menu-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 !important;
    }

    /deep/ .el-menu-item:hover {
      background-color: transparent !important;

      .icon {
        background-color: rgba(0, 0, 0, .12)
      }
    }

    /deep/ .el-menu-item:focus {
      background-color: transparent !important;

      .icon {
        background-color: rgba(0, 0, 0, .12)
      }
    }

    .icon {
      width: 30px;
      height: 30px;
      padding: 8px;
      border-radius: 2px;
    }
    .user-m-icon{
      color: #FFF;
      font-size: 24px !important;
      margin: 0 !important;
    }
  }

  .submenu-item {
    margin: 0 15px;
    height: $tabBarHeight;
    text-align: center;
    border-bottom: 1px solid rgba(231, 231, 231, .5);
  }

  .submenu-item-no-icon {
    height: $tabBarHeight;
    text-align: center;
    border-bottom: 1px solid rgba(231, 231, 231, .5);
    flex: 1;
    margin: 0 15px 0 7px
  }

  .submenu-title-name {
    height: 100%;
    font-size: 18px;
    font-weight: bold;
    color: rgba(254, 254, 255, 1);
    padding: 17px 0;
  }

  .submenu-item-name {
    font-size: 16px;
    font-weight: 400;
    color: rgba(254, 254, 255, 1);
    cursor: pointer;
    height: $tabBarHeight;
    display: flex;
    flex: 1;
    align-items: center;
  }

  .submenu-item-name-icon {
    padding-left: 5px;
    padding-right: 15px;
    vertical-align: middle
  }

  .submenu-item-name-shape {
    margin-left: 5px;
    margin-right: 15px;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    border: 1px solid #fff
  }

  .submenu-item-name:hover {
    background-color: rgba(231, 231, 231, .5) !important;
  }

  .submenu-item-name:hover .submenu-item-name-shape {
    background-color: #fff !important;
  }

  .submenu-title {
    height: $tabBarHeight;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(231, 231, 231, .5);
  }

  .splitter {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0.5;
    margin: 12px 12px;
  }

  .notify {
    position: relative;
  }

  .notify:after {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: #FF2626;
    top: 15px;
    right: 18px;
    content: '';
  }
</style>
