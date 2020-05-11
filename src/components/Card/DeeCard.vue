/**
* @Description: 卡片组件
* @author lyk
* @date 2019/6/4
*/
<template>
  <el-card
    :class="[card,shapeClass]"
    style="width: 100%;height: 100%;"
    shadow="hover"
  >
    <div slot="header" :style="{cursor: lock==='true'?'default':'move'}">
      <span style="font-size: 20px;font-weight:bold;color:rgba(51,51,51,1);cursor:pointer;" @click="gotoGeneralList">
        <img :src="icon" style="padding-right: 10px;vertical-align: middle" alt="">{{ cardName }}
      </span>
      <img
        slot="reference"
        alt=""
        :style="{display:lock===true?'none':'block'}"
        :src="img"
        style="cursor: pointer;float: right;vertical-align: middle"
        @click="showCard"
      >
      <el-popover
        placement="bottom"
        trigger="hover"
        @after-leave="handleHide"
      >
        <div style="display: flex;flex-direction: row;padding: 10px 10px 0 10px">
          <div style="display: flex;flex-direction: column;border-right: 1px solid #D8D8D8;padding-right: 10px">
            <span class="card-set" @mouseenter="switchItems(0)">重命名</span>
            <span class="card-set" @mouseenter="switchItems(1)" @click="deleteCard">删除</span>
            <span class="card-set" @mouseenter="switchItems(2)">外形</span>
          </div>
          <div v-if="index===0||index===2" style="width: 150px;display: flex;justify-content: center">
            <div
              v-if="index===0"
              style="display: flex;flex-direction: column;justify-content:center;padding-left: 20px"
            >
              <el-input v-model="modifiedName" />
              <el-button type="primary" style="width: 120px;margin-top: 25px;align-self: center" @click="updateName">
                确定
              </el-button>
            </div>
            <div
              v-if="index===2"
              style="display: flex;flex-direction: column;justify-content:center;padding-left: 20px"
            >
              <span v-for="item in items[index]" :key="item.name" class="card-set1" @click="switchShape(item.id)">
                <img :src="item.icon" alt=""><span style="padding-left: 20px">{{ item.name }}</span></span>
            </div>
          </div>
        </div>
        <img
          slot="reference"
          alt=""
          :style="{display:lock===true?'none':'block'}"
          src="../../icons/components/card/shezhi.png"
          style="cursor: pointer;float: right;padding-right: 10px;vertical-align: middle"
        >
      </el-popover>
    </div>
    <div>
      <slot />
    </div>
    <div class="shadow" :class="showShadow">
      <img
        alt=""
        src="../../icons/components/card/jian.png"
        style="width:30px;height:30px;position: absolute;top: 12px;right: 16px;cursor: pointer"
        @click="deleteCard"
      >
    </div>
  </el-card>
</template>
<script>

