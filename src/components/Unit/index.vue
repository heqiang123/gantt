<template>
  <div class="unit-com">
    <div v-if="classificationIcon && (classificationIcon.indexOf('普通尺寸') > -1)">
      <div class="measure-box">
        <span v-for="(item, index) in resultData[0]" :key="index">
          <span v-if="item.type==='word'">{{ item.value }} </span>
          <up-low-deviation v-if="item.type==='value'" :value="item.value" />
        </span>
      </div>
    </div>
    <div v-else-if="classificationIcon && (classificationIcon.indexOf('形状公差') > -1 || classificationIcon.indexOf('位置公差') > -1)" class="element-view" style="cursor: pointer">
      <div class="elment-icon-item">
        <svg-icon class="select-icon-item" :icon-class="classificationIcon.split('/')[classificationIcon.split('/').length - 1]" />
      </div>
      <div v-for="(item, index) in resultData" :key="index" class="elment-icon-item">
        <span v-if="item">
          <span v-for="(sitem, sindex) in item" :key="sindex">
            {{ sitem.value }}
          </span>
        </span>
      </div>
    </div>
    <div v-else-if="classificationIcon && classificationIcon.indexOf('表面粗糙度') > -1">
      <roughView v-if="resultData && resultData[0] && resultData[0][0] !== 'null'" :value="resultData[0][0].value" :type="classificationIcon.split('/')[classificationIcon.split('/').length - 1]" />
    </div>
    <div v-else-if="classificationIcon && classificationIcon.indexOf('理论尺寸') > -1" class="measure-box">
      <div v-if="resultData && resultData[0]" class="measure">
        <span v-if="resultData[0][0]">
          {{ resultData[0][0].value }}
        </span>
        <span v-if="resultData[0][1]">
          {{ resultData[0][1].value }}
        </span>
      </div>
    </div>
    <div v-else-if="classificationIcon && classificationIcon.indexOf('角度') > -1">
      <up-low-angle v-if="resultData && resultData[0] && resultData[0][0]" :value="resultData[0][0].value" />
      <!-- <span>{{ resultData && resultData[0] && resultData[0][0] ? resultData[0][0] : `0°` }}</span> -->
    </div>
    <div v-else-if="classificationIcon && classificationIcon.indexOf('倒角') > -1">
      <span>{{ resultData && resultData[0] && resultData[0][0]? resultData[0][0].value : '' }}</span>
      <span>{{ resultData && resultData[0] && resultData[0][1]? resultData[0][1].value : '' }}</span>
      <span v-if="resultData && resultData[0] && resultData[0][3]">{{ resultData && resultData[0]? resultData[0][2].value : '' }}</span>
      <span v-if="resultData[0] && resultData[0][3]">
        <up-low-angle :value="resultData[0][3].value" />
      </span>
    </div>
    <div v-else-if="!classificationIcon">
      <span v-for="(item, index) in resultDataIcon" :key="index">
        <span v-if="item.type==='data'">
          <up-low-deviation :value="item.value" />
        </span>
        <span v-else>
          {{ item.value }}
        </span>
      </span>
    </div>
    <div v-if="$route.query.debug"> {{ iconValue }}</div>
  </div>
</template>
<script>
import UpLowDeviation from './UpLowDeviation'
import UpLowAngle from './UpLowAngle'
import roughView from './roughView'
export default {
  name: 'Unit',
  components: { UpLowDeviation, UpLowAngle, roughView },
  props: {
    classificationIcon: {
      type: String,
      default: ''
    },
    iconValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      resultDataIcon: []
    }
  },
  computed: {
    resultData() {
      let middleResultData = []
      const resData = []
      middleResultData = this.iconValue ? this.iconValue.split('<+>') : []
      for (const key in middleResultData) {
        if (middleResultData[key]) {
          const regular = /\<([^<>]+)\>|\{([^{}]+)\}|<>|{}/g
          let middler
          while (middler = regular.exec(middleResultData[key])) { // eslint-disable-line
            if (!resData[key]) resData[key] = []
            if (middler[0] === null || middler[0] === 'null') {
              middler[0] = ''
            }
            resData[key].push({ value: middler[0].slice(1, -1), type: middler[0].indexOf('{') === 0 ? 'value' : 'word' })
          }
        }
      }
      return resData
    }
  },
  created() {
    if (!this.classificationIcon) {
      let middleIcon = this.iconValue
      middleIcon = middleIcon.replace(/\<([^<>]+)\>|\{([^{}]+)\}|<>|{}/g, (val, vbl) => {
        const midlleValue = val.substr(1, val.length - 2)
        if (val.charAt(0) === '{') {
          return `{{data:${midlleValue}}}`
        } else if (val.charAt(0) === '<') {
          return `{{word:${midlleValue}}}`
        }
      })
      middleIcon = middleIcon.split(/{{|}}/)
      middleIcon.forEach(element => {
        if (element.indexOf('data:') === 0) {
          this.resultDataIcon.push({ type: 'data', value: element.substr(5, element.length - 1) })
        } else if (element.indexOf('word:') === 0) {
          this.resultDataIcon.push({ type: 'word', value: element.substr(5, element.length - 1) })
        } else {
          this.resultDataIcon.push({ type: 'word', value: element })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.unit-com{
  display: inline-block;
   font-size: 14px;
  .measure-box{
    position: relative;
    .measure{
      border: solid 1px #333;
      padding:0 7px;
      position: relative;
    }
  }
}
.element-view{
    border: solid 1px #333;
    display: inline-block;
    white-space: nowrap;
    .elment-icon-item{
      display: inline-block;
      padding: 0 5px;
      position: relative;
      &+.elment-icon-item::after{
        position: absolute;
        left:0;
        top: 0;
        bottom: 0;
        width: 1px;
        background: #333;
        content: ''
      }
    }
  }
</style>
