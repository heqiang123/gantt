<template>
  <structure-tree :is-pulate="true" :legend="true" :tree-data="treeData" @node-click="handleClick">
    <div slot="manipulate" class="manipulate">
      <div class="manipulate-title">
        <span>BBOM</span>
      </div>
      <div class="manipulate-search">
        <dee-form
          :form-data="formData"
          :form="form"
          label-width="46px"
        />
        <el-button size="mini" type="primary">查询</el-button>
      </div>
    </div>
    <div slot="cMain" class="cMain">
      <div class="cMain-title">
        <img src="/icons/o-product.png" alt="">
        {{ title }}
      </div>
      <sorting :schedule-data="scheduleData" :quality-data="qualityData" :docment-data="docmentData" />
    </div>
  </structure-tree>
</template>
<script>
import structureTree from '@/business-components/plan/structureTree'
import sorting from '../components/sorting'
import { getPieData, getBarData, getDocumentary } from '@/api/entity'
import { getTree } from '@/api/tree'
import eventBus from '@/utils/eventBus'
export default {
  name: 'Sorting',
  components: { structureTree, sorting },
  data() {
    return {
      scheduleData: [],
      qualityData: [],
      docmentData: {},
      treeData: [],
      title: 'BBOM-AG600-001',
      formData: [
        {
          split: 1,
          data: [
            {
              title: '编号',
              key: 'number',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      form: {
        number: ''
      }
    }
  },
  mounted() {
    this.getPartTree('AG600')
    this.getPieData()
    this.getBarData()
    this.getDocumentary()
  },
  methods: {
    getPartTree(data) {
      getTree(data).then(res => {
        this.treeData = res.data
      })
    },

    handleClick(data, node, event) {
      this.title = data.label
      this.getPieData()
      this.getBarData()
      this.getDocumentary()
    },

    getPieData() {
      getPieData().then(res => {
        this.scheduleData = res.data.sortData.items
        eventBus.$emit('pieData', res.data.pieData)
      })
    },

    getBarData() {
      getBarData().then(res => {
        this.qualityData = res.data.bardata.model
        eventBus.$emit('barData', res.data.barschdata)
      })
    },

    getDocumentary() {
      getDocumentary().then(res => {
        this.docmentData = res.data
      })
    }

  }
}
</script>
<style lang="scss">
.manipulate {
  width: 100%;
  display: flex;
  justify-content: space-between;
  &-title {
    font-weight: bold
  }
  &-search {
    display: flex;
    align-items: center;
    .el-form-item {
      margin-bottom: 0!important;
    }
    .el-form-item__label {
      line-height: 28px;
    }
    .el-input__inner {
      height: 28px;
      line-height: 28px;
    }
  }
}
.cMain {
  height: 100%;
  &-title {
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;
    img {
      width: 18px;
      margin-right: 8px
    }
  }
}
</style>