export default {
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    },
    shape: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean
    },
    lock: {
      type: Boolean
    },
    shadow: {
      type: Boolean
    }
  },
  data() {
    return {
      modifiedName: '',
      rules: {
        rename: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      cardName: this.name,
      showShadow: 'hide-shadow',
      img: require('../../icons/components/card/up.png'),
      isShow: false,
      card: 'card1',
      shapeClass: '',
      items: [[], [], [{
        icon: require('../../icons/components/card/createCard/cardshape1.png'),
        name: '方形',
        id: 1
      }, {
        icon: require('../../icons/components/card/createCard/cardshape2.png'),
        name: '拉宽',
        id: 2
      }, {
        icon: require('../../icons/components/card/createCard/cardshape3.png'),
        name: '拉高',
        id: 3
      }], [], []],
      index: -1
    }
  },
  watch: {
    shadow(val) {
      this.showShadow = val ? 'show-shadow' : 'hide-shadow'
    },
    shape(val) {
      this.switchShape(val)
    },
    show(val) {
      this.isShow = val
      this.img = this.isShow ? require('../../icons/components/card/up.png') : require('../../icons/components/card/down.png')
      this.card = this.isShow ? 'card' : 'card1'
      this.$emit('shapeChange', { i: this.id, shape: this.shape, closed: !this.isShow })
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.isShow = this.show
      this.img = this.isShow ? require('../../icons/components/card/up.png') : require('../../icons/components/card/down.png')
      this.card = this.isShow ? 'card' : 'card1'
      this.switchShape(this.shape)
    })
  },
  methods: {
    gotoGeneralList() {
      let goUrl = ''
      if (!(this.name === '我的收藏' || this.name === '最近访问')) {
        return
      }
      switch (this.name) {
        case '我的收藏':
          goUrl = '/api/users/centers/favorites'
          break
        case '最近访问':
          goUrl = '/api/users/centers/records'
          break
      }
      let count = 0
      this.$router.push({
        path: '/deeSearchResult',
        query: {
          title: this.name + '列表',
          goUrl: goUrl,
          count: count++
        }
      })
    },
    deleteCard() {
      this.$emit('deleteCard', { i: this.id })
    },
    updateName() {
      this.cardName = this.modifiedName
      this.$emit('updateName', { i: this.id, name: this.cardName })
    },
    switchShape(s) {
      switch (s) {
        case 1:
          this.shapeClass = 'shape1'
          break
        case 2:
          this.shapeClass = 'shape2'
          break
        case 3:
          this.shapeClass = 'shape3'
          break
        default:
          this.shapeClass = 'shape1'
          break
      }
      this.$emit('shapeChange', { i: this.id, shape: s, closed: !this.isShow })
    },
    switchItems(index) {
      this.index = index
    },
    showCard() {
      this.isShow = !this.isShow
      this.img = this.isShow ? require('../../icons/components/card/up.png') : require('../../icons/components/card/down.png')
      this.card = this.isShow ? 'card' : 'card1'
      this.$emit('shapeChange', { i: this.id, shape: this.shape, closed: !this.isShow })
    },
    handleHide() {
      if (this.index === 0) {
        this.modifiedName = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  @import "../../styles/mixin";

  .shape1 {
    width: calc(100% - 15px);
    height: 410px;
  }

  .shape2 {
    width: calc(100% - 15px);
    height: 410px;
  }

  .shape3 {
    width: calc(100% - 15px);
    height: 840px;
  }

  .card-set {
    width: 90px;
    padding: 8px 0;
    font-size: 16px;
    color: #333;
    cursor: pointer
  }

  .card-set1 {
    width: 90px;
    padding: 8px 0;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .card-set1:hover {
    @include color('color')
  }

  .card-set:hover {
    @include color('color')
  }

  .card-set:hover:after {
    content: '';
    width: 8px;
    height: 8px;
    @include color('border-color');
    border-top: 1px solid;
    border-right: 1px solid;
    transform: rotate(45deg);
    float: right;
    margin-top: 8px;
  }

  .card {
    border-radius: $border-radius;

    /deep/ .el-card__body {
      visibility: visible;
    }
  }

  .card1 {
    padding: 0;
    height: 57px;
    border-radius: $border-radius;

    /deep/ .el-card__body {
      visibility: hidden;
    }

    /deep/ .el-card__header {
      padding: 15px 20px;
    }

    .shadow {
      height: 80%;
    }
  }

  .card {
    /deep/ .el-card__header {
      padding: 15px 20px;
    }

    /deep/ .el-card__body {
      padding: 0 20px 10px 20px;
    }
  }

  .shadow {
    z-index: 9999;
    position: absolute;
    @include colorWithOpacity('background',.2);
    border: 2px dashed;
    @include color('border-color');
    border-radius: $border-radius;
    width: 99%;
    height: 99%;
    top: 7px;
    left: 5px;
  }

  .show-shadow {
    visibility: visible;
  }

  .hide-shadow {
    visibility: hidden;
  }
</style>
