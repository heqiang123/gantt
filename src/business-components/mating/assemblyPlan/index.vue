<template>
  <layout-bord>
    <div slot="tree" class="tree-search">
      <div class="search-container">
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
            查询
          </el-button>
        </div>
      </div>
      <div class="assemblytable">
        <dee-table :columns="modelTable" :data="modelData" style="margin-top:20px" @row-click="handleRowClick" />
        <dee-table :columns="sortTable" :data="sortData" style="margin-top:40px" @row-click="handleRowStandClick" />
      </div>
    </div>

    <!-- <div v-if="isArrow" slot="image" class="image">
      <img src="/icons/fold.png" :class="{'is-transform': isCollapse}" alt="收缩侧边栏" @click="handleCollapse">
    </div> -->

    <div slot="main" class="main">
      <div v-if="isPulate" class="main-manipulate">
        <slot name="manipulate" />
      </div>
      <div class="main-content">
        <!-- <div class="content-tree" :class="{'is-hide': !isCollapse}">
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
        </div> -->
        <div class="content-main" :class="{'is-width': isCollapse}">
          <slot name="cMain" />
        </div>
      </div>
    </div>
  </layout-bord>

</template>

<script>
import layoutBord from '@/components/layoutBord'
import { getTree } from '@/api/tree'
import { getPlan } from '@/api/mating'
import eventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'
export default {
  name: 'AssemblyPlan',
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
      scrollClass: {},
      modelTable: [
        { title: '机型', key: 'type' },
        { title: '架次', key: 'batches' },
        { title: '交付时间', key: 'deliverTime' }
      ],
      modelData: [],
      sortTable: [
        { title: '站位', key: 'standerd', width: '50' },
        { title: '计划开工', key: 'planStartTime' },
        { title: '计划完工', key: 'planEndTime' },
        { title: '当前状态', key: 'state' }
      ],
      sortData: []
    }
  },
  computed: {
    ...mapGetters([
      'productionLength'
    ])
  },
  mounted() {
    this.getPlan()
    this.getTree()
    eventBus.$on('taskDrag', target => {
      console.log(target, 'fuck', this.sortData)
      switch (target.stand) {
        case '31':
          this.sortData[0].planStartTime = this.$moment(target.start_date).format('YYYY-MM-DD')
          this.sortData[0].planEndTime = this.$moment(target.end_date).format('YYYY-MM-DD')
          this.sortData[1].planStartTime = this.$moment(target.end_date).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[1].planEndTime = this.$moment(target.end_date).add(1, 'month').format('YYYY-MM-DD')
          this.sortData[2].planStartTime = this.$moment(this.sortData[1].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[2].planEndTime = this.$moment(this.sortData[1].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          this.sortData[3].planStartTime = this.$moment(this.sortData[2].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[3].planEndTime = this.$moment(this.sortData[2].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          this.sortData[4].planStartTime = this.$moment(this.sortData[3].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[4].planEndTime = this.$moment(this.sortData[3].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          this.sortData[5].planStartTime = this.$moment(this.sortData[4].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[5].planEndTime = this.$moment(this.sortData[4].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          break
        case '41':
          this.sortData[1].planStartTime = this.$moment(target.start_date).format('YYYY-MM-DD')
          this.sortData[1].planEndTime = this.$moment(target.end_date).format('YYYY-MM-DD')
          this.sortData[2].planStartTime = this.$moment(this.sortData[1].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[2].planEndTime = this.$moment(this.sortData[1].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          this.sortData[3].planStartTime = this.$moment(this.sortData[2].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[3].planEndTime = this.$moment(this.sortData[2].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          this.sortData[4].planStartTime = this.$moment(this.sortData[3].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[4].planEndTime = this.$moment(this.sortData[3].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          this.sortData[5].planStartTime = this.$moment(this.sortData[4].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[5].planEndTime = this.$moment(this.sortData[4].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          break
        case '51':
          this.sortData[2].planStartTime = this.$moment(target.start_date).format('YYYY-MM-DD')
          this.sortData[2].planEndTime = this.$moment(target.end_date).format('YYYY-MM-DD')
          this.sortData[3].planStartTime = this.$moment(this.sortData[2].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[3].planEndTime = this.$moment(this.sortData[2].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          this.sortData[4].planStartTime = this.$moment(this.sortData[3].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[4].planEndTime = this.$moment(this.sortData[3].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          this.sortData[5].planStartTime = this.$moment(this.sortData[4].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[5].planEndTime = this.$moment(this.sortData[4].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          break
        case '52':
          this.sortData[3].planStartTime = this.$moment(target.start_date).format('YYYY-MM-DD')
          this.sortData[3].planEndTime = this.$moment(target.end_date).format('YYYY-MM-DD')
          this.sortData[4].planStartTime = this.$moment(this.sortData[3].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[4].planEndTime = this.$moment(this.sortData[3].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          this.sortData[5].planStartTime = this.$moment(this.sortData[4].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[5].planEndTime = this.$moment(this.sortData[4].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          break
        case '53':
          this.sortData[4].planStartTime = this.$moment(target.start_date).format('YYYY-MM-DD')
          this.sortData[4].planEndTime = this.$moment(target.end_date).format('YYYY-MM-DD')
          this.sortData[5].planStartTime = this.$moment(this.sortData[4].planEndTime).add(3, 'day').format('YYYY-MM-DD')
          this.sortData[5].planEndTime = this.$moment(this.sortData[4].planEndTime).add(1, 'month').format('YYYY-MM-DD')
          break
        case '54':
          this.sortData[5].planStartTime = this.$moment(target.start_date).format('YYYY-MM-DD')
          this.sortData[5].planEndTime = this.$moment(target.end_date).format('YYYY-MM-DD')
          break
        default:
          break
      }
      this.sortData.push()
    })
  },

  methods: {
    getPlan() {
      getPlan().then(res => {
        this.modelData = res.data.items.model
        if (this.productionLength > 0) {
          this.modelData.push({
            type: 'AG600',
            batches: '0211',
            deliverTime: '2021-06-31'
          })
        }

        this.modelData.forEach((item, index) => {
          switch (index) {
            case 0:
              item.type = 'AG600'
              break
            case 1:
              item.type = 'AG800'
              break
            default:
              break
          }
        })
        this.sortData = res.data.items.planPreData1
      })
    },

    searchData() {
      console.log(this.form)
    },

    handleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    getTree() {
      const data = { label: 'AG' }
      getTree(data.label).then(res => {
        this.treeData = res.data
      })
    },

    handleNodeClick(data, node, event) {
      this.$emit('node-click', data, node, event)
    },

    handleRowClick(row, event, column) {
      console.log('row', row)
      getPlan().then(res => {
        console.log('222', res.data.items)
        if (row.batches === 2001) {
          this.sortData = res.data.items.planPreData1
        } else if (row.batches === 2002) {
          this.sortData = res.data.items.planPreData2
        } else {
          this.sortData = res.data.items.planPreData3
        }
      })
      this.$emit('standallClick', row)
    },

    handleRowStandClick(row, event, column) {
      this.$emit('standClick', row)
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
    justify-content: flex-start;
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
