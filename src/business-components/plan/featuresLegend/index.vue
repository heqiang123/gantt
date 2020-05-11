<template>
  <div class="features-legend" :class="{'features-btn': !legendBtn}">
    <div v-if="legendBtn" class="legend-btn">
      <template v-for="(item, index) in featuresBtn">
        <el-button :key="index" size="mini" type="primary" @click="handleClick(item.name)">{{ item.name }}</el-button>
      </template>
    </div>
    <div class="legend-legend">
      <li v-for="(item, index) in legend" :key="index">
        <img v-if="item.type === 'image'" src="/image/qizi.png" alt="旗子">
        <span v-else :style="item.style" />
        <span>{{ item.name }}</span>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeaturesLegend',
  model: {
    prop: 'legendBtn',
    event: 'handleSelect'
  },
  props: {
    legendBtn: {
      type: Boolean,
      default: false
    },
    legend: {
      type: Array,
      default: () => {
        return []
      }
    },
    featuresBtn: {
      type: Array,
      default: () => {
        return [
          {
            name: '全部'
          },
          {
            name: '外购成品'
          },
          {
            name: '标准件'
          },
          {
            name: '元器件'
          }
        ]
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick(val) {
      this.$emit('handleSelect', val)
    }
  }
}
</script>
<style lang="scss">
  .features-legend {
    width: 100%;
    margin: 8px 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .legend-btn {
      display: flex;
      flex-direction: row;
      white-space:nowrap;
      // overflow-x: scroll;
    }
    .legend-legend {
      display: flex;
      flex-direction: row;
      white-space:nowrap;
      margin-left: 8px;
      li {
        // width: 70px;
        margin-right: 8px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        img {
          height: 16px;
          width: 16px;
          margin-right: 4px;
        }
        span:first-child {
          height: 9px;
          width: 16px;
          margin-right: 4px;
          display: inline-block
        }
      }
    }
  }
  .features-btn {
    justify-content: flex-end;
    margin: 8px 0 0 0
  }
</style>
