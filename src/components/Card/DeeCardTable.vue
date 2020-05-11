<template>
  <a-table
    id="cardTable"
    ref="deeTable"
    v-deeLoading="$store.state.loading.loadingState"
    :columns="columns"
    :data="data"
    :options="options"
    :pagination="pagination"
    @cell-click="handleCellClick"
    @pagination-current-change="currentChange"
  />
</template>

<script>
import ATable from '../Table/DeeTable.vue'
import moment from 'moment'
import { getWorkFlowItems } from '../../api/home2'
// import Layout from '../../layout'
// import Vue from 'vue'

export default {
  components: { ATable },
  props: {
    columns: {
      type: Array,
      require: true,
      default: function() {
        return []
      }
    },
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: null,
      pagination: {
        currentPage: 1,
        pageSize: 20,
        pageSizes: [20],
        total: 0
      },
      data: []
    }
  },
  computed: {},
  watch: {
  },
  mounted: function() {
    this.$nextTick(function() {
      this.initData()
    })
  },
  methods: {
    initData() {
      this.$store.dispatch('loading/setLoading', { loadingState: true })
      getWorkFlowItems(this.pagination.currentPage, this.pagination.pageSize).then(x => {
        this.$store.dispatch('loading/setLoading', { loadingState: false })
        x.items.data.forEach((z, k) => {
          z.index = (k + 1)
        })
        this.pagination.total = x.items.count
        this.data = x.items.data
        /**
         * @Description: 动态路由加载
         * @author lyk
         * @date 2019/6/10
         */
        // const childRouter = []
        if (x.items.data.length > 0) {
          // x.items.data.forEach((y, j) => {
          //   childRouter.push({
          //     path: '/taskDetail-' + y.taskId.substring(y.taskId.lastIndexOf(':') + 1),
          //     name: 'TaskDetail-' + y.taskId.substring(y.taskId.lastIndexOf(':') + 1),
          //     hidden: true,
          //     component: () => Vue.component('TaskDetail-' + y.taskId.substring(y.taskId.lastIndexOf(':') + 1), import('../../views/taskDetail'))
          //   })
          // })
          // this.$router.addRoutes([{
          //   path: '/index',
          //   component: Layout,
          //   children: childRouter
          // }])
        }
      }).catch(e => {
        this.$store.dispatch('loading/setLoading', { loadingState: false })
      })
    },
    handleCellClick(row, column, cell, event) {
      this.$router.push({
        path: '/taskDetail-' + row.taskId.substring(row.taskId.lastIndexOf(':') + 1),
        query: { id: row.taskId, title: row.taskName, time: moment().valueOf() } // boName
      })
    },
    currentChange(val) {
      this.pagination.currentPage = val
      this.initData()
    }
  },
  filter: {}
}
</script>

<style lang="scss">
</style>
