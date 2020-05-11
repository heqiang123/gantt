<template>
  <el-form ref="form" class="dee-readable-form" :label-width="labelWidth">
    <el-row class="form-item-container">
      <el-col
        v-for="(item,rowIndex) in formData"
        :key="rowIndex"
        :span="item.width?item.width*spanValue:spanValue"
      >
        <div v-if="rowIndex<totalWidthIndex(formData,collapseFlag)">
          <el-form-item :label="item.label.indexOf('个') > -1 ? (item.label.indexOf('个齐套') > -1 ? '(' + item.label : item.label + ')') : item.label+':'">
            <span
              v-if="item.type==='link'"
              class="link"
              v-on="item.handler"
            >{{ item.value }}</span>
            <span
              v-else-if="item.formatter"
            >{{ format(item.formatter.type,item.formatter.pattern,item.value) }}</span>
            <span v-else v-html="item.value" />
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row
      v-if="totalWidthIndex(formData,collapseFlag)>=9"
      style="display: flex;justify-content: center"
    >
      <span class="collapse-button" @click="collapse"><i
        class="el-icon-d-arrow-left"
        :class="collapseFlag===true?'collapse-button-icon-up':'collapse-button-icon-down'"
      /></span>
    </el-row>
  </el-form>
</template>

<script>
import { formatNumber, formatDate, formatMoney } from '../../utils/util'

export default {
  components: {},
  props: {
    formData: {
      type: Array,
      required: true
    },
    labelWidth: {
      type: String,
      default: function() {
        return '90px'
      }
    },
    spanValue: {
      type: Number,
      default: function() {
        return 4
      }
    }
  },
  data() {
    return {
      // 新增折叠逻辑
      collapseFlag: false
    }
  },
  computed: {
    totalWidthIndex() {
      return function(formData, collapseFlag) {
        let width = 0
        let index = 0
        formData.forEach((item, i) => {
          if (item.width) {
            width += item.width
          } else {
            width += 8
          }
          if (width > 72 && index === 0) {
            index = i
          }
        })
        if (width > 72 && collapseFlag === false) {
          return index
        } else if (width > 72 && collapseFlag === true) {
          return formData.length
        } else {
          return formData.length
        }
      }
    },
    widthRange() {
      return function(split) {
        let num = [1, 2, 3]
        switch (split) {
          case 1:
            num = [1]
            break
          case 2:
            num = [1, 2]
            break
          case 3:
            num = [1, 2, 3]
            break
          case 6:
            num = [1, 2, 3, 4, 5, 6]
            break
        }
        return num
      }
    },
    splitNumber() {
      return function(split) {
        let num = 4
        switch (split) {
          case 1:
            num = 24
            break
          case 2:
            num = 12
            break
          case 3:
            num = 8
            break
          case 6:
            num = 4
            break
        }
        return num
      }
    }
  },
  watch: {},
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {
    collapse() {
      this.collapseFlag = !this.collapseFlag
    },
    format(type, pattern, val) {
      let value = val
      switch (type) {
        case 'number':
          value = formatNumber(val, pattern)
          break
        case 'date':
          value = formatDate(val, pattern)
          break
        case 'money':
          value = formatMoney(val, pattern)
          break
      }
      return value
    }
  },
  filter: {}
}
</script>

<style lang="scss">
  @import "../../styles/variables";

  .dee-readable-form {
    padding: 0 20px 4px 20px;

    .link {
      cursor: pointer;
      color: $link-color;
    }

    .el-form-item {
      margin-bottom: 0;
    }

    .el-form-item__label {
      line-height: 30px;
    }

    .el-form-item__content {
      line-height: 30px;
    }

    .form-item-container {
      display: flex;
      flex-wrap: wrap;
    }

    .collapse-button {
      width: 88px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f7f7f7;
      border: 1px solid #e6e6e6;
      cursor: pointer;

      &:hover {
        background-color: #e6e6e699;
      }

      .collapse-button-icon-up {
        transform: rotate(90deg);
      }

      .collapse-button-icon-down {
        transform: rotate(-90deg);
      }
    }
  }
</style>
