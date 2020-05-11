<template>
  <div class="sort" :class="[idName.indexOf('process-charts') > -1 ? 'sortly' : '']">
    <div v-if="titleName" class="sort-title">
      <span v-if="titleName.indexOf('装配') > -1">{{ titleName }}<i style="color:#2CBADA;margin-left:4px">68</i></span>
      <span v-else>{{ titleName }}<i style="color:#F8C04B;margin-left:4px">33</i></span>
      <span>{{ titleValue }}</span>
    </div>
    <div :id="idName" class="sort-charts" />
  </div>
</template>
<script>
import eventBus from '@/utils/eventBus'
export default {
  name: 'Charts',
  props: {
    chartsType: {
      type: String,
      default: ''
    },
    idName: {
      type: String,
      default: ''
    },
    chartsStatus: {
      type: Boolean,
      default: false
    },
    titleName: {
      type: String,
      default: ''
    },
    titleValue: {
      type: String,
      default: ''
    }
  },
  mounted() {
    // if (this.chartsType === 'pie') {
    //   this.getPieCharts()
    // }
    if (this.chartsStatus) {
      this.getPieOthCharts()
    }
    this.$nextTick(() => {
      if (this.chartsType === 'pie') {
        eventBus.$on('pieData', target => {
          console.log('target', target)
          target.forEach((res, index) => {
            if (index === 1) {
              this.$set(res, 'itemStyle', { color: '#D8D8D8' })
            } else {
              this.$set(res, 'itemStyle', { color: '#6BA8E6' })
            }
          })
          this.getPieCharts(target)
        })
      } else if (this.chartsType === 'process') {
        this.getProcessCharts()
      } else {
        const params = {
          bardata1: [0, 27, 14, 76, 0, 30],
          bardata2: [25, 19, 15, 56, 10, 9],
          bardata3: [26, 18, 0, 66, 20, 10]
        }
        this.getBarCharts(params)
        eventBus.$on('barData', target => {
          this.getBarCharts(target)
        })
      }
    })
  },
  methods: {
    getPieCharts(val) {
      const charts = this.$echarts.init(document.getElementById(this.idName))
      if (this.idName === 'pie-charts1') {
        charts.setOption({
          title: [
            {
              subtext: `任务总数: 100 已完成数: ${val[0].value}`,
              left: '48%',
              top: '83%',
              textAlign: 'center'
            },
            {
              subtext: 'AO',
              left: '48%',
              top: '-2%',
              textAlign: 'center'
            }
          ]
        })
      } else if (this.idName === 'pie-charts2') {
        charts.setOption({
          title: [
            {
              subtext: `任务总数: 100 已完成数: ${val[0].value}`,
              left: '48%',
              top: '83%',
              textAlign: 'center'
            },
            {
              subtext: 'AOR',
              left: '48%',
              top: '-2%',
              textAlign: 'center'
            }
          ]
        })
      } else {
        charts.setOption({
          title: [
            {
              subtext: `任务总数: 100 已完成数: ${val[0].value}`,
              left: '48%',
              top: '83%',
              textAlign: 'center'
            },
            {
              subtext: 'AOI',
              left: '48%',
              top: '-2%',
              textAlign: 'center'
            }
          ]
        })
      }
      charts.setOption({
        tooltip: {
          show: false
        },
        color: ['#4BAE47', 'RGB(153,153,153)'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: val.length > 0 ? val : ['12', '11']
          }
        ]
      })
    },
    getBarCharts(val) {
      const charts = this.$echarts.init(document.getElementById(this.idName))
      charts.setOption({
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              fontSize: '12px'
              // color: '#d9d9d9'
            }
          },
          axisLabel: {
            interval: 0 // 代表显示所有x轴标签显示
          },
          data: ['报废', '不合格(II III)', '问题预审', '代料', '重量超差', '供应商不合格拒收']
        },
        yAxis: {
          type: 'value',
          scale: true,
          max: 100,
          min: 0,
          interval: 25,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        legend: {
          show: true,
          x: 'right',
          y: 'top',
          data: ['已发起', '已完成', '审理中']
        },
        color: ['rgb(56,161,255)', 'rgb(39,212,125)', 'rgb(243,139,0)'],
        series: [
          {
            name: '已发起',
            barWidth: 20,
            data: val.bardata1,
            type: 'bar'
          },
          {
            name: '已完成',
            stack: '已完成',
            barWidth: 20,
            data: val.bardata2 || [25, 19, 15, 56, 10, 9],
            type: 'bar'
          },
          {
            name: '审理中',
            stack: '已完成',
            barWidth: 20,
            data: val.bardata3 || [26, 18, 0, 66, 20, 10],
            type: 'bar'
          }
        ]
      })
    },
    getProcessCharts() {
      const charts = this.$echarts.init(document.getElementById(this.idName))
      let g_cellBar0_y = ''
      // let name = []
      // let value = []
      let dataLine = []
      if (this.idName === 'process-charts1') {
        g_cellBar0_y = '/icons/dianchi2.png'
        dataLine = [44]
      } else {
        g_cellBar0_y = '/icons/dianchi1.png'
        dataLine = [12]
      }

      var g_cellBarImg0_y = new Image()
      g_cellBarImg0_y.src = g_cellBar0_y

      var positionLeft = 0
      // var max = 100 + positionLeft
      charts.setOption({
        grid: [{
          left: '8%',
          top: '12%',
          right: '5%',
          bottom: '8%',
          containLabel: true
        },
        {
          left: '10%',
          top: '12%',
          right: '5%',
          bottom: '8%',
          containLabel: true
        }
        ],
        xAxis: [{
          //   max:max,
          show: false
        }],
        yAxis: [{
          axisTick: 'none',
          axisLine: 'none',
          axisLabel: {
            inside: true,
            align: 'left',
            textStyle: {
              color: '#81E7ED',
              fontSize: '16'
            }
          },
          z: 10,
          data: []
        }, {
          axisTick: 'none',
          axisLine: 'none',
          show: false,
          axisLabel: {
            inside: true,
            align: 'right',
            textStyle: {
              color: '#ffffff',
              fontSize: '16'
            }
          },
          z: 10,
          data: [44]
        }, {

          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },
          data: []
        }],
        series: [

          { // 间距
            type: 'bar',
            barWidth: 30,
            stack: 'b',
            legendHoverLink: false,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)'
              }
            },
            z: 3,
            data: [positionLeft]
          }, {
            name: '条',
            type: 'bar',
            stack: 'b',
            yAxisIndex: 0,
            data: dataLine,
            label: {
              normal: {
                show: false,
                position: 'right',
                distance: 10,
                formatter: function(param) {
                  return param.value + '%'
                },
                textStyle: {
                  color: '#ffffff',
                  fontSize: '16'
                }
              }
            },
            barWidth: 30,
            itemStyle: {
              color: {
                image: g_cellBarImg0_y,
                repeat: 'repeat'
              }
              /* normal: {
                     color: function(params) {
                         var num = myColor.length
                         return myColor[params.dataIndex % num]
                     }
                 }*/
            },
            z: 2
          },
          {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [99.8],
            barWidth: 77,
            itemStyle: {
              normal: {
                color: '#163840',
                barBorderRadius: 2
              }
            },
            z: 1
          }
        ]
      })
    },
    getPieOthCharts() {
      const charts = this.$echarts.init(document.getElementById(this.idName))
      if (this.idName === 'pie-charts4') {
        charts.setOption({
          title: [
            {
              subtext: `已派工`,
              left: '48%',
              top: '80%',
              textAlign: 'center'
            },
            {
              subtext: '已派工数量：106',
              left: '48%',
              top: '-2%',
              textAlign: 'center'
            }
          ],
          color: ['rgba(247,136,55,1)', '#163840']
        })
      } else {
        charts.setOption({
          title: [
            {
              subtext: `已完工`,
              left: '48%',
              top: '80%',
              textAlign: 'center'
            },
            {
              subtext: '已完工数量：69',
              left: '48%',
              top: '-2%',
              textAlign: 'center'
            }
          ],
          color: ['rgba(51,203,219,1)', '#163840']
        })
      }
      charts.setOption({
        tooltip: {
          show: false
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: ['11', '12']
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss">
.sort {
  height: 100%;
  width: 100%;
  .sort-charts {
    height: 100%;
    width: 100%;
  }
  .sort-title {
    padding: 0 25px;
    width: 100%;
    display: flex;
    color: #ffffff;
    justify-content: space-between;
  }
}
.sortly {
  height: 50%;
  width: 100%;
  .sort-charts {
    height: 100%;
    width: 100%;
  }
}
</style>
