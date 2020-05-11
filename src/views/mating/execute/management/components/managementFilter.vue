<template>
  <div>
    <dee-form-box :form-data="formData" :form="form" :label-width="labelWidth" />
  </div>
</template>
<script>
import deeFormBox from '@/components/Form/deeFormBox'
import eventBus from '@/utils/eventBus'
export default {
  name: 'ManagementFilter',
  components: { deeFormBox },
  props: {
    qitaoLength: {
      type: Number,
      default: () => {
        return 0
      }
    },
    gzLength: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
      labelWidth: '135px',
      formData: [
        {
          label: '当前站位',
          value: ''
        },
        {
          label: 'AO齐套率',
          type: 'link',
          value: '',
          handler: {
            click: () => {
              this.$emit('setqt')
            }
          }
        },
        {
          label: '关重件齐套率',
          type: 'link',
          value: '',
          handler: {
            click: () => {
              this.$emit('setgz')
            }
          }
        },
        {
          label: '最长路径齐套率',
          type: 'link',
          value: '',
          handler: {
            click: () => {
              this.$emit('setlong')
            }
          }
        },
        {
          label: `其中前  个齐套`
        },
        {
          label: `前  个关重件齐套`
        }
      ]
    }
  },
  mounted() {
    eventBus.$on('getFilter', target => {
      if (target.indexOf('31') > -1) {
        this.formData[0].value = '31'
        this.formData[1].value = `${this.qitaoLength}/6`
        this.formData[2].value = `${this.gzLength}/6`
        this.formData[3].value = '7/20'
        this.formData[4].label = '其中前7个齐套'
        this.formData[5].label = '前18个关重件齐套'
      } else if (target.indexOf('41') > -1) {
        this.formData[0].value = '41'
        this.formData[1].value = `${this.qitaoLength}/6`
        this.formData[2].value = `${this.gzLength}/6`
        this.formData[3].value = '3/20'
        this.formData[4].label = '其中前3个齐套'
        this.formData[5].label = '前6个关重件齐套'
      } else if (target.indexOf('51') > -1) {
        this.formData[0].value = '51'
        this.formData[1].value = `${this.qitaoLength}/6`
        this.formData[2].value = `${this.gzLength}/6`
        this.formData[3].value = '11/20'
        this.formData[4].label = '其中前11个齐套'
        this.formData[5].label = '前13个关重件齐套'
      } else if (target.indexOf('52') > -1) {
        this.formData[0].value = '52'
        this.formData[1].value = `${this.qitaoLength}/6`
        this.formData[2].value = `${this.gzLength}/6`
        this.formData[3].value = '18/20'
        this.formData[4].label = '其中前18个齐套'
        this.formData[5].label = '前20个关重件齐套'
      } else if (target.indexOf('53') > -1) {
        this.formData[0].value = '53'
        this.formData[1].value = `${this.qitaoLength}/6`
        this.formData[2].value = `${this.gzLength}/6`
        this.formData[3].value = '12/20'
        this.formData[4].label = '其中前12个齐套'
        this.formData[5].label = '前15个关重件齐套'
      } else if (target.indexOf('54') > -1) {
        this.formData[0].value = '54'
        this.formData[1].value = `${this.qitaoLength}/6`
        this.formData[2].value = `${this.gzLength}/6`
        this.formData[3].value = '8/20'
        this.formData[4].label = '其中前8个齐套'
        this.formData[5].label = '前10个关重件齐套'
      } else {
        this.formData[0].value = ''
        this.formData[1].value = ''
        this.formData[2].value = ''
        this.formData[3].value = ''
        this.formData[4].label = '其中前  个齐套'
        this.formData[5].label = '前  个关重件齐套'
      }
    })
  }
}
</script>
<style lang="scss">

.el-form-item__content {
color: #1f1f1f;
}
.el-form-item__label {
  color: #1f1f1f;
  font-weight: 400
}

</style>
