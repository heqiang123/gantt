<template>
  <div class="work">
    <div class="work-tools">
      <div v-for="(item, index) in liData" :key="index" class="tools-li" @click="handleChange(item.description)">
        <img :src="item.image" alt="" style="width: 24px;height: 24px">
        <div class="li-box">{{ item.description }}</div>
        <div>总项数: {{ item.total }}</div>
        <div>不满足数: {{ item.dissatisfy }}</div>
      </div>
    </div>
    <div class="work-table">
      <dee-table :columns="operaconcolumns" :data="workData" :options="options" />
    </div>
  </div>
</template>
<script>
import { getOperacondata } from '@/api/mating'
export default {
  name: 'Work',
  data() {
    return {
      options: {
        height: '300px'
      },
      workData: [],
      liData: [
        {
          image: '/icons/o-kunchu.png',
          description: '生产物料',
          total: '68',
          dissatisfy: '23'
        },
        {
          image: '/icons/o-skill.png',
          description: '工具工装',
          total: '25',
          dissatisfy: '4'
        },
        {
          image: '/icons/c-existingpart.png',
          description: '生产设备',
          total: '6',
          dissatisfy: '0'
        }
      ],
      description: '生产物料'
    }
  },
  computed: {
    operaconcolumns() {
      if (this.description === '生产物料') {
        return [
          { title: '库存物料名称', key: 'stockName' },
          { title: '物料名称', key: 'name' },
          { title: '牌号', key: 'grade' },
          { title: '规格', key: 'norm' },
          { title: '技术条件', key: 'conditions' },
          { title: '需求数量', key: 'demandNum' },
          { title: '缺件数量', key: 'lackNum' }
        ]
      } else if (this.description === '工具工装') {
        return [
          { title: '名称', key: 'name' },
          { title: '类型', key: 'type' },
          { title: '需求数量', key: 'demandNum' },
          { title: '可用数量', key: 'useNum' },
          { title: '缺件数量', key: 'lackNum' }
        ]
      } else {
        return [
          { title: '设备名称', key: 'name' },
          { title: '设备编号', key: 'number' },
          { title: '当前状态', key: 'state' },
          { title: '是否可用', key: 'isUse' }
        ]
      }
    }
  },
  mounted() {
    this.getOperacondata()
  },
  methods: {
    handleChange(val) {
      this.description = val
      this.getOperacondata()
    },

    getOperacondata() {
      getOperacondata().then(res => {
        if (this.description === '生产物料') {
          this.workData = res.data.items.items
        } else if (this.description === '工具工装') {
          this.workData = res.data.items.model
        } else {
          this.workData = res.data.items.standing
        }
      })
    }

  }
}
</script>
<style lang="scss">
.work {
  &-tools {
    display: flex;
    .tools-li {
      text-align: center;
      width: calc(100% / 3);
      margin-right: 8px;
      .li-box {
        width: 80px;
        height: 30px;
        margin: 8px auto;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        font-weight: 0;
        border: 1px solid #d9d9d9;
        cursor: pointer;
      }
      >div {
        margin-top: 8px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  &-table {
    margin-top: 8px
  }
}
</style>
