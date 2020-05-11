<template>
  <div class="upload-file-name">
    <span
      :class="link?'link':''"
      @click="click"
    >{{ scope.row.fileName }}</span>
  </div>
</template>

<script>
// import { downloadFiles } from '../../api/new/documents'
// import { downLoadFileUrl } from '../../utils/util'

export default {
  name: 'UploadFileName',
  components: {},
  props: {
    scope: {
      type: Object,
      default: null
    },
    link: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {
    click() {
      // if (this.link) {
      //   downloadFiles(this.scope.row.url, this.scope.row.fileName).then(x => {
      //     this.$utils.showMessage('下载中，请稍后...', 'info')
      //     if (x.headers['content-disposition']) {
      //       const url = window.URL.createObjectURL(new Blob([x.data], { type: x.headers['content-type'] }))
      //       downLoadFileUrl(url, this.scope.row.fileName)
      //     }
      //   })
      //   // const url = process.env.VUE_APP_BASE_FILES + '/files/' + this.scope.row.fileName
      //   // downLoadFileUrl(url, decodeURI(this.scope.row.fileName))
      // }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variables";

  .upload-file-name {
    .link {
      color: $link-color;
      cursor: pointer;
    }
  }
</style>
