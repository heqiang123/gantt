<template>
  <div>
    <dee-table :columns="columns" :index-row="{title: '序号'}" :data="data" />
  </div>
</template>
<script>
import { getProcessCrator } from '@/api/processCrator'
export default {
  name: 'SyTable',
  data() {
    return {
      columns: [
        { title: 'AO', key: 'AO' },
        { title: 'AO名称', key: 'AOname' },
        { title: '资源类型', key: 'type' },
        { title: '资源编号', key: 'number' },
        { title: '资源名称', key: 'name' }
      ],
      data: []
    }
  },
  mounted() {
    this.getProcessCrator()
  },
  methods: {
    getProcessCrator() {
      getProcessCrator().then(res => {
        this.data = res.data.items.model
      })
    }
  }
}
</script>
