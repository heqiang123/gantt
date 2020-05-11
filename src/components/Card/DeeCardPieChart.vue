<template>
  <div id="chart" style="height: 400px;width: 350px" />
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.$nextTick(function() {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      const that = this
      that.chart2 = this.$echarts.init(document.getElementById('chart'))
      const option = {
        color: ['#4B84DC', '#F65C5C', '#2BC0C2', '#89D64B', '#A379CE', '#E8C95E'],
        title: {
          x: 'center',
          y: 'center',
          text: '效率统计',
          subtext: '{a|新开启:}{b|152}\n{c|76.34%}',
          textStyle: {
            fontSize: 16,
            lineHeight: 25
          },
          subtextStyle: {
            formatter: [
              '{a}',
              '{b}',
              '{c}'
            ],
            rich: {
              a: {
                padding: 3
              },
              b: {
                color: '#2A68C9',
                padding: 3
              },
              c: {
                color: '#2A68C9',
                fontSize: 16
              }
            }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          itemGap: 15,
          orient: 'vertical',
          x: 'right',
          top: 70,
          data: ['新开启', '提交审阅', '待发放', '已发放', '已驳回', '已取消'],
          itemWidth: 10,
          itemHeight: 10
        },
        series: [
          {
            name: '总体发放状态',
            type: 'pie',
            radius: ['40%', '70%'],
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 8, name: '新开启' },
              { value: 1, name: '提交审阅' },
              { value: 2, name: '待发放' },
              { value: 3, name: '已发放' },
              { value: 3, name: '已驳回' },
              { value: 4, name: '已取消' }
            ]
          }
        ]
      }
      that.chart2.setOption(option)
    }
  },
  filter: {}
}
</script>

<style lang="scss">
</style>
