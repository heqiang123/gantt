<template>
  <div
    v-loading="loading"
    style="height: 100%"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <layout-bord>
      <div slot="tree" class="tree-search">
        <div v-if="isShowSearch" class="search-container">
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
              查询
            </el-button>
          </div>
        </div>
        <div v-if="treeType" class="search-type">
          <div class="type-image">
            <div v-for="(item, index) in imageData" :key="index" class="image-airpane" :class="[imageData.length > 1 ? '' : 'image-airpanly']" @click="handleChange(item.type, index)">
              <img :src="item.image" alt="picture" style="width:102px;height:28px">
              <span>{{ item.type }}</span>
              <div class="airpane-change">
                <template v-if="active === index">
                  <el-row>
                    <el-col :span="11"><span style="background:rgba(75,129,214,1)" /></el-col>
                    <el-col :span="2"><img src="/icons/arrowcircle.png" alt="图标" style="height:8px;width:8px"></el-col>
                    <el-col :span="11"><span style="background:rgba(88,166,100,1)" /></el-col>
                  </el-row>
                </template>
                <template v-else>
                  <div class="change-line"><span /></div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="search-tree" :class="classType">
          <div v-if="operate" class="tree-top">
            <dee-tools
              id="toolsTree"
              ref="toolsTree"
              :tools="toolsTree"
              mode="normal"
            />
          </div>
          <div class="tree-content" :class="scrollClass">
            <el-tree
              ref="tree"
              :data="treeData"
              :props="defaultProps"
              :expand-on-click-node="false"
              :show-checkbox="operate ? true : false"
              class="filter-tree"
              default-expand-all
              node-key="label"
              :render-content="renderStructureContent"
              @check-change="handleCheckChange"
              @node-click="handleNodeClick"
            />
          </div>
          <div v-if="legend" class="tree-legend">
            <ul>
              <li v-for="(item, index) in liData" :key="index"><span class="legend-front" :style="item.style" /><span>{{ item.label }}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="isArrow" slot="image" class="image">
        <img src="/icons/fold.png" :class="{'is-transform': isCollapse}" alt="收缩侧边栏" @click="handleCollapse">
      </div>

      <div slot="main" class="main">
        <div v-if="isPulate" class="main-manipulate">

          <div v-if="operate">
            <dee-tools
              id="tools"
              ref="tools"
              :tools="tools"
              mode="normal"
            />
          </div>
          <slot v-else name="manipulate" />
        </div>
        <div class="main-content">
          <div class="content-tree" :class="{'is-hide': !isCollapse}">
            <slot name="cTree" />
          </div>
          <div class="content-main" :class="{'is-width': isCollapse}">
            <slot name="cMain" />
          </div>
        </div>
      </div>
    </layout-bord>
    <dee-dialog :title="title" width="60%" :dialog-visible="dialogVisible" @handleClose="handleClose">
      <create :dialog-data="dialogData" :title="title" @save="handleSave" @cancle="handleCancle" />
    </dee-dialog>
  </div>
</template>

