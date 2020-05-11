<template>
  <el-upload
    ref="upload"
    class="dee-upload"
    action=""
    :http-request="upload"
    v-bind="prop"
    v-on="prop.handler"
  >
    <slot />
  </el-upload>
</template>

<script>
import { post } from '../utils/http'

export default {
  name: 'App',
  components: {},
  props: {
    prop: {
      type: Object,
      default: function() {
        return {
          url: ''
        }
      }
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
    onSuccess(response, file, fileList) {
      this.$emit('onSuccess', response)
    },
    onError(err, file, fileList) {
      this.$emit('onError', err)
    },
    onRemove(file, fileList) {
      this.$emit('onRemove', file, fileList)
    },
    upload(file) {
      // new Promise((resolve, rejects) => {
      const formData = new FormData()
      formData.append('file', file.file)
      if (this.prop.data) {
        Object.entries(this.prop.data).forEach(x => {
          formData.append(x[0], x[1])
        })
      }
      post(this.prop.url, formData).then(x => {
        if (x.code === 0) {
          this.$emit('onSuccess', x)
        } else {
          this.$emit('onError', x)
        }
      }).catch(e => {
        this.$emit('onError', e)
      })
    }
  },
  filter: {}
}
</script>

<style lang="scss">
</style>
