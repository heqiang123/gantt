<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :modal="true"
      :append-to-body="true"
      :visible.sync="visible"
      :before-close="handleClose"
      width="600px"
    >
      <span slot="title" style="font-size: 20px;font-weight: bold;">
        创建卡片
      </span>
      <span slot="footer" style="display: flex;justify-content: center">
        <el-button style="background-color: #2A68C9;color: #fff;margin-right: 15px" @click="addCard">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
      <div style="display: flex;flex-direction: column">
        <div style="padding-bottom: 20px"><span style="padding-right: 30px">业务分类:</span>
          <el-radio-group v-model="radio" size="small">
            <el-radio-button label="全部" />
            <el-radio-button label="统计" />
            <el-radio-button label="任务" />
            <el-radio-button label="流程" />
            <el-radio-button label="工艺" />
            <el-radio-button label="设计" />
          </el-radio-group>
        </div>
        <!--<div style="padding-bottom: 20px"><span style="padding-right: 30px">功能页面:</span>-->
        <!--<el-radio-group v-model="radio1" size="small">-->
        <!--<el-radio-button label="流程任务"></el-radio-button>-->
        <!--<el-radio-button label="任务追踪"></el-radio-button>-->
        <!--<el-radio-button label="待办任务"></el-radio-button>-->
        <!--<el-radio-button label="订阅"></el-radio-button>-->
        <!--<el-radio-button label="收藏"></el-radio-button>-->
        <!--<el-radio-button label="更新"></el-radio-button>-->
        <!--</el-radio-group>-->
        <!--</div>-->
        <div style="padding-bottom: 10px"><span style="padding-right: 15px">自定义标题:</span>
          <el-input v-model="input" placeholder="我发起的流程" style="width: 280px" />
        </div>
        <div style="padding: 20px 0 10px 0;border-bottom: 1px solid #e6e6e6">显示状态</div>
        <div style="padding: 25px;border-bottom: 1px solid #e6e6e6;display: flex;justify-content: space-around">
          <div class="card-img" @click="selectShape(1)">
            <img :class="selected1" src="../../icons/components/card/createCard/duihao.png" style="position: absolute;top: 65px;left: 65px">
            <img
              src="../../icons/components/card/createCard/cardshape1.png"
              style="width: 85px;height: 85px"
            ></div>
          <div class="card-img" @click="selectShape(2)">
            <img :class="selected2" src="../../icons/components/card/createCard/duihao.png" style="position: absolute;top: 35px;left: 80px">
            <img
              src="../../icons/components/card/createCard/cardshape2.png"
              style="width: 99px;height: 57px"
            ></div>
          <div class="card-img" @click="selectShape(3)">
            <img :class="selected3" src="../../icons/components/card/createCard/duihao.png" style="position: absolute;top: 80px;left: 35px">
            <img
              src="../../icons/components/card/createCard/cardshape3.png"
              style="width: 56px;height: 99px"
            ></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      radio: '流程',
      //        radio1: '流程任务',
      input: '',
      selected1: 'selected',
      selected2: 'hide',
      selected3: 'hide',
      shape: 1,
      cardArray: []
    }
  },
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {
    addCard() {
      if (this.input === '') {
        this.input = '我发起的流程'
      }
      const newCard = {
        x: 0,
        y: 0,
        shape: this.shape,
        show: true,
        icon: require('../../icons/components/card/liucheng.png'),
        name: this.input,
        template: 'cardlist2'
      }
      this.cardArray = JSON.parse(localStorage.getItem('cards'))
      this.cardArray.push(newCard)
      localStorage.setItem('cards', JSON.stringify(this.cardArray))
      this.$store.dispatch('card/showHandleCard', { showHandleCard: false })
      this.$store.dispatch('tagsView/backToHome', this.$route)
      this.handleClose()
    },
    handleClose() {
      this.$emit('showCreateCard')
    },
    selectShape(index) {
      this.shape = index
      if (index === 1) {
        this.selected1 = 'selected'
        this.selected2 = 'hide'
        this.selected3 = 'hide'
      } else if (index === 2) {
        this.selected2 = 'selected'
        this.selected1 = 'hide'
        this.selected3 = 'hide'
      } else if (index === 3) {
        this.selected3 = 'selected'
        this.selected1 = 'hide'
        this.selected2 = 'hide'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .card-img {
    position: relative;
    align-self: flex-end;
    cursor: pointer
  }

  .hide {
    display: none;
  }

  .selected {
    position: absolute;
    display: block;
  }

  /deep/ .el-dialog__header {
    border-bottom: 1px solid #e6e6e6;
    margin: 0 20px;
    padding: 15px 0;
  }

  /deep/ .el-dialog {
    border-radius: 10px;
  }
</style>
