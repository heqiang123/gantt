/**
* @Description:
* @author cxg
* @date 2020/04/10
*/
<template>
  <div class="alloca">
    <dee-form :form-data="formData" :form="form" :form-buttons="formButtons" :form-btn-position="formBtnPosition" />
    <dee-table
      :index-row="{title: '序号' }"
      :columns="allocaColumns"
      :data="allocaData"
      :row-calss-state="true"
      :selection-row="selectionRow"
      @select="hanleSelect"
      @select-all="handleSelectAll"
    >
      <features-legend slot="header" :legend-btn="true" :legend="legend" :features-btn="featuresBtn" @handleSelect="handleSelect" />
    </dee-table>
  </div>
</template>

<script>
import featuresLegend from '@/business-components/plan/featuresLegend'
import { getAlloca } from '@/api/mating'
export default {
  name: 'Alloca',
  components: { featuresLegend },
  data() {
    return {
      formData: [
        {
          split: 4,
          data: [
            {
              title: '机型',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '批架次',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '制造架次',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '站位号',
              component: {
                name: 'el-input'
              }
            }
          ]
        },
        {
          split: 4,
          data: [
            {
              title: 'AO编号',
              component: {
                name: 'el-input'
              }
            },
            {
              title: 'AO名称',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '申请日期',
              component: {
                name: 'el-input'
              }
            },
            {
              title: '到',
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      form: {},
      formButtons: [
        {
          text: '查询'
        },
        {
          text: '清空'
        }
      ],
      formBtnPosition: 'center',
      legend: [
        { name: '已申请', style: { background: 'rgb(144,213,151)' }},
        { name: '已分配', style: { background: '#88c8e7' }},
        { name: '已占用', style: { background: '#debc7c' }},
        { name: '已出库', style: { background: 'rgb(224,224,224)' }}
      ],
      allocaColumns: [
        { title: 'AO号', key: 'type' },
        { title: 'AO名称', key: 'name' },
        { title: '版本', key: 'version' },
        { title: '站位', key: 'stand' },
        { title: '计划开始时间', key: 'planStart' },
        { title: '计划结束时间', key: 'planEnd' },
        { title: '要求配套日期', key: 'requireTime' },
        { title: '配送单号', key: 'deliverNum' },
        { title: '要求配送日期', key: 'requireDeliver' },
        { title: '申请日期', key: 'applyTime' },
        { title: '齐套性', key: 'manner' },
        { title: '机型', key: 'model' },
        { title: '批架次', key: 'Batches' },
        { title: '制造架次', key: 'order' },
        { title: '当前状态', key: 'state' }
      ],
      allocaData: [],
      selectionRow: {},
      featuresBtn: [
        { name: '刷新' },
        { name: '分配' },
        { name: '配送出库' }
      ],
      section: []
    }
  },

  computed: {},
  mounted() {
    this.getAlloca()
  },
  methods: {
    getAlloca() {
      getAlloca().then(res => {
        console.log('配套单', res)
        this.allocaData = res.data.items.model
        this.allocaData.forEach((all, index) => {
          switch (index) {
            case 0:
              all.stand = '31'
              break
            case 1:
              all.stand = '41'
              break
            case 2:
              all.stand = '51'
              break
            case 3:
              all.stand = '52'
              break
            case 4:
              all.stand = '53'
              break
            case 5:
              all.stand = '54'
              break
          }
        })
      })
    },

    handleSelect(val) {
      if (val === '分配') {
        if (this.section.length === 0) {
          this.$message.error('请至少选择一项数据')
        } else {
          this.$router.push({
            path: 'allocation'
          })
        }
      } else if (val === '配送出库') {
        if (this.section.length === 0) {
          this.$message.error('请至少选择一项数据')
        } else {
          const ismanner = this.section.filter(sec => {
            return sec.manner !== '齐套'
          })
          if (ismanner.length > 0) {
            this.$message.error('非齐套不可配送出库')
          } else {
            this.$confirm('确认配送出库吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '配送出库成功!'
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消配送出库'
              })
            })
          }
        }
      } else {
        this.getAlloca()
      }
    },

    hanleSelect(section) {
      this.section = section
    },

    handleSelectAll(section) {
      this.section = section
    }

  }
}

</script>
<style lang='scss'>
.alloca {
  height: 100%;
  width: 100%;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 8px;
}
</style>
