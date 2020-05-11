<template>
  <layout-bord>
    <div slot="tree" class="tree-search" />
    <div slot="main" class="main">
      <div v-if="isPulate" class="main-manipulate">
        <slot name="manipulate" />
      </div>
      <div class="main-content">
        <div class="content-main" :class="{'is-width': isCollapse}">
          <slot name="cMain" />
        </div>
      </div>
    </div>
  </layout-bord>

</template>

<script>
import layoutBord from '@/components/layoutBord'
export default {
  name: 'WorkOrder',
  components: { layoutBord },
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    position: {
      type: Boolean,
      default: false
    },
    operate: {
      type: Boolean,
      default: false
    },
    legend: {
      type: Boolean,
      default: false
    },
    isPulate: {
      type: Boolean,
      default: false
    },
    isArrow: {
      type: Boolean,
      default: false
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapse: true,
      formData: [
        {
          split: 1,
          data: [
            {
              title: '型号',
              key: 'number',
              component: {
                name: 'el-input'
              }
            }
          ]
        },
        {
          split: 1,
          data: [
            {
              title: '架次',
              key: 'sorties',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      form: {
        number: '',
        sorties: ''
      },
      inputVal: '',
      tools: [
        {
          type: 'icon',
          name: '新建',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
            }
          }
        },
        {
          type: 'icon',
          name: '保存',
          icon: '/icons/check.png',
          handler: {
            click: () => {
            }
          }
        },
        {
          type: 'icon',
          name: '删除',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
            }
          }
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      scrollClass: {}
    }
  },
  watch: {
    dialogVisible(val) {
      console.log('变化', val)
      this.dialogVisible = val
    }
  },
  mounted() {
    console.log('dialogVisible', this.dialogVisible)
  },
  methods: {
    searchData() {
      console.log(this.form)
    },

    handleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    handleNodeClick(data, node, event) {
      this.$emit('node-click', data, node, event)
    },

    renderStructureContent(h, { node, data, store }) {
      return h('div', {
        style: {
          display: 'flex',
          'align-items': 'center'
        }
      }, [
        h('img', {
          attrs: {
            src: '/icons/airplane.png'
          }
        }),
        h('span', {
          style: {
            'margin-left': '8px',
            'font-size': '14px'
          }
        }, [
          data.label
        ])
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-search {
  height: 100%;
  .search-container {
    padding: 8px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(217,217,217,1);
    .el-input__inner {
      height:36px;
      background:rgba(255,255,255,1);
      border-radius:2px;
      border:1px solid rgba(217,217,217,1);
    }
    .el-form-item {
      margin-bottom: 16px!important
    }
    .container-searchBtn {
      width:120px;
      height:36px;
      background:rgba(42,117,206,1);
      border-radius:2px;
    }
  }
  .search-tree {
    background-color: #ffffff;
    height: calc(100% - 169px);
    .tree-top {
      display: flex;
      height: 36px;
      margin-bottom: 8px;
      align-items: center;
      .top-image {
        width: 12px;
        margin-right: 8px
      }
    }
    .scroll-position {
      height: calc(100% - 36px);
    }
    .scroll-operate {
      height: calc(100% - 36px);
    }
    .tree-content {
      overflow-y: scroll;
    }
    .tree-legend {
      width: 100%;
      display: flex;
      justify-content: space-between;
      ul {
        display: flex;
        width: 100%;
        li {
          display: flex;
          width:22%;
          span {
            width: 12px;
            height:12px;
            display:inline-block;
            border-radius:2px;
            position: relative;
            font-size:12px;
          }
          &:first-child {
            justify-content: center;
            span {
              background:rgba(254,41,41,1);
              &::after {
                content: '已完成';
                position: absolute;
                color:rgba(254,41,41,1);
                width: 40px;
                left: 16px;
              }
            }
          }
          &:nth-child(2) {
            justify-content: center;
            span {
              background:rgba(255,162,0,1);
              &::after {
                content: '已完成';
                position: absolute;
                color:rgba(255,162,0,1);
                width: 40px;
                left: 16px;
              }
            }
          }
          &:nth-child(3) {
            justify-content: center;
            span {
              background:rgba(75,174,71,1);
              &::after {
                content: '已完成';
                position: absolute;
                color:rgba(75,174,71,1);
                width: 40px;
                left: 16px;
              }
            }
          }
          &:last-child {
            justify-content: center;
            span {
              background:rgba(217,217,217,1);
              &::after {
                content: '已完成';
                position: absolute;
                color:rgba(217,217,217,1);
                width: 40px;
                left: 16px;
              }
            }
          }
        }
      }
    }
    .scroll-legend {
      height: calc(100% - 12px)
    }
  }
}
.image {
  img {
    width: 8px;
    height: 8px;
    cursor: pointer;
    transform:rotate(180deg);
  }
}
.main {
  height: 100%;
  .main-manipulate {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    line-height: 40px;
    border-bottom: 1px solid rgba(217,217,217,1);
    font-size: 12px;
  }
  .main-content {
    height: calc(100% - 40px);
    padding: 8px;
    padding-left: 0;
    display: flex;
    .content-main {
      flex: 1;
      margin-left: 8px
    }
  }
}
.is-transform {
  transform:rotate(0)!important;
}
.is-hide {
  display: none
}
.is-width {
  width: calc(100% - 344px)
}
</style>
