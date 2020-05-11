<template>
  <div>
    <div class="tree">
      <el-tree
        ref="tree"
        :data="data"
        node-key="id"
        default-expand-all
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        :empty-text="msg"
        :expand-on-click-node="flage"
        draggable
        :render-content="renderContent"
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
      />
      <slot />
    </div>
    <div class="legend-description">
      <p class="legend-title">图例 :</p>
      <div class="legend-content">
        <span class="new-modified"><i class="ibox" /><i>新代号-橙色</i></span>
        <span class="new-add"><i class="ibox" /><i>新增加-红色</i></span>
        <span class="not-modified"><i class="ibox" /><i>未改动-黑色</i></span>
        <span class="change-modified"><i class="ibox" /><i>更改项-绿色</i></span>
        <span class="delete-exist"><i class="ibox" /><del>删除项-删除线</del></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      flage: false,
      msg: '请在右侧填写属性，添加根节点',
      display: false,
      input: '',
      selectNode: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeForm: {}
    }
  },
  mounted() {
  },
  methods: {
    // 鼠标移入事件显示
    mouseEnterHandle(e) {
      const elem = e.target
      elem.children[elem.children.length - 1].style.display = 'block'
    },
    // 鼠标移出事件隐藏
    mouseLeaveHandle(e) {
      const elem = e.target
      elem.children[elem.children.length - 1].style.display = 'none'
    },
    // 点击新建触发的事件，将事件抛出去，清空form表单
    append(currentNode, num2, e) {
      e.stopPropagation()
      this.$emit('emptyForm', currentNode, num2)
    },
    // 单击节点form表单回显,回显后修改
    EchoForm(node, num1) {
      this.$emit('EchoForm', node, num1)
    },
    // 点击删除,删除节点
    remove(node, data, e) {
      e.stopPropagation()
      this.$emit('remove', node, data, e)
    },
    // 点击撤销删除的时候
    revokeRemove(node, data) {
      this.$emit('revokeRemove', node, data)
    },
    renderContent(h, { node, data, store }) {
      if (data.status === '新代号') {
        return (
          <span style='height: 25px;display:flex;justify-content:flex-start;width:100%; padding-right: 8px;'
            on-click={() => this.EchoForm(node, 2)} class='el-tree-node-class'>
            <span>
              <span
                style='color:#FFCC00;font-size:14px;'>{node.data.partnumber + ' ' + node.data.partname + ' ' + node.data.phase + ' ' + (node.data.usecount ? '(' + node.data.usecount + ')' : '')}</span>
            </span>
            <span class='handle'>
              <i class='addNode' on-click={(e) => this.append(node, 1, e)}></i>
              <i class='deleteNode' style={{ display: node.level === 1 ? 'none' : 'inline-block' }} on-click={(e) => this.remove(node, data, e)}></i>
            </span>
          </span>
        )
      } else if (data.ancestorStatus === '已删除') {
        return (
          <span style='height: 25px;display:flex;justify-content: flex-start;width:100%; padding-right: 8px;'
            on-click={() => this.EchoForm(node, 2)} class='el-tree-node-class'>
            <span>
              <span
                style='text-decoration:line-through;color:black;font-size:14px;'>{node.data.partnumber + ' ' + node.data.partname + ' ' + node.data.phase + ' ' + (node.data.usecount ? '(' + node.data.usecount + ')' : '')}</span>
            </span>
          </span>
        )
      } else if (data.status === '已删除') {
        if (node.parent.data.status !== '已删除') {
          return (
            <span style='height: 25px;display:flex;justify-content: flex-start;width:100%; padding-right: 8px;'
              on-click={() => this.EchoForm(node, 2)} class='el-tree-node-class'>
              <span>
                <span
                  style='text-decoration:line-through;color:black;font-size:14px;'>{node.data.partnumber + ' ' + node.data.partname + ' ' + node.data.phase + ' ' + (node.data.usecount ? '(' + node.data.usecount + ')' : '')}</span>
              </span>
              <span class='handle'>
                <i class='revokeNode' on-click={() => this.revokeRemove(node, data)}></i>
              </span>
            </span>
          )
        } else {
          return (
            <span style='height: 25px;display:flex;justify-content: flex-start;width:100%; padding-right: 8px;'
              on-click={() => this.EchoForm(node, 2)} class='el-tree-node-class'>
              <span>
                <span
                  style='text-decoration:line-through;color:black;font-size:14px;'>{node.data.partnumber + ' ' + node.data.partname + ' ' + node.data.phase + ' ' + (node.data.usecount ? '(' + node.data.usecount + ')' : '')}</span>
              </span>
            </span>
          )
        }
      } else if (data.status === '更改项') {
        return (
          <span style='height: 25px;display:flex;justify-content: flex-start;width:100%; padding-right: 8px;'
            on-click={() => this.EchoForm(node, 2)} class='el-tree-node-class'>
            <span>
              <span
                style='color:#008000;font-size: 14px;width:100%;'>{node.data.partnumber + ' ' + node.data.partname + ' ' + node.data.phase + ' ' + (node.data.usecount ? '(' + node.data.usecount + ')' : '')}</span>
            </span>
            <span class='handle'>
              <i class='addNode' on-click={(e) => this.append(node, 1, e)}></i>
              <i class='deleteNode' style={{ display: node.level === 1 ? 'none' : 'inline-block' }} on-click={(e) => this.remove(node, data, e)}></i>
            </span>
          </span>
        )
      } else if (data.status === '新增加') {
        return (
          <span style='height: 25px;display:flex;justify-content: flex-start;width:100%; padding-right: 8px;'
            on-click={() => this.EchoForm(node, 2)} class='el-tree-node-class'>
            <span>
              <span
                style='color:red;font-size: 14px;'>{node.data.partnumber + ' ' + node.data.partname + ' ' + node.data.phase + ' ' + (node.data.usecount ? '(' + node.data.usecount + ')' : '')}</span>
            </span>
            <span class='handle'>
              <i class='addNode' on-click={(e) => this.append(node, 1, e)}></i>
              <i class='deleteNode' style={{ display: node.level === 1 ? 'none' : 'inline-block' }} on-click={(e) => this.remove(node, data, e)}></i>
            </span>
          </span>
        )
      } else {
        return (
          <span style='height: 25px;display:flex;justify-content: flex-start;width:100%; padding-right: 8px;'
            on-click={() => this.EchoForm(node, 2)} class='el-tree-node-class'>
            <span>
              <span
                style='font-size: 14px;'> {node.data.partnumber + ' ' + node.data.partname + ' ' + node.data.phase + ' ' + (node.data.usecount ? '(' + node.data.usecount + ')' : '')}</span>
            </span>
            <span class='handle'>
              <i class='addNode' on-click={(e) => this.append(node, 1, e)}></i>
              <i class='deleteNode' style={{ display: node.level === 1 ? 'none' : 'inline-block' }} on-click={(e) => this.remove(node, data, e)}></i>
            </span>
          </span>
        )
      }
    },
    handleDragStart(node, ev) {
      // console.log('drag start', node)
      this.$emit('handleDragStart', node, ev)
      // this.$emit('abc', node, ev)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
    },
    // 鼠标拖拽到目标元素所触发的事件
    handleDrop(draggingNode, dropNode, dropType, ev) {
      this.$emit('handleDrop', draggingNode, dropNode, dropType, ev)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.level === 1) {
        return false
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return true
    }
  }
}
</script>
<style lang="scss">
  .tree-wrapper {
    width: 100%;
    border: 1px solid #DEE1E6;
    height: 452px;
    padding: 8px;
  }

  .ibox {
    width: 14px;
    height: 14px;
    background-color: currentColor;
    vertical-align: middle;
    display: inline-block;
    margin-right: 4px;
  }

  .tree .el-tree-node__content {
    height: 34px !important;
  }

  .tree {
    width: 100% !important;
    height: 452px;
    overflow: auto;
  }

  .handle {
    display: none;
  }

  @media screen and (max-width: 1366px) {
    .legend-content {
      font-size: 11px;
    }
  }

  @media screen and (max-width: 1440px) {
    .legend-content {
      font-size: 11px;
    }
  }

  .el-tree-node-class {
    &:hover {
      .handle {
        display: block;
      }
    }
  }

  .tree .addNode::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 16px;
    width: 16px;
    background: url('../icons/components/tree/Treeadd.png') no-repeat;
    background-size: 100%;
    margin-left: 50px;
    margin-right: 15px;
  }

  .tree .deleteNode::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 16px;
    width: 16px;
    background: url('../icons/components/tree/shanchu.png') no-repeat;
    background-size: 100%;
  }

  .tree .revokeNode::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 16px;
    width: 16px;
    margin-left: 20px;
    background: url('../icons/components/tree/chexiao.png') no-repeat;
    background-size: 100%;
  }

  .legend-content .not-modified i{
    color: black;
  }
  .legend-content .new-modified i{
    color: #FFCC00;
  }
  .legend-content .new-add i{
    color: red;
  }
  .legend-content .delete-exist i, .legend-content .delete-exist del{
    color: #c9c9c9;
  }
  .legend-content .change-modified i{
    color: #008000;
  }
</style>
