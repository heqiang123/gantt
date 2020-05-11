<template>
  <div class="upper-lower-deviation">
    <span>
      <span> {{ finalvalue[0] ? parseFloat(finalvalue[0]) : '' }}</span>
      <span v-if="finalvalue[1] && String(finalvalue[1]).indexOf('±') > -1" :style="{width: tolerWidth + 'px'}">
        {{ finalvalue[1] }}
      </span>
      <!-- <span v-else-if="!finalvalue[1] && !finalvalue[2]" class="es-ei-box" /> -->
      <span v-else :style="{width: tolerWidth + 'px'}" class="es-ei-box">
        <span class="es-content">{{ finalvalue[1] || finalvalue[1] === 0 ? finalvalue[1]: '' }}</span>
        <span class="ei-content">{{ finalvalue[2] || finalvalue[2] === 0 ? finalvalue[2] : '' }}</span>
      </span>
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
        const middleValue = this.value.split(' ')
        if (middleValue[1] && middleValue[1].indexOf('±') < 0) {
          if (Math.abs(middleValue[1]) === 0 && middleValue[1] !== 0) {
            if (Math.abs(middleValue[2]) === 0) {
              middleValue[1] = ''
            } else {
              middleValue[1] = 0
            }
          } else {
            middleValue[1] = middleValue[1] ? parseFloat(middleValue[1]) : 0
          }
          if (Math.abs(middleValue[2]) === 0 && middleValue[2] !== 0) {
            if (Math.abs(middleValue[1]) === 0) {
              middleValue[2] = ''
            } else {
              middleValue[2] = 0
            }
          } else {
            middleValue[2] = middleValue[2] ? parseFloat(middleValue[2]) : 0
          }
          if (middleValue[1] > 0 && middleValue[2] < 0 && Math.abs(middleValue[1]) === Math.abs(middleValue[2])) {
            middleValue[1] = '±' + Math.abs(middleValue[1])
          } else if (middleValue[1] > 0) {
            middleValue[1] = '+' + middleValue[1]
          }
          if (middleValue[2] > 0) {
            middleValue[2] = '+' + middleValue[2]
          }
        }
        this.finalvalue = middleValue
        if (String(this.finalvalue[1]).length > String(this.finalvalue[2]).length) {
          this.tolerWidth = String(this.finalvalue[1]).length * 8
        } else {
          this.tolerWidth = String(this.finalvalue[2]).length * 8
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
