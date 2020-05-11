<template>
  <div class="sorting">
    <dee-tab :tabs="tabs">
      <div slot="0" class="schedule">
        <div class="schedule-charts">
          <dee-tools :tools="complexTools" mode="normal" />
          <div class="charts-bottom">
            <template v-for="(item, index) in chartsData">
              <charts :key="index" :charts-type="item.type" :id-name="item.idName" />
            </template>
          </div>
        </div>
        <div class="schedule-table">
          <dee-tools :tools="tableTools" mode="normal" />
          <dee-table
            :columns="scheduleColumns"
            :index-row="{title: '序号'}"
            :data="scheduleData"
            :options="options"
            :pagination="pagination"
          />
        </div>
      </div>
      <div slot="1" class="quality">
        <div class="quality-charts">
          <dee-tools :tools="complexTools" mode="normal" />
          <div class="charts-bottom">
            <charts :charts-type="'bar'" :id-name="'bar-charts'" />
          </div>
        </div>
        <div class="quality-table">
          <dee-tools :tools="tableTools" mode="normal" />
          <dee-table
            :columns="qualityColumns"
            :data="qualityData"
            :index-row="{title: '序号'}"
            :options="options"
            :pagination="pagination"
          />
        </div>
      </div>
      <div slot="2" class="documentary">
        <div class="documentary-complex">
          <dee-tools :tools="complexTools" mode="normal" />
          <div class="complex-bottom">
            <div class="bottom-middle">
              <div v-for="(item, index) in docmentData.typeData" :key="index" class="middle-type">
                <div class="type-left">
                  <img :src="item.image" alt="">
                  <span>{{ item.name }}</span>
                </div>
                <div class="type-right">
                  <span>{{ item.number }}</span>
                  <span>/</span>
                  <span>100</span>
                </div>
              </div>
            </div>
            <div class="bottom-table">
              <dee-table
                :columns="complexColumns"
                :data="docmentData.stdarding"
                :index-row="{title: '序号'}"
                :options="complexOptions"
                :pagination="pagination"
              />
            </div>
          </div>
        </div>
        <div class="documentary-table">
          <dee-tools :tools="tableTools" mode="normal" />
          <dee-table
            :columns="documentaryColumns"
            :data="docmentData.assembly"
            :index-row="{title: '序号'}"
            :options="options1"
            :pagination="pagination"
          />
        </div>
      </div>
    </dee-tab>
  </div>
