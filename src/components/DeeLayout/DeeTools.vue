<template>
  <div class="dee-tools">
    <div v-if="mode === 'tooltip'" class="dee-tools-item" :class="{mini: (size === 'mini'),large: (size === 'large'), 'extra-large':size === 'extraLarge'}">
      <el-tooltip v-for="(item, index) in tools" :key="index" effect="light" :content="item.name" placement="top">
        <dee-upload v-if="item.type==='upload'" ref="upload" :prop="item.prop" v-on="item.handler">
          <img :src="item.icon" class="icon">
        </dee-upload>
        <div v-else @click="buttonClick(item)">
          <img :src="item.icon" class="icon" v-on="item.handler">
        </div>
      </el-tooltip>
    </div>
    <div v-if="mode === 'dual'" class="dee-tools-item" :class="{mini: (size === 'mini'), large: (size === 'large'), 'extra-large':size === 'extraLarge'}">
      <div v-for="(item, index) in tools" :key="index" class="tool-item">
        <span v-if="disTools.indexOf(item.name) === -1" class="tool-item-box">
          <dee-upload v-if="item.type==='upload'" ref="upload" :prop="item.prop" v-on="item.handler">
            <img :src="item.icon" class="icon"><span>{{ item.name }}</span>
          </dee-upload>
          <el-dropdown v-else-if="item.type==='menus'" class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="icon-content">
              <img :src="item.icon" class="icon"><span :style="{'color': item.color ? item.color : '#000'}">{{ item.name }}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(mitem, mindex) in item.options" :key="mindex">
                <span style="display:block;" @click="item.clickHan(mitem)">{{ mitem.label }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div v-else class="icon-content" v-on="item.handler" @click="buttonClick(item)">
            <img :src="item.icon" class="icon"><span :style="{'color': item.color ? item.color : '#000'}">{{ item.name }}</span>
          </div>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import DeeUpload from '../DeeUpload.vue'

export default {
  components: { DeeUpload },
  props: {
    tools: {
      type: Array,
      default: () => []
    },
    disTools: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: 'tooltip'
    },
    size: {
      type: String,
      default: 'nomal'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {
    buttonClick(item, itemsData) {
      this.$nextTick(() => {
        this.$emit('tb-' + item.name, item)
      })
    }
  },
  filter: {}
}
</script>

<style lang="scss">
  .dee-tools {
    .dee-tools-item{
      display: flex;
      flex-direction: row;
      padding-bottom: 10px 0;
      align-items: center;
    }
    .icon{
      width: 20px;
      height: 20px
    }
    .icon-content{
      font-size: 14px;
      display: flex;
      align-items: center;
      padding-right: 8px;
    }
    .mini{
      .icon{
        width: 16px;
        height: 16px;
        padding: 0px 4px;
      }
    }
    .large{
      .icon-content{
        font-size: 16px;
      }
      .icon{
        width: 24px;
        height: 24px
      }
    }
    .extra-large{
      .icon-content{
        font-size: 18px;
      }
      .icon{
        width: 28px;
        height: 28px
      }
    }
  }
  .icon-content{
    // line-height: 42px
    cursor: pointer;
    font-size: 18px
  }
  .tool-item{
    padding: 0px;
    // height: 32px;
  }
  .dee-tools .icon {
    width: 18px;
    height: 18px;
    align-self: center;
    cursor: pointer;
    padding: 0px 8px;
  }
</style>
