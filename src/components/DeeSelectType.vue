<template>
  <div>
    <div class="middle scrollbar-vertical">
      <div style="min-height: 29px;">
        <span style="line-height: 29px;font-size:14px">{{ selectData.title }}：</span>
      </div>
      <div>
        <div class="inputStyle" style="min-height: 29px;padding-left: 4px;" :style="{width:selectData.width}">
          <div style="float:left">
            <div v-if="isAllType" style="margin-left: 5px;" class="item">
              <span style="color:#000;font-size:14px;background-color:#f5f5f5;width:60px;padding: 0 8px;display: inline-block">全部类型</span>
            </div>
            <div v-for="(item,i) in selectData.selectList" v-else :key="i" class="item">
              <div class="itemDiv">
                <span style="line-height: 25px;text-align: center;padding: 0 0 0 8px;">{{ item.label }}</span>
                <span style="padding: 0 8px 0 0;" class="close" @click="closeItem(i,item)" />
              </div>
            </div>
          </div>
          <div style="margin:5px 0 0 10px;cursor:pointer;float:right;right: 0;position: absolute;"><img :src="require('@/icons/search/zhankai@2x.png')" alt="" width="20" height="20" @click.stop="showTree"></div>
          <div style="clear:both" />
        </div>
        <div v-show="showTreeState" class="treeBox scrollbar-vertical" :style="{width:selectData.width}">
          <el-scrollbar style="height:calc(100% - 20px);overflow:hidden;">
            <el-tree ref="tree" :data="selectData.treeData" show-checkbox node-key="id" default-expand-all @check="checkNode" />
          </el-scrollbar>
        </div>
      </div>
      <el-button v-show="showReset" size="medium" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectData: {
      type: Object,
      required: true
    },
    parentIdName: {
      type: String,
      default: function() {
        return 'parentTypeFullName'
      }
    },
    reset: {
      type: Function,
      default: function() {
        return null
      }
    },
    showReset: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data() {
    return {
      nodeNum: 0,
      showTreeState: false,
      isAllType: false
    }
  },
  mounted() {
    const that = this
    document.addEventListener('click', function(e) {
      that.showTreeState = false
    })
    this.getNodeNum(this.selectData.treeData)
  },
  methods: {
    showTree() {
      this.showTreeState = true
    },

    checkNode(node) {
      this.selectData.selectList = []
      const list = this.$refs.tree.getCheckedNodes()
      list.forEach(item => {
        if (!list.some(node => node.id === item[this.parentIdName])) {
          this.selectData.selectList.push(item)
        }
      })
      this.eventFn(this.selectData.selectList)
    },
    getSelectNodeId() {
      return this.$refs.tree.getCheckedNodes().map(node => node.id).filter(item => item !== 0).join(',')
    },
    closeItem(i, item) {
      this.$refs.tree.setChecked(item.id, false, true)
      this.selectData.selectList.splice(i, 1)
      this.eventFn(this.selectData.selectList)
    },

    eventFn(parmas) {
      this.$emit('select-val', parmas)
    },

    getNodeNum(node) {
      node.forEach(item => {
        if (!item.children) {
          ++this.nodeNum
        } else {
          this.getNodeNum(item.children)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .middle {
    display:flex;
    justify-content:center;
  }
  .inputStyle{
    background:rgba(255,255,255,1);
    border:1px solid rgba(220,220,220,1);
    border-right-style: none;
    border-radius: 2px 0 0 2px;
    position: relative;
    padding: 3px 4px 2px 4px;
    /* display: flex;
    flex-wrap: wrap;
    align-items: center; */
  }
  .treeBox {
    position: absolute;
    height: 400px;
    overflow:hidden;
    background:rgba(255,255,255,1);
    border:1px solid rgba(220,220,220,1);
    z-index: 1111;
  }
  .item{
    height:25px;
    text-align: center;
    margin: 4px 0 0 4px;
    margin-top: 2px;
    cursor:pointer;
    font-size:14px;
    float:left;
  }
  .itemDiv{
    height: 25px;
    background:#f5f5f5;
    border-radius:2px;
  }
   .close {
    color:#d9d9d9;
    border-radius: 50%;
    line-height: 15px;
    text-align: center;
    height: 15px;
    width: 15px;
    font-size: 14px;
    padding: 1px;
  }
  .close::before {
    content: "\2716";
  }
  .itemDiv:hover {
    font-size: 14px;
    .close{
      color:#999999;
    }
  }
</style>
