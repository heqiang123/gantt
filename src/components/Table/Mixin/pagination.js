export default {
  props: {
    /**
     * @description 表格数据
     */
    pagination: {
      type: [Object, String],
      default: null
    }
  },
  methods: {
    /**
     * @description 每页条数改变
     */
    handlePaginationSizeChange(pageSize) {
      this.pagination.pageSize = pageSize
      this.$emit('pagination-size-change', pageSize)
      this.$emit('pageChange')
    },
    /**
     * @description 当前页码改变
     */
    handlePaginationCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage
      this.$emit('pagination-current-change', currentPage)
      this.$emit('pageChange')
    },
    /**
     * @description 上一页
     */
    handlePaginationPrevClick(currentPage) {
      this.pagination.currentPage = currentPage
      this.$emit('pagination-prev-click', currentPage)
      this.$emit('pageChange')
    },
    /**
     * @description 下一页
     */
    handlePaginationNextClick(currentPage) {
      this.pagination.currentPage = currentPage
      this.$emit('pagination-next-click', currentPage)
      this.$emit('pageChange')
    }
  }
}
