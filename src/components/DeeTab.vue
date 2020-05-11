<template>
  <div class="dee-panel">
    <img
      :style="{display:showSwipe?'block':'none'}"
      :src="tableImg"
      style="cursor: pointer;position:absolute;top:8px;right:10px;z-index:1999;background-color: #f2f2f2"
      @click="swipe"
    >
    <el-tabs v-model="activeName" v-bind="tabProps" v-on="handler" @tab-click="tabClick">
      <el-tab-pane
        v-for="(item,index) in tabs"
        :key="index"
        :label="item.name"
        :disabled="disabled"
        :name="(index+1)+''"
        :lazy="true"
      >
        <el-scrollbar class="scroll_dee_tab">
          <slot v-if="item.id" :name="item.id" />
          <div v-else>
            <div
              v-for="(tabItem,tabIndex) in item.data"
              :key="tabIndex"
            >
              <div
                v-if="tabItem.group&&tabItem.group!==''&&tabIndex===0"
                class="sub-title"
              >
                {{ tabItem.group }}
              </div>
              <div
                v-if="tabIndex!==0&&tabItem.group&&tabItem.group!==''&&tabItem.group!==item.data[tabIndex-1].group"
                class="sub-title"
              >
                {{ tabItem.group }}
              </div>
              <div
                v-if="tabItem.group&&tabItem.group!==''"
                class="third-title"
              >
                {{ tabItem.name }}
              </div>
              <div v-else class="sub-title">
                {{ tabItem.name }}
              </div>
              <component
                :is="componentName(tabItem.path)"
                :basic-data="basicData(tabItem.basicData)"
                v-bind="prop(tabItem.prop)"
                :permissions="permissions"
              />
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  components: {},
  props: {
    tabProps: {
      type: Object,
      default: function() {
        return {}
      }
    },
    handler: {
      type: Object,
      default: function() {
        return {}
      }
    },
    permissions: {
      type: Array,
      default: function() {
        return []
      }
    },
    tabs: {
      type: Array,
      default: function() {
        return []
      }
    },
    disable: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    showSwipe: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    isDetail: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    fixed: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data() {
    return {
      tableImg: '/components/filetable1.png',
      disabled: true,
      activeName: '',
      lastTabIndex: ''
    }
  },
  computed: {
    componentName() {
      return function(path) {
        return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.vue'))
      }
    },
    basicData() {
      return function(data) {
        if (data !== undefined) {
          return data
        } else {
          return {}
        }
      }
    },
    prop() {
      return function(prop) {
        if (prop !== undefined) {
          if (typeof prop === 'object') {
            return prop
          } else if (typeof prop === 'string') {
            const data = JSON.parse(prop)
            if (Object.keys(data).length > 0) {
              return data
            } else {
              return {}
            }
          }
        }
      }
    }
  },
  watch: {
    tabs: {
      immediate: true,
      handler: function(val) {
        let active = '1'
        if (val.length > 0) {
          val.forEach((x, i) => {
            if (x.data) {
              x.data.map(y => {
                // this.registerComponent(y.path).then(x => {
                //   const Obj = Vue.extend(x.default)
                //   Vue.component(this.componentName(y.path), Obj)
                //   this.$set(y, 'show', true)
                // })
                Vue.component(this.componentName(y.path), function(resolve) {
                  require([`@/business-components/tabCom/${y.path}`], resolve)
                })
                this.$set(y, 'show', true)
              }).sort((a, b) => {
                return a.group - b.group
              })
            }
            if (x.name === '可视化' || x.name === '浏览') {
              active = i
            }
          })
          if (this.isDetail) {
            this.activeName = active
          } else if (this.fixed) {
            this.activeName = '1'
          } else {
            if (this.activeName !== '') {
              if ((parseInt(this.lastTabIndex) + 1) <= val.length) {
                this.activeName = (parseInt(this.lastTabIndex) + 1) + ''
              } else {
                this.activeName = '1'
              }
            } else {
              this.activeName = '1'
            }
          }
        }
      }
    },
    disable: {
      immediate: true,
      handler: function(val) {
        if (val === false) {
          this.swipe()
        }
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {
    tabClick(tab) {
      this.$emit('tabClick', tab)
      this.lastTabIndex = tab.index
    },
    // registerComponent(path) {
    //   return import(`@/${path}`)
    // },
    swipe() {
      this.tableImg = this.disabled ? '/components/filetable1.png' : '/components/filetable2.png'
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.activeName = ''
      } else {
        this.activeName = '1'
      }
      this.$emit('swipe', this.disabled)
    },
    showTab(id) {
      this.tableImg = '/components/filetable1.png'
      this.activeName = id
    }
  },
  filter: {}
}
</script>

<style lang="scss">
  .dee-panel {
    position: relative;

    .scroll_dee_tab {
      height: 100%;

      .el-scrollbar__wrap {
        margin-bottom: 0 !important;
        overflow-x: hidden;
      }
    }

    .el-tabs {
      height: 100%;

      .el-tabs__content {
        height: calc(100% - 30px);

        .el-tab-pane {
          height: 100%;
        }
      }
    }

    .el-tab-pane {
      background: #fff;
    }

    .el-tabs__nav-scroll {
      /*background-color: #F7F7F7;*/
      padding: 0;
      border-left: 1px solid #D9D9D9;
    }

    .el-tabs__item {
      padding: 8px 16px !important;
      background-color: #F2F2F2;
      box-shadow: 0 0 !important;
      border: 1px solid #D9D9D9;
      font-weight: 500;
      border-left: 0;
      line-height: 1;
      height: 32px;
      white-space: nowrap;
      vertical-align: middle;
      margin: 0;
    }
    .el-tabs__item.is-active {
      border-bottom: 0;
      background-color: #fff;
    }

    .el-tabs__header {
      margin: 0;
    }

    .el-tabs__active-bar {
      display: none;
    }
  }
</style>
