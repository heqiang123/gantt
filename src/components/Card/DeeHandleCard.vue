<template>
  <div :class="handleCard" class="card">
    <div class="handle-card-item" style="color: #2A68C9" @click="addCard"><img
      src="../../icons/components/card/handleCard/jia.png"
      style="padding-right: 10px"
    >添加
    </div>
    <div class="handle-card-item" style="color: #EB3F53" @click="delCard"><img
      src="../../icons/components/card/handleCard/jian.png"
      style="padding-right: 10px"
    >{{ delName }}
    </div>
    <div class="handle-card-item" style="color: #ECA33A" @click="lockCard"><img
      src="../../icons/components/card/handleCard/suo.png"
      style="padding-right: 10px"
    >{{ lockName }}
    </div>
    <div class="handle-card-item" style="color: #16B4A0" @click="resetCard"><img
      src="../../icons/components/card/handleCard/shua.png"
      style="padding-right: 10px"
    >重置
    </div>
    <img
      src="../../icons/components/card/handleCard/chevrons-up.png"
      style="position: absolute;right: 35px;cursor: pointer"
      @click="hideHandleCard"
    >
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
      delName: '移除',
      lockName: '锁定',
      handleCard: 'handle-card'
    }
  },
  watch: {
    visible(v) {
      if (v) {
        this.handleCard = 'handle-card1'
      } else {
        this.handleCard = 'handle-card'
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.lockName = Boolean(localStorage.getItem('cardLock')) === true ? '取消' : '锁定'
    })
  },
  methods: {
    addCard() {
      this.$store.dispatch('card/showCreateCard', { showCreateCard: true })
      this.delName = '移除'
      this.$store.dispatch('card/setShadow', { shadow: false })
    },
    delCard() {
      if (this.delName === '移除') {
        this.$store.dispatch('card/setShadow', { shadow: true })
        this.delName = '取消'
      } else {
        this.$store.dispatch('card/setShadow', { shadow: false })
        this.delName = '移除'
      }
    },
    lockCard() {
      if (this.lockName === '锁定') {
        this.$store.dispatch('card/setLock', { lock: true })
        this.lockName = '取消'
      } else {
        this.$store.dispatch('card/setLock', { lock: false })
        this.lockName = '锁定'
      }
      localStorage.setItem('card/cardLock', this.$store.state.card.lock)
    },
    resetCard() {
      this.$store.dispatch('card/showHandleCard', { showHandleCard: false })
      localStorage.setItem('cards', JSON.stringify(this.$store.state.card.defaultData))
      this.$store.dispatch('tagsView/backToHome', this.$route)
    },
    hideHandleCard() {
      this.delName = '移除'
      this.lockName = '锁定'
      this.$emit('showHandleCard', false)
      this.$store.dispatch('card/setShadow', { shadow: false })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../styles/variables';

  .card {
    width: calc(100% - #{$asideBarWidth});
    position: absolute;
    top: 0;
    left: $asideBarWidth;
    background-color: #fff;
    z-index: 99;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: height .3s;
  }

  .handle-card-item {
    cursor: pointer;
    padding: 0 25px;
    display: flex;
    align-items: center;
  }

  .handle-card {
    display: none;
    height: 0;
  }

  .handle-card1 {
    display: flex;
    height: $tabBarHeight;
  }
</style>
