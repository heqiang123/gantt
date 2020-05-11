<template>
  <layout-bord>
    <div slot="tree" class="tree-search">
      <div class="search-container">
        <div class="container-title">
          <span />
          <span>对象查询</span>
        </div>
        <dee-form
          :form-data="formData"
          :form="form"
          label-width="46px"
        />
        <div style="text-align: center;">
          <el-button
            class="container-searchBtn"
            type="primary"
            size="small"
            @click="searchData"
          >
            查 询
          </el-button>
        </div>
      </div>
      <div class="search-tree">
        <div v-if="position" class="tree-top">
          <img src="/icons/filter.png" class="top-image">
          <el-input
            ref="searchInput"
            v-model="inputVal"
            size="medium"
            placeholder="输入代号，在结构中快速定位"
            @change="getPosition"
          />
        </div>
        <div v-if="operate" class="tree-top">
          <dee-tools
            id="tools"
            ref="tools"
            :tools="tools"
            mode="normal"
          />
        </div>
        <div class="tree-content" :class="scrollClass">
          <el-tree
            ref="tree"
            :data="structureData"
            :props="defaultProps"
            class="filter-tree"
            default-expand-all
            :render-content="renderStructureContent"
            @node-click="handleClick"
          />
        </div>
        <div v-if="structureLegend" class="tree-legend">
          <ul>
            <li><span /></li>
            <li><span /></li>
            <li><span /></li>
            <li><span /></li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="isArrow" slot="image" class="image">
      <img src="/icons/fold.png" :class="{'is-transform': isCollapse}" alt="收缩侧边栏" @click="handleCollapse">
    </div>

    <div slot="main" class="main">
      <div v-if="isPulate" class="main-manipulate">
        <slot name="manipulate" />
      </div>
      <div class="main-content">
        <div class="content-tree" :class="{'is-hide': !isCollapse}">
          <div class="tree tree-right">
            <div v-if="position" class="tree-top">
              <img src="/icons/filter.png" class="top-image">
              <el-input
                ref="searchInput"
                v-model="inputVal"
                size="medium"
                placeholder="输入代号，在结构中快速定位"
                @change="getPosition"
              />
            </div>
            <!-- <div v-if="operate" class="tree-top">
              <dee-tools
                id="tools"
                ref="tools"
                :tools="tools"
                mode="normal"
              />
            </div> -->
            <div class="tree-content" :class="scrollClass">
              <el-tree
                ref="tree"
                :data="treeData"
                :props="defaultProps"
                class="filter-tree"
                default-expand-all
                :render-content="renderContent"
                @node-click="handleNodeClick"
              />
            </div>
            <div v-if="legend" class="tree-legend">
              <ul>
                <li><span /></li>
                <li><span /></li>
                <li><span /></li>
                <li><span /></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content-main" :class="{'is-width': isCollapse}">
          <slot name="cMain" />
        </div>
      </div>
    </div>
  </layout-bord>

</template>

<script>
import layoutBord from '@/components/layoutBord'
import { viewTree } from '@/api/tree'
export default {
  name: 'StructureTree',
  components: { layoutBord },
  props: {
    structureData: {
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
    structureLegend: {
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
    }
  },
  data() {
    return {
      treeData: [],
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
  mounted() {
    this.handleClick({ data: { label: 'AG600' }})
  },
  methods: {
    searchData() {
      console.log(this.form)
    },

    handleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    handleClick(data, node, event) {
      viewTree(data.label).then(res => {
        this.treeData = res.data
      })
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
    },

    renderContent(h, { node, data, store }) {
      let process = {}
      switch (data.label) {
        case 'AOL-CAS-52-001001':
          process = {
            color: 'rgba(254,41,41,1)'
          }
          break
        case 'AOL-CAS-52-001002':
          process = {
            color: 'rgba(255,162,0,1)'
          }
          break
        case 'AOL-CAS-52-001003':
          process = {
            color: 'rgba(75,174,71,1)'
          }
          break
        case 'AOL-CAS-52-001005':
          process = {
            color: 'rgba(217,217,217,1)'
          }
          break
        default:
          process = {
            color: '#606122'
          }
      }
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
            'font-size': '14px',
            ...process
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
@import '@/styles/variables.scss';
.tree-search {
  height: 100%;
  .search-container {
    padding: 8px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(217,217,217,1);
    /deep/.el-input__inner {
      height: $height36;
      line-height: $height36;
      background:rgba(255,255,255,1);
      border-radius:2px;
      border:1px solid rgba(217,217,217,1);
    }
    /deep/.el-form-item {
      margin-bottom: 26px!important
    }
    /deep/.el-form-item__label {
      line-height: $height36;
      color: $formLabelColor;
      font-weight: 400!important;
    }
    .container-searchBtn {
      font-size: $fontSize16;
      color:rgba(255,255,255,1);
      font-weight: 700;
      margin: 0 0 34px 0;
      width:180px;
      height:37px;
      border-width: 0;
      background:linear-gradient(178deg,rgba(83,123,196,1) 0%,rgba(62,98,200,1) 100%);
      border-radius:2px;
    }
  }
  .search-tree {
    background-color: #ffffff;
    height: calc(100% - 169px);
    .tree-top {
      display: flex;
      height: $height36;
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
  overflow: hidden;
  .main-manipulate {
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 8px;
    line-height: 40px;
    border-bottom: 1px solid rgba(217,217,217,1);
  }
  .main-content {
    height: calc(100% - 40px);
    padding: 8px;
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
.tree-right {
  width: 336px;
  min-width: 336px;
  padding: 8px;
  border:1px solid rgba(217,217,217,1);
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
</style>
