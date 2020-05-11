<template>
  <div class="upper-lower-deviation">
    <span> {{ toleranceListValue }}</span>
    <span v-if="toleranceListUp && toleranceListUp.includes('±')">
      {{ toleranceListUp }}
    </span>
    <span v-else class="es-ei-box" :style="{width: tolerWidth+'px'}">
      <span class="es-content">{{ toleranceListUp }}</span>
      <span class="ei-content">{{ toleranceListDown }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      finalvalue: [],
      toleranceListValue: '',
      toleranceListUp: '',
      toleranceListDown: '',
      tolerWidth: 40
    }
  },
  computed: {},
  watch: {
    value() {
      this.formateData()
    }
  },
  created() {
    this.formateData()
  },
  mounted() {},
  methods: {
    formateData() {
      if (!this.value) {
        this.finalvalue = []
      } else {
        const middleData = this.value.split(' ')
        if (middleData[0]) {
          const regdegree = /([-\d.]+?)°/.exec(middleData[0])
          const regminute = /([-\d.]+?)′/.exec(middleData[0])
          const regsecond = /([-\d.]+?)″/.exec(middleData[0])
          const degree = regdegree ? regdegree[1] + '°' : ''
          const minute = regminute ? regminute[1] + '′' : ''
          const second = regsecond ? regsecond[1] + '″' : ''
          this.toleranceListValue = degree + minute + second
        }
        if (middleData[1]) {
          const regdegree = /([-\d.]+?)°/.exec(middleData[1])
          const regminute = /([-\d.]+?)′/.exec(middleData[1])
          const regsecond = /([-\d.]+?)″/.exec(middleData[1])
          const degree = regdegree ? regdegree[1] + '°' : ''
          const minute = regminute ? regminute[1] + '′' : ''
          const second = regsecond ? regsecond[1] + '″' : ''
          const toleranceListUp = degree + minute + second
          if (toleranceListUp && toleranceListUp.indexOf('-') < 0) {
            this.toleranceListUp = '+' + toleranceListUp
          } else {
            this.toleranceListUp = toleranceListUp
          }
        }
        if (middleData[2]) {
          const regdegree = /([-\d.]+?)°/.exec(middleData[2])
          const regminute = /([-\d.]+?)′/.exec(middleData[2])
          const regsecond = /([-\d.]+?)″/.exec(middleData[2])
          const degree = regdegree ? regdegree[1] + '°' : ''
          const minute = regminute ? regminute[1] + '′' : ''
          const second = regsecond ? regsecond[1] + '″' : ''
          this.toleranceListDown = degree + minute + second
          const toleranceListDown = degree + minute + second
          if (toleranceListDown && toleranceListDown.indexOf('-') < 0) {
            this.toleranceListDown = '+' + toleranceListDown
          } else {
            this.toleranceListDown = toleranceListDown
          }
        }
        if (this.toleranceListUp.length > this.toleranceListDown.length) {
          this.tolerWidth = this.toleranceListUp.length * 7
        } else {
          this.tolerWidth = this.toleranceListDown.length * 7
        }
        if (this.toleranceListUp.indexOf('+') > -1 && this.toleranceListDown.indexOf('-') > -1 && this.toleranceListUp.slice(1) === this.toleranceListDown.slice(1)) {
          this.toleranceListUp = '±' + this.toleranceListUp.slice(1)
        }
      }
    }
  }
}
</script>
<style lang="scss">
    .upper-lower-deviation{
        display: inline-block;
         .es-ei-box{
            position: relative;
            font-size: 12px;
            display: inline-block;
            width: 40px;
            height: 20px;
            .ei-content{
            position: relative;
            left: 0;
            bottom: -10px;
            font-size: 12px;
            float: left;
            }
            .es-content{
            position: absolute;
            left: 0;
            top: -5px;
            font-size: 12px
            }
        }
    }
</style>
