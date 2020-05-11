<template>
  <div class="dee-tools">
    <div v-if="mode==='normal'" style="display: flex;flex-direction: row">
      <!--      // 新增折叠逻辑-->
      <div v-if="collapse===true" style="display: flex">
        <div v-for="(item, index) in allTools" :key="index" class="tools-block">
          <div v-if="index<4">
            <dee-upload
              v-if="item.type==='upload'"
              ref="upload"
              :prop="item.prop"
              style="display: flex;flex-direction: row;align-items: center"
              class="tool-item"
              v-bind="item.component"
              v-on="item.handler"
            >
              <img :src="item.icon" class="icon"><span class="icon-font">{{ item.name }}</span>
            </dee-upload>
            <el-button
              v-else
              style="display: flex;flex-direction: row;align-items: center"
              class="tool-item-button"
              v-bind="item.component"
              @click="buttonClick($event, item)"
              v-on="item.handler"
            >
              <img :src="item.icon" class="icon"><span class="icon-font">{{ item.name }}</span>
            </el-button>
          </div>
        </div>
        <el-popover
          v-if="allTools.length>4"
          placement="bottom"
          popper-class="popover"
          width="100%"
          title=""
          trigger="hover"
        >
          <div v-for="(item, index) in allTools" :key="index" class="tools-block">
            <div v-if="index>=4">
              <dee-upload
                v-if="item.type==='upload'"
                ref="upload"
                :prop="item.prop"
                style="display: flex;flex-direction: row;align-items: center"
                class="tool-item"
                v-bind="item.component"
                v-on="item.handler"
              >
                <img :src="item.icon" class="icon"><span
                  class="icon-font"
                >{{ item.name }}</span>
              </dee-upload>
              <div
                v-else
                style="display: flex;flex-direction: row;align-items: center"
                class="tool-item"
                v-bind="item.component"
                v-on="item.handler"
                @click="buttonClick($event, item)"
              >
                <img :src="item.icon" class="icon"><span
                  class="icon-font"
                >{{ item.name }}</span>
              </div>
            </div>
          </div>
          <i slot="reference" class="el-icon-more icon tool-item" />
        </el-popover>
      </div>
      <div v-if="collapse===false" style="display: flex">
        <div v-for="(item, index) in allTools" :key="index" class="tools-block">
          <dee-upload
            v-if="item.type==='upload'"
            ref="upload"
            :prop="item.prop"
            style="display: flex;flex-direction: row;align-items: center"
            class="tool-item"
            v-bind="item.component"
            v-on="item.handler"
          >
            <img :src="item.icon" class="icon"><span class="icon-font">{{ item.name }}</span>
          </dee-upload>
          <div
            v-else
            style="display: flex;flex-direction: row;align-items: center"
            class="tool-item"
            v-bind="item.component"
            v-on="item.handler"
            @click="buttonClick($event, item)"
          >
            <img :src="item.icon" class="icon"><span class="icon-font">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="display: flex;flex-direction: row">
      <!-- <el-tooltip
        v-for="(item, index) in allTools"
        :key="index"
        effect="light"
        :content="item.name"
        placement="top"
        :open-delay="500"
      > -->
      <dee-upload
        v-if="item.type==='upload'"
        ref="upload"
        :prop="item.prop"
        v-bind="item.component"
        v-on="item.handler"
      >
        <img :src="item.icon" class="icon tool-item">
      </dee-upload>
      <div v-else title="item.name">
        <img :src="item.icon" class="icon tool-item" v-bind="item.component" @click="buttonClick($event, item)" v-on="item.handler">
      </div>
      <!-- </el-tooltip> -->
    </div>
  </div>
</template>

<script>
import DeeUpload from '../components/DeeUpload.vue'

export default {
  components: { DeeUpload },
  props: {
    tools: {
      type: Array,
      default: function() {
        return []
      }
    },
    permissions: {
      type: Array,
      default: function() {
        return []
      }
    },
    mode: {
      type: String,
      default: ''
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    allTools() {
      const tools = []
      this.tools.forEach(item => {
        if (!item.key || this.permissions.includes(item.key)) {
          tools.push(item)
        }
      })
      return tools
    }
  },
  watch: {
  },
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {
    buttonClick(e, item) {
      if (item.handlerFun) {
        item.handlerFun(item, e)
      } else {
        this.$emit('tb-' + item.btnValue, item, e)
      }
    }
  },
  filter: {}
}
</script>

<style lang="scss">
  @import "../../src/styles/mixin";

  .dee-tools {
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    .icon {
      width: 18px;
      height: 18px;
      cursor: pointer;
      align-self: center;
      // padding: 4px;
      margin-right: 4px;
      transform: translateY(1px);
    }
    .tools-block{
      display: flex;
      padding-right: 8px
    }
    .icon-font {
      cursor: pointer;
      padding-right: 8px;
      color: #4a4a4a;
      font-size: 14px;
      line-height: 20px !important;
    }

    .tool-item {
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
    }

    .tool-item-button {
      padding: 0;
      border: 0;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.06) !important;
      }
    }
  }

  .popover {
    padding: 5px 0 !important;
    border-radius: 0 !important;

    .icon {
      width: 18px;
      height: 18px;
      cursor: pointer;
      align-self: center;
      padding: 12px;
      transform: translateY(1px);
    }

    .icon-font {
      cursor: pointer;
      padding-right: 8px;
      color: #4a4a4a;
      font-size: 14px;
    }

    .tool-item {
      padding: 1px 17px;

      &:hover {
        background-color: #F7F7F7;
      }
    }
  }
</style>
