<template>
  <div>
    <el-upload
      style="display: none"
      action=""
      :http-request="upload"
    >
      <el-button :id="'upload'+id" slot="trigger" size="small" type="primary">点击上传</el-button>
    </el-upload>
    <dee-table
      :selection-row="selectionRow"
      :index-row="indexRow"
      :data="tableData"
      :columns="columns"
      @selection-change="selectionChange"
    >
      <dee-tools v-show="state!=='view'" slot="header" :tools="tools" mode="normal" />
    </dee-table>
  </div>
</template>

<script>
import { post } from '../../utils/http'
import DeeTable from '../Table/DeeTable'
import DeeTools from '../DeeTools'
import UploadFileName from './uploadFileName'

export default {
  components: { DeeTable, DeeTools },
  props: {
    data: {
      type: [Array, String, Object],
      default: () => []
    },
    url: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    link: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => {
      }
    },
    renFileName: {
      type: String,
      default: () => {
        return ''
      }
    },
    formatData: {
      type: [Function, Object],
      default: () => {}
    },
    limit: {
      type: Number,
      default: () => {
        return -1
      }
    },
    state: {
      type: String,
      default: () => {
        return 'edit'
      }
    },
    accept: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    const that = this
    return {
      currentSelection: [],
      selectionRow: { align: 'center', width: 60 },
      indexRow: { title: '序号', align: 'center', width: 80 },
      tools: [{
        icon: '/icons/c-add.png',
        name: '添加',
        handler: {
          click: function() {
            document.querySelector('#upload' + that.id).click()
          }
        }
      },
      {
        icon: '/icons/c-delete.png',
        name: '移除',
        handler: {
          click: function() {
            if (that.currentSelection.length === 0) {
              that.$utils.showMessageWarning('请至少选择一条记录！')
            } else {
              const deleteCopy = JSON.parse(JSON.stringify(that.currentSelection))
              deleteCopy.forEach(x => {
                x.description = 'delete'
              })
              that.currentSelection.forEach(x => {
                x.operation = 'DELETE'
              })
              that.$emit('deleteData', that.currentSelection)
              that.fileList = that.fileList.filter(x => that.currentSelection.every(y => x.id !== y.id))
              // const data = JSON.parse(JSON.stringify(that.fileList))
              that.fileList = JSON.parse(JSON.stringify(that.currentSelection.concat(that.fileList).concat(deleteCopy)))
              that.$emit('uploadData', that.fileList)
            }
          }
        }
      }],
      columns: [{
        title: '文件', minWidth: 120, align: 'center', component: {
          name: UploadFileName,
          props: {
            link: that.link
          }
        }
      }],
      fileList: [],
      originalData: []
    }
  },
  computed: {
    tableData: function() {
      return this.fileList.filter(x => {
        x.show = true
        if (x.operation || x.description) {
          return x.operation !== 'DELETE' && x.description !== 'delete'
        } else {
          return x
        }
      })
    }
  },
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        if (Array.isArray(val)) {
          this.fileList = val
        }
        // this.originalData = val
      }
    }
    // originalData: function(val) {
    //   this.$emit('uploadData', val)
    // }
  },
  mounted: function() {
  },
  methods: {
    selectionChange(val) {
      this.currentSelection = val
    },
    upload(file) {
      if (this.accept.length > 0 && !this.accept.includes(file.file.name.split('.')[1].toLowerCase())) {
        this.$message({
          message: `只能上传${this.accept.join(',')}格式的图片`,
          type: 'warning'
        })
        return
      }
      if (this.limit > 0) { // 设置了文件上限
        if (this.limit <= this.tableData.length) { // 已达到文件个数上限
          this.$message({
            message: '已达到文件个数上限',
            type: 'warning'
          })
          return
        }
      }
      const formData = new FormData()
      if (this.renFileName) {
        formData.append('file', new File([file.file], this.renFileName + file.file.name))
      } else {
        formData.append('file', file.file)
      }
      if (this.params) {
        Object.entries(this.params).forEach(x => {
          formData.append(x[0], x[1])
        })
      }
      // new Promise((resolve, rejects) => {
      post(this.url, formData).then(x => {
        if (x.code !== 0) {
          this.$message({
            message: x.message,
            type: 'warning'
          })
          return
        }
        if (x.items && x.items.code && (x.items.code !== '0')) {
          this.$message({
            message: x.items.message,
            type: 'warning'
          })
          return
        }
        if (this.formatData) {
          this.fileList = this.formatData(x.items)
          this.$emit('upload', x.items)
          this.$emit('uploadData', this.fileList)
          return
        }
        // this.originalData = x.items
        // this.$emit('uploadData', x.items)
        this.fileList.push(x.items)
        this.$emit('uploadData', this.fileList)
      }).catch(e => {
      })
    }
  },
  filter: {}
}
</script>

<style scoped lang="scss">
</style>
