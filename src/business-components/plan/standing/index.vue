<template>
  <div class="standing">
    <div v-if="standTitle" class="standing-title">
      <span>{{ partTitle }}</span>
      <el-button size="mini" @click="handleCraftsmanship">工艺配置</el-button>
      <el-button size="mini" @click="handleSorting">架次视图</el-button>
    </div>
    <div v-if="standBtn" class="standing-btn">
      <el-button size="mini" @click="handleAssembly">装配顺序</el-button>
      <el-button size="mini" @click="handleResources">资源配置</el-button>
    </div>
    <div v-if="standPosition" class="standing-position">
      <el-button v-for="(item,index) in positionData" :key="index" :class="[isShowActive ? (item.name === standingState ? 'active' : '') : '']" @click="handleStand()">{{ item.name }}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Standing',
  props: {
    partTitle: {
      type: String,
      default: () => {
        return 'AG600'
      }
    },
    standTitle: {
      type: Boolean,
      default: false
    },
    standBtn: {
      type: Boolean,
      default: false
    },
    standPosition: {
      type: Boolean,
      default: false
    },
    standingState: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      isShowActive: true,
      positionData: [
        {
          name: '31站位',
          index: 0
        },
        {
          name: '41站位',
          index: 1
        },
        {
          name: '51站位',
          index: 2
        },
        {
          name: '52站位',
          index: 3
        },
        {
          name: '53站位',
          index: 4
        },
        {
          name: '54站位',
          index: 5
        }
      ]
    }
  },
  watch: {
    standingState() {
      this.isShowActive = true
    }
  },
  methods: {
    handleAssembly() {
      this.$emit('assembly')
    },
    handleResources() {
      this.$emit('resources')
    },
    handleCraftsmanship() {
      this.$emit('craftsmanship')
    },
    handleSorting() {
      this.$emit('sorting')
    },
    handleStand() {
      this.isShowActive = false
      this.$emit('changeStand')
    }
  }
}
</script>
<style lang="scss">
  .standing {
    &-title {
      display: flex;
      align-items: center;
      font-weight: bold;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(217,217,217,1);
      .el-button {
        margin: 0 8px 4px
      }
    }
    &-titlely {
      margin-top: 8px
    }
    &-btn {
      padding: 8px 0
    }
    &-position {
      padding-bottom: 8px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      .el-button {
        font-weight: bold;
        font-size: 16px;
        width: calc(100%/6 - 50px/6);
        min-width: 90px
      }
    }
  }
  .active {
    color: #3a8ee6;
    outline: none;
    background-color: #ecf5ff;
  }
</style>