<script>
import layoutBord from '@/components/layoutBord'
import create from './components/create'
export default {
  name: 'StructureTree',
  components: { layoutBord, create },
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    isShowSearch: {
      type: Boolean,
      default: true
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
    imageData: {
      type: Array,
      default: () => {
        return [
          { type: 'AG600', image: '/icons/airpane.png' },
          { type: 'AG700', image: '/icons/airpane.png' },
          { type: 'AG800', image: '/icons/airpane.png' }
        ]
      }
    },
    treeType: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      title: '',
      loading: false,
      loadingText: '',
      checkData: {},
      dialogData: [],
      isCollapse: true,
      dialogVisible: false,
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
          name: '生成',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
              if (!this.checkData.label) {
                this.$message.error('请至少选择一项')
              } else {
                this.$confirm('确认生成吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.loading = true
                  this.loadingText = '正在生成中，请稍后'
                  const time = setTimeout(() => {
                    this.$message({
                      type: 'success',
                      message: '生成成功!'
                    })
                    this.loading = false
                    this.$emit('node-click', { label: 'AG600' })
                    clearTimeout(time)
                  }, 3000)
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消生成'
                  })
                })
              }
            }
          }
        },
        {
          type: 'icon',
          name: '生效',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              this.$confirm('确认生效吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '生效成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消生效'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '计划更新',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
              if (!this.checkData.label) {
                this.$message.error('请至少选择一项')
              } else {
                this.$confirm('确认更新吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.loading = true
                  this.loadingText = '正在更新中，请稍后'
                  const time = setTimeout(() => {
                    this.$message({
                      type: 'success',
                      message: '更新成功!'
                    })
                    this.loading = false
                    this.$emit('node-click', { label: 'AG600' })
                    clearTimeout(time)
                  }, 3000)
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消更新'
                  })
                })
              }
            }
          }
        },
        {
          type: 'icon',
          name: '单机明细',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
              if (!this.checkData.label) {
                this.$message.error('请至少选择一项')
              } else {
                this.$router.push({
                  name: 'management',
                  query: { flag: true }
                })
              }
            }
          }
        }
      ],
      toolsTree: [
        {
          type: 'icon',
          name: '新建',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
              this.title = '新建'
              this.dialogVisible = true
            }
          }
        },
        {
          type: 'icon',
          name: '编辑',
          icon: '/icons/c-newpart.png',
          handler: {
            click: () => {
              if (!this.checkData.label) {
                this.$message.error('请至少选择一项')
              } else {
                this.title = '编辑'
                this.dialogData = this.treeData
                this.dialogVisible = true
              }
            }
          }
        },
        {
          type: 'icon',
          name: '保存',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              this.$confirm('确认保存吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                })
              })
            }
          }
        },
        {
          type: 'icon',
          name: '删除',
          icon: '/icons/c-removeel.png',
          handler: {
            click: () => {
              if (!this.checkData.label) {
                this.$message.error('请至少选择一项')
              } else {
                this.$confirm('确认删除吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  })
                })
              }
            }
          }
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      active: 0,
      liData: [
        { label: '已生成',
          style: {
            background: '#37d4e2 '
          }
        },
        { label: '已下达',
          style: {
            background: '#ded43c'
          }
        },
        { label: '执行中',
          style: {
            background: '#5e7ce9'
          }
        },
        { label: '已完成',
          style: {
            background: 'rgba(198, 198, 198, 1)'
          }
        }
      ]
    }
  },
  computed: {
    scrollClass() {
      if (this.operate) {
        return 'scroll-operate'
      } else if (this.legend) {
        return 'scroll-legend'
      } else {
        return ''
      }
    },
    classType() {
      if (!this.isShowSearch) {
        return 'search-show'
      } else if (!this.treeType) {
        return 'search-air'
      } else {
        return ''
      }
    }
  },
  mounted() {

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
      const vm = this
      let isShowMove = []
      if (this.operate && data.label.indexOf('方案') > -1) {
        isShowMove = []
      } else if (this.operate && data.label.indexOf('方案') === -1) {
        isShowMove = [h('img', {
          attrs: {
            class: 'img-down',
            src: '/icons/down.png'
          },
          on: {
            click: () => {
              vm.downLabel(data.label)
            }
          },
          style: {
            width: '16px',
            'margin-left': '50px'
          }
        }),
        h('img', {
          attrs: {
            class: 'img-up',
            src: '/icons/up.png'
          },
          on: {
            click: () => {
              vm.upLabel(data.label)
            }
          },
          style: {
            width: '20px',
            'margin-left': '4px'
          }
        })]
      }
      return h('div', {
        attrs: {
          class: 'air-image'
        },
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
        ]),
        ...isShowMove
      ])
    },

    handleCheckChange(data, checked, indeterminate) {
      this.checkData = data
      // this.dialogData.push({
      //   checkData: this.checkData
      // })
      const labelArr = ['方案一', '方案二', 'AG600-001', 'AG700-001', 'AG800-001']
      if (labelArr.includes(data.label) && checked === false) {
        this.checkData = {}
        // this.dialogData = this.dialogData.filter(res => {
        //   return res.checkData.label !== data.label
        // })
      }
      console.log('compare', this.dialogData)
    },

    handleChange(type, index) {
      // this.getTree(type)
      this.active = index
    },

    handleSave(form, table) {
      this.dialogVisible = false
      this.$refs.tree.setCheckedKeys([])
      this.checkData = {}
    },

    handleCancle() {
      this.$refs.tree.setCheckedKeys([])
      this.checkData = {}
      this.dialogVisible = false
    },

    handleClose() {
      this.dialogVisible = false
      this.$refs.tree.setCheckedKeys([])
      this.checkData = {}
    },

    downLabel(label) {
      let tmp = ''
      let flag = true
      this.treeData[0].children.forEach((res, index) => {
        if (res.label === label && flag) {
          tmp = this.treeData[0].children[index + 1].label
          this.treeData[0].children[index + 1].label = res.label
          res.label = tmp
          flag = false
        }
      })
    },

    upLabel(label) {
      let tmp = ''
      let flag = true
      this.treeData[0].children.forEach((res, index) => {
        if (res.label === label && flag && index > 0) {
          tmp = this.treeData[0].children[index - 1].label
          this.treeData[0].children[index - 1].label = res.label
          res.label = tmp
          flag = false
        }
      })
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
      margin: 0 0 26px 0;
      width:180px;
      height:37px;
      background:linear-gradient(178deg,rgba(83,123,196,1) 0%,rgba(62,98,200,1) 100%);
      border-radius:2px;
    }
  }
  .search-type {
    height: 90px;
    display: flex;
    align-items: center;
    .type-image {
      display: flex;
      .image-airpane {
        text-align: center;
        width: 33%;
        cursor: pointer;
        // height: 90px;
        span {
          display: inline-block;
          text-align: center;
          color:rgba(40,41,43,1);
          font-size: 14px;
          width:77px;
          height:17px;
          background:rgba(243,243,243,1);
        }
        .airpane-change {
          span {
            display: inline-block;
            width:100%;
            height:4px;
          }
          .change-line {
            height:18px;
            display: flex;
            align-items: center;
            span {
              display: inline-block;
              height: 1px;
              background:rgba(218,218,218,1);
              opacity:0.49;
              border:0px solid rgba(151,151,151,1);
            }

          }
          /deep/[class*="el-col-"] {
            height: 18px;
            display: flex;
            align-items: center;
          }
        }
      }
      .image-airpanly {
        width: 56%;
      }
    }
    /deep/.el-progress__text {
      display: none
    }
    /deep/.el-progress-bar {
      padding-right: 0
    }
  }
  .search-tree {
    background-color: #ffffff;
    height: calc(100% - 336px);
    position: relative;
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
    .tree-content {
      height: 100%;
      overflow-y: scroll;
    }
    .scroll-operate {
      height: calc(100% - 80px);
    }
    .scroll-legend {
      height: calc(100% - 44px);
    }
    .tree-legend {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      ul {
        display: flex;
        width: 100%;
        li {
          display: flex;
          height: 44px;
          align-items: center;
          justify-content: center;
          width:25%;
          .legend-front {
            width: 16px;
            height: 9px;
            display:inline-block;
            border-radius:2px;
            position: relative;
            font-size:12px;
          }
          span {
            font-size: 12px;
            margin-left: 4px
          }
        }
      }
    }
  }
  .search-show {
    height: calc(100% - 100px);
  }
  .search-air {
    height: calc(100% - 266px);
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
/deep/.air-image {
  .img-up,.img-down {
    display: none
  }
}
/deep/.el-tree-node__content:hover {
  .img-up,.img-down {
    display: block
  }
}
</style>