</template>
<script>
import charts from '@/business-components/entity/charts'
export default {
  name: 'Sorting',
  components: { charts },
  props: {
    scheduleData: {
      type: Array,
      default: () => {
        return []
      }
    },
    qualityData: {
      type: Array,
      default: () => {
        return []
      }
    },
    docmentData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      tabs: [
        {
          name: '进度',
          id: '0'
        },
        {
          name: '质量控制',
          id: '1'
        },
        {
          name: '纪实统计',
          id: '2'
        }
      ],
      chartsData: [
        {
          type: 'pie',
          idName: 'pie-charts1'
        },
        {
          type: 'pie',
          idName: 'pie-charts2'
        },
        {
          type: 'pie',
          idName: 'pie-charts3'
        }
      ],
      options: {
        height: '396px'
      },
      complexOptions: {
        height: '124px'
      },
      options1: {
        height: '350px'
      },
      pagination: {},
      complexTools: [
        {
          type: 'icon',
          name: '综合',
          icon: '/icons/c-seliver.png'
        }
      ],
      tableTools: [
        {
          type: 'icon',
          name: '明细',
          icon: '/icons/o-doc.png'
        }
      ],
      scheduleColumns: [
        {
          title: '工序号',
          key: 'employeeNum'
        },
        {
          title: '工序名称',
          key: 'employeeName'
        },
        {
          title: '版本',
          key: 'version'
        },
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '进度',
          key: 'process'
        }
      ],
      qualityColumns: [
        {
          title: 'AO',
          key: 'type'
        },
        {
          title: '类型',
          key: 'genre'
        },
        {
          title: '单据编号',
          key: 'docNumber'
        },
        {
          title: '审理结论',
          key: 'conclusion'
        },
        {
          title: '审理状态',
          key: 'status'
        },
        {
          title: '是否关闭',
          key: 'isClose'
        }
      ],
      typeData: [
        { image: '/icons/o-ootb.png', name: '报废', number: 90 },
        { image: '/icons/o-ao.png', name: '代料', number: 90 },
        { image: '/icons/o-reChange.png', name: '成品串换', number: 90 },
        { image: '/icons/c-allreplace.png', name: '零组件串换', number: 90 }
      ],
      complexColumns: [
        { title: 'AO', key: 'type' },
        { title: '物料名称', key: 'name' },
        { title: '数量', key: 'number' },
        { title: '单据编号', key: 'docNumber' },
        { title: '状态', key: 'status' }
      ],
      documentaryColumns: [
        {
          title: '参装件',
          key: 'participat'
        },
        {
          title: '物料类型',
          key: 'material'
        },
        {
          title: '上机件',
          key: 'upper'
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '编号',
          key: 'number'
        }
      ]
    }
  },
  watch: {
    qualityData() {
      this.typeData = [
        { image: '/icons/o-ootb.png', name: '报废', number: 80 },
        { image: '/icons/o-ao.png', name: '代料', number: 80 },
        { image: '/icons/o-reChange.png', name: '成品串换', number: 80 },
        { image: '/icons/c-allreplace.png', name: '零组件串换', number: 80 }
      ]
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style lang="scss">
  .sorting {
   height: calc(100% - 30px);
   .dee-panel {
     height: 100%;
    .el-tabs {
      .el-tabs__content {
        height: calc(100% - 32px)
      }
    }
   }
   .el-scrollbar__view {
     height: 100%
   }
  }
  .schedule {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-charts {
      flex: 1;
      padding-top: 8px;
      box-sizing: border-box;
      border-bottom: 1px solid #d9d9d9;
      .charts-bottom {
        height: calc(100% - 36px);
        width: 100%;
        display: flex
      }
    }
    &-table {
      height: 500px;
      padding-top: 8px;
      box-sizing: border-box;
      /deep/.dee-table {
        margin-top: 8px
      }
    }
  }
  .quality {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-charts {
      flex: 1;
      padding-top: 8px;
      box-sizing: border-box;
      border-bottom: 1px solid #d9d9d9;
      .charts-bottom {
        height: calc(100% - 40px);
        width: 100%;
        display: flex
      }
    }
    &-table {
      height: 500px;
      padding-top: 8px;
      box-sizing: border-box;
      /deep/.dee-table {
        margin-top: 8px
      }
    }
  }
  .documentary {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-complex {
      flex: 1;
      padding-top: 8px;
      box-sizing: border-box;
      border-bottom: 1px solid #d9d9d9;
      .complex-bottom {
        display: flex;
        flex-direction: column;
        .bottom-middle {
          flex: 1;
          height: calc(100% - 120px);
          width: 100%;
          display: flex;
          margin: 8px 0;
          .middle-type {
            display: flex;
            border: 1px solid #d9d9d9;
            width: calc(25% - 6px);
            box-sizing: border-box;
            padding: 8px;
            margin-left: 8px;
            font-size: 14px;
            &:first-child {
              margin-left: 0
            }
            .type-left {
              text-align: center;
              img {
                width: 26px;
              }
              span {
                display: block;
                text-align: center;
                font-weight: bold
              }
            }
            .type-right {
              display: flex;
              flex: 1;
              justify-content: center;
              align-items: center;
              span {
                font-weight: bold;
                color: teal;
                &:nth-child(2) {
                  color: #000000
                }
                &:last-child {
                  color: red
                }
              }
            }
          }
        }
        .bottom-table {
          height: 172px;
        }
      }
    }
    &-table {
      height: 500px;
      padding-top: 8px;
      box-sizing: border-box;
      /deep/.dee-table {
        margin-top: 8px
      }
    }
  }
</style>
