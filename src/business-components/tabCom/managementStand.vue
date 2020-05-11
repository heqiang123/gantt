<template>
  <div>
    <dee-table
      :index-row="{title: '序号'}"
      :columns="scheduleColumns"
      :data="scheduleData"
      :options="options"
    />
    <div style="width:100%;height:40px;align-items:center;display:flex;justify-content: flex-end;font-size: 14px">当前总条数:{{ scheduleData.length }}</div>
  </div>
</template>
<script>
import eventBus from '@/utils/eventBus'
import { getManage } from '@/api/mating'
export default {
  name: 'ManagementAll',
  data() {
    return {
      scheduleColumns: [
        { title: '库存名称', key: 'stockName' },
        { title: '物料号', key: 'number' },
        { title: '物料名称', key: 'stockName' },
        { title: '缺件数量', key: 'absortNum' },
        { title: '供应商', key: 'supplier' },
        { title: '牌号', key: 'grade' },
        { title: '规格', key: 'norm' },
        { title: '技术条件', key: 'conditions' },
        { title: '需求来源', key: 'demandOrigin' }
      ],
      scheduleData: [],
      options: {
        maxHeight: '480px'
      }
    }
  },
  mounted() {
    this.getManage()
    eventBus.$on('dbclickAO', target => {
      getManage().then(res => {
        console.log(111111111)
        this.scheduleData = res.data.items.standing3
      })
    })
    eventBus.$on('clickgz', target => {
      getManage().then(res => {
        console.log(111111111)
        this.scheduleData = res.data.items.standinggz
      })
    })
    this.$nextTick(() => {
      if (screen.width === 1920) {
        this.options.maxHeight = '480px'
      } else {
        this.options.maxHeight = '180px'
      }
    })
  },
  methods: {
    getManage() {
      getManage().then(res => {
        this.scheduleData = res.data.items.standing3
      })
    }
  }

}
</script>
