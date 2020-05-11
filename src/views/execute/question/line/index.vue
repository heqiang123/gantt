<template>
  <div class="line">
    <div class="line-infomation">
      <div class="infomation-title">
        <span>AO信息</span>
      </div>
      <div class="infomation-change">
        <div v-for="(item, index) in AoData" :key="index" class="change-AO">
          <div class="AO-box">
            <span v-if="index === 1" style="color:#3ce6ff">{{ item.num }}</span>
            <span v-else-if="index === 2" style="color:red">{{ item.num }}</span>
            <span v-else>{{ item.num }}</span>
            <span v-if="index === 2">/</span>
            <span v-if="index === 2" style="color:#f9ba48">{{ item.number }}</span>
          </div>
          <div class="AO-bottom">
            <span v-if="index === 1" style="color:#3ce6ff">{{ item.name }}</span>
            <span v-else-if="index === 2" style="color:red">{{ item.name }}</span>
            <span v-else style="color:#ffffff">{{ item.name }}</span>
          </div>
        </div>
        <!-- <div class="change-value">
          <div class="value-box">
            <span>已完成数量</span>
            <span>65</span>
          </div>
        </div> -->
      </div>

      <div class="support-title">
        <span>配套信息</span>
      </div>
      <div class="support-echarts">
        <div class="charts-process">
          <span>在装配不齐套</span>
          <span>{{ support.num }}%</span>
        </div>
        <el-progress :text-inside="false" :percentage="support.num" :stroke-width="10" />
        <div class="charts-process" style="margin-top:10px">
          <span>已下达不齐套</span>
          <span>{{ support.number }}%</span>
        </div>
        <el-progress class="orange" :text-inside="false" :percentage="support.number" :stroke-width="10" />
        <!-- <template v-for="(item, index) in chartsData">
          <charts :key="index" :charts-type="item.type" :id-name="item.idName" :title-name="item.titleName" :title-value="item.titleValue" />
        </template> -->
      </div>

      <div class="quality-title">
        <span>质量信息</span>
      </div>
      <div class="quality-number">
        <div class="number-left">
          <span class="poit-lefttop" />
          <span class="poit-righttop" />
          <span class="poit-leftbottom" />
          <span class="poit-rightbottom" />
          <div class="left-top">
            <span style="color:#ffffff">{{ quality.num }}</span>
            <span style="margin:0 6px">/</span>
            <span>{{ quality.number }}</span>
          </div>
          <div class="left-bottom">
            <span> 质量问题数量</span>
          </div>
        </div>
        <div class="number-right">
          <span class="poit-lefttop" />
          <span class="poit-righttop" />
          <span class="poit-leftbottom" />
          <span class="poit-rightbottom" />
          <div class="right-top">
            <span style="color:#ffffff">{{ quality.num1 }}</span>
            <span style="margin:0 6px">/</span>
            <span>{{ quality.number1 }}</span>
          </div>
          <div class="right-bottom">
            <span> 工程更改数量</span>
          </div>
        </div>
      </div>

      <div class="abnormal-title">
        <span>异常信息</span>
      </div>
      <div class="abnormal-content">
        <div v-for="(item, index) in abnormalData" :key="index" class="content-box">
          <span>{{ item.name }}</span>
          <span>{{ item.value }}</span>
          <span class="poit-lefttop" />
          <span class="poit-righttop" />
          <span class="poit-leftbottom" />
          <span class="poit-rightbottom" />
        </div>
      </div>

      <div class="dispatch-title">
        <span>派工信息</span>
      </div>
      <div class="dispatch-charts">
        <div class="charts-circle">
          <div style="text-align:center;position:relative">
            <div class="circle-title" style="margin-bottom:10px;color:#30DFFF;">已派工数量：{{ dispatch.num }}</div>
            <el-progress color="rgba(254,200,97,1)" class="orange" type="circle" :percentage="dispatch.numPercent" :stroke-width="20" />
            <div style="margin-top:10px;">已派工</div>
          </div>

        </div>
        <div class="charts-circle">
          <div style="text-align:center">
            <div class="circle-title" style="margin-bottom:10px;color:#30DFFF">已完工数量：{{ dispatch.number }}</div>
            <el-progress type="circle" :percentage="dispatch.numberPercent" :stroke-width="20" />
            <div style="margin-top:10px">已完工</div>
          </div>

        </div>
        <!-- <template v-for="(item, index) in chartsPieData">
          <charts :key="index" :charts-type="item.type" :id-name="item.idName" :charts-status="true" />
        </template> -->
      </div>
    </div>

    <div class="line-sort">
      <div v-for="(item, index) in sortData" :key="index" class="sort-btn" :class="[activeIndex === index ? 'active' : '']" @click="handleSelect(item.num, index)">
        <div style="text-align:center">
          <img src="/icons/btn-feiji.png" alt="">
          <span>{{ item.num }}</span>
        </div>
      </div>
    </div>

    <div class="line-pane">
      <div class="pane-title">
        <span>总装产线-</span>
        <span>可视化看板</span>
      </div>
      <div class="pane-status">
        <span v-for="(item, index) in statusData" :key="index">{{ item.name }}</span>
      </div>
      <div class="pane-process">
        <span>顶罩内设备装备安装中</span>
      </div>
    </div>

    <div v-if="isShowDetail" class="line-details">
      <div class="details-left">
        <div class="left-top">
          <span>
            {{ details.stand }}
          </span>
        </div>
        <div class="left-line" />
        <div class="left-bottom">
          <div class="bottom-text">生产准备：<span>已完成</span></div>
          <div class="bottom-text">时间：<span>{{ details.start }}</span></div>
          <div class="bottom-text">完结：<span>{{ details.end }}</span></div>

        </div>
      </div>
      <div class="details-right">
        <div class="right-top">
          <span>现场缩略图</span>
        </div>
        <div class="right-line" />
        <div class="right-bottom">
          <img src="/icons/airactive.png" style="width:150px" alt="">
        </div>
      </div>
    </div>

    <div class="line-air">
      <div v-for="(item, index) in airData" :key="index">
        <span :style="item.spanStyle" :class="[index === airactive ? 'air-active' : '']">{{ item.stand }}</span>
        <img class="air-stand" :style="item.style" :src="item.image" alt="" @click="handleHover(item.image)">
      </div>

    </div>
  </div>
</template>
<script>
import charts from '@/business-components/entity/charts'
export default {
  name: 'Line',
  components: { charts },
  data() {
    return {
      isShowDetail: true,
      airactive: 5,
      details: {
        stand: '54',
        start: '2020/5/9',
        end: '2020/5/12'
      },
      AoData: [
        { name: 'AO总数', num: '90' },
        { name: '已完成总数', num: '65' },
        { name: '未完成总数', num: '15', number: '10' }
      ],
      support: {
        num: 44,
        number: 12
      },
      sortData: [
        {
          num: '001'
        },
        {
          num: '002'
        },
        {
          num: '003'
        },
        {
          num: '004'
        },
        {
          num: '005'
        }
      ],
      dispatch: {
        num: 106,
        numPercent: 60,
        number: 69,
        numberPercent: 25
      },
      chartsData: [
        {
          type: 'process',
          idName: 'process-charts1',
          titleName: '在装配不齐套',
          titleValue: '44%'
        },
        {
          type: 'process',
          idName: 'process-charts2',
          titleName: '已下达不齐套',
          titleValue: '12%'
        }
      ],
      chartsPieData: [
        {
          type: 'pie',
          idName: 'pie-charts4'
        },
        {
          type: 'pie',
          idName: 'pie-charts5'
        }
      ],
      quality: {
        num: 25,
        number: 15,
        num1: 12,
        number1: 14
      },
      abnormalData: [
        {
          name: '问题总数',
          value: '224'
        },
        {
          name: '待解决数量',
          value: '7'
        }
      ],
      statusData: [
        {
          name: '001'
        },
        {
          name: '54站台'
        },
        {
          name: '已进站'
        }
      ],
      airData: [
        {
          image: '/icons/standnum.png',
          stand: '31',
          spanStyle: {
            left: '960px',
            bottom: '309px'
          },
          style: {
            left: '1060px',
            bottom: '258px',
            width: '310px'
          }
        },
        {
          image: '/icons/standnum.png',
          stand: '41',
          spanStyle: {
            left: '722px',
            bottom: '216px'
          },
          style: {
            left: '728px',
            bottom: '149px',
            width: '330px'
          }
        },
        {
          image: '/icons/standnum.png',
          stand: '51',
          spanStyle: {
            left: '416px',
            bottom: '284px'
          },
          style: {
            left: '474px',
            bottom: '244px',
            width: '300px'
          }
        },
        {
          image: '/icons/standnum.png',
          stand: '52',
          spanStyle: {
            left: '56px',
            bottom: '186px'
          },
          style: {
            left: '160px',
            bottom: '177px',
            width: '300px'
          }
        },
        {
          image: '/icons/standnum.png',
          stand: '53',
          spanStyle: {
            left: '298px',
            bottom: '84px'
          },
          style: {
            left: '400px',
            bottom: '70px',
            width: '430px'
          }
        },
        {
          image: '/icons/select.png',
          stand: '54',
          spanStyle: {
            left: '852px',
            bottom: '17px'
          },
          style: {
            left: '964px',
            bottom: '-10px',
            width: '410px'
          }
        }
      ],
      activeIndex: 0
    }
  },
  methods: {
    handleSelect(num, index) {
      this.activeIndex = index
      this.isShowDetail = false
      if (num === '001') {
        this.airactive = 5
        this.statusData[0].name = '001'
        this.statusData[1].name = '54站台'
        this.details.stand = '54站台'
        this.details.start = '2020/6/25'
        this.details.end = '2020/6/27'
        this.AoData = [
          { name: 'AO总数', num: '90' },
          { name: '已完成总数', num: '65' },
          { name: '未完成总数', num: '15', number: '10' }
        ]
        this.support.num = 44
        this.support.number = 12
        this.abnormalData = [
          {
            name: '问题总数',
            value: '224'
          },
          {
            name: '待解决数量',
            value: '7'
          }
        ]
        this.quality = {
          num: 25,
          number: 15,
          num1: 12,
          number1: 14
        }
        this.dispatch = {
          num: 106,
          numPercent: 60,
          number: 69,
          numberPercent: 25
        }
        this.airData = [
          {
            image: '/icons/standnum.png',
            stand: '31',
            spanStyle: {
              left: '960px',
              bottom: '309px'
            },
            style: {
              left: '1060px',
              bottom: '258px',
              width: '310px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '41',
            spanStyle: {
              left: '722px',
              bottom: '216px'
            },
            style: {
              left: '728px',
              bottom: '149px',
              width: '330px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '51',
            spanStyle: {
              left: '416px',
              bottom: '284px'
            },
            style: {
              left: '474px',
              bottom: '244px',
              width: '300px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '52',
            spanStyle: {
              left: '56px',
              bottom: '186px'
            },
            style: {
              left: '160px',
              bottom: '177px',
              width: '300px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '53',
            spanStyle: {
              left: '298px',
              bottom: '84px'
            },
            style: {
              left: '400px',
              bottom: '70px',
              width: '430px'
            }
          },
          {
            image: '/icons/select.png',
            stand: '54',
            spanStyle: {
              left: '852px',
              bottom: '17px'
            },
            style: {
              left: '964px',
              bottom: '-10px',
              width: '410px'
            }
          }
        ]
      } else if (num === '002') {
        this.airactive = 4
        this.statusData[0].name = '002'
        this.statusData[1].name = '53站台'
        this.details.stand = '53站台'
        this.details.start = '2020/5/25'
        this.details.end = '2020/5/27'
        this.AoData = [
          { name: 'AO总数', num: '80' },
          { name: '已完成总数', num: '55' },
          { name: '未完成总数', num: '15', number: '20' }
        ]
        this.support.num = 60
        this.support.number = 40
        this.abnormalData = [
          {
            name: '问题总数',
            value: '200'
          },
          {
            name: '待解决数量',
            value: '10'
          }
        ]
        this.quality = {
          num: 35,
          number: 25,
          num1: 22,
          number1: 28
        }
        this.dispatch = {
          num: 95,
          numPercent: 40,
          number: 82,
          numberPercent: 45
        }
        this.airData = [
          {
            image: '/icons/standnum.png',
            stand: '31',
            spanStyle: {
              left: '960px',
              bottom: '309px'
            },
            style: {
              left: '1060px',
              bottom: '258px',
              width: '310px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '41',
            spanStyle: {
              left: '722px',
              bottom: '216px'
            },
            style: {
              left: '728px',
              bottom: '149px',
              width: '330px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '51',
            spanStyle: {
              left: '416px',
              bottom: '284px'
            },
            style: {
              left: '474px',
              bottom: '244px',
              width: '300px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '52',
            spanStyle: {
              left: '56px',
              bottom: '186px'
            },
            style: {
              left: '160px',
              bottom: '177px',
              width: '300px'
            }
          },
          {
            image: '/icons/select.png',
            stand: '53',
            spanStyle: {
              left: '298px',
              bottom: '84px'
            },
            style: {
              left: '400px',
              bottom: '70px',
              width: '430px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '54',
            spanStyle: {
              left: '852px',
              bottom: '17px'
            },
            style: {
              left: '964px',
              bottom: '-10px',
              width: '410px'
            }
          }
        ]
      } else if (num === '003') {
        this.airactive = 3
        this.statusData[0].name = '003'
        this.statusData[1].name = '52站台'
        this.details.stand = '52站台'
        this.details.start = '2020/5/15'
        this.details.end = '2020/5/20'
        this.AoData = [
          { name: 'AO总数', num: '85' },
          { name: '已完成总数', num: '50' },
          { name: '未完成总数', num: '10', number: '25' }
        ]
        this.support.num = 80
        this.support.number = 20
        this.abnormalData = [
          {
            name: '问题总数',
            value: '190'
          },
          {
            name: '待解决数量',
            value: '17'
          }
        ]
        this.quality = {
          num: 55,
          number: 35,
          num1: 24,
          number1: 38
        }
        this.dispatch = {
          num: 120,
          numPercent: 70,
          number: 33,
          numberPercent: 15
        }
        this.airData = [
          {
            image: '/icons/standnum.png',
            stand: '31',
            spanStyle: {
              left: '960px',
              bottom: '309px'
            },
            style: {
              left: '1060px',
              bottom: '258px',
              width: '310px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '41',
            spanStyle: {
              left: '722px',
              bottom: '216px'
            },
            style: {
              left: '728px',
              bottom: '149px',
              width: '330px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '51',
            spanStyle: {
              left: '416px',
              bottom: '284px'
            },
            style: {
              left: '474px',
              bottom: '244px',
              width: '300px'
            }
          },
          {
            image: '/icons/select.png',
            stand: '52',
            spanStyle: {
              left: '56px',
              bottom: '186px'
            },
            style: {
              left: '160px',
              bottom: '177px',
              width: '300px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '53',
            spanStyle: {
              left: '298px',
              bottom: '84px'
            },
            style: {
              left: '400px',
              bottom: '70px',
              width: '430px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '54',
            spanStyle: {
              left: '852px',
              bottom: '17px'
            },
            style: {
              left: '964px',
              bottom: '-10px',
              width: '410px'
            }
          }
        ]
      } else if (num === '004') {
        this.airactive = 0
        this.statusData[0].name = '004'
        this.statusData[1].name = '31站台'
        this.details.stand = '31站台'
        this.details.start = '2020/5/20'
        this.details.end = '2020/5/29'
        this.AoData = [
          { name: 'AO总数', num: '75' },
          { name: '已完成总数', num: '30' },
          { name: '未完成总数', num: '20', number: '25' }
        ]
        this.support.num = 90
        this.support.number = 60
        this.abnormalData = [
          {
            name: '问题总数',
            value: '280'
          },
          {
            name: '待解决数量',
            value: '20'
          }
        ]
        this.quality = {
          num: 135,
          number: 105,
          num1: 42,
          number1: 38
        }
        this.dispatch = {
          num: 116,
          numPercent: 58,
          number: 92,
          numberPercent: 75
        }
        this.airData = [
          {
            image: '/icons/select.png',
            stand: '31',
            spanStyle: {
              left: '960px',
              bottom: '309px'
            },
            style: {
              left: '1060px',
              bottom: '258px',
              width: '310px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '41',
            spanStyle: {
              left: '722px',
              bottom: '216px'
            },
            style: {
              left: '728px',
              bottom: '149px',
              width: '330px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '51',
            spanStyle: {
              left: '416px',
              bottom: '284px'
            },
            style: {
              left: '474px',
              bottom: '244px',
              width: '300px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '52',
            spanStyle: {
              left: '56px',
              bottom: '186px'
            },
            style: {
              left: '160px',
              bottom: '177px',
              width: '300px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '53',
            spanStyle: {
              left: '298px',
              bottom: '84px'
            },
            style: {
              left: '400px',
              bottom: '70px',
              width: '430px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '54',
            spanStyle: {
              left: '852px',
              bottom: '17px'
            },
            style: {
              left: '964px',
              bottom: '-10px',
              width: '410px'
            }
          }
        ]
      } else {
        this.airactive = 1
        this.statusData[0].name = '005'
        this.statusData[1].name = '41站台'
        this.details.stand = '41站台'
        this.details.start = '2020/7/25'
        this.details.end = '2020/7/27'
        this.AoData = [
          { name: 'AO总数', num: '60' },
          { name: '已完成总数', num: '40' },
          { name: '未完成总数', num: '10', number: '10' }
        ]
        this.support.num = 50
        this.support.number = 10
        this.abnormalData = [
          {
            name: '问题总数',
            value: '174'
          },
          {
            name: '待解决数量',
            value: '3'
          }
        ]
        this.quality = {
          num: 55,
          number: 45,
          num1: 52,
          number1: 44
        }
        this.dispatch = {
          num: 126,
          numPercent: 80,
          number: 59,
          numberPercent: 37
        }
        this.airData = [
          {
            image: '/icons/standnum.png',
            stand: '31',
            spanStyle: {
              left: '960px',
              bottom: '309px'
            },
            style: {
              left: '1060px',
              bottom: '258px',
              width: '310px'
            }
          },
          {
            image: '/icons/select.png',
            stand: '41',
            spanStyle: {
              left: '722px',
              bottom: '216px'
            },
            style: {
              left: '728px',
              bottom: '149px',
              width: '330px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '51',
            spanStyle: {
              left: '416px',
              bottom: '284px'
            },
            style: {
              left: '474px',
              bottom: '244px',
              width: '300px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '52',
            spanStyle: {
              left: '56px',
              bottom: '186px'
            },
            style: {
              left: '160px',
              bottom: '177px',
              width: '300px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '53',
            spanStyle: {
              left: '298px',
              bottom: '84px'
            },
            style: {
              left: '400px',
              bottom: '70px',
              width: '430px'
            }
          },
          {
            image: '/icons/standnum.png',
            stand: '54',
            spanStyle: {
              left: '852px',
              bottom: '17px'
            },
            style: {
              left: '964px',
              bottom: '-10px',
              width: '410px'
            }
          }
        ]
      }
    },
    handleHover(hover) {
      if (hover.indexOf('select') > -1) {
        this.isShowDetail = true
      } else {
        this.isShowDetail = false
      }
    }
  }
}
</script>
<style lang="scss">
  .line {
    width: 100%;
    height: 100%;
    position: relative;
    background: url('/image/line-background.png') no-repeat;
    background-size: 100% 100%;
    // overflow-y: scroll;
    .line-infomation {
      padding: 48px 40px 44px 40px;
      width: 492px;
      height: 100%;
      position: absolute;
      right: 0;
      .infomation-title {
        span:first-child {
          color:rgba(255,255,255,1);
          opacity:0.8;
          font-size:18px;
          font-weight:400;
        }
        // span:last-child {
        //   margin-left: 4px;
        //   color:rgba(255,255,255,1);
        //   font-size:14px;
        //   font-weight:400;
        //   opacity:0.4;
        // }
      }
      .infomation-change {
        // margin-top: 20px;
        margin-left: 20px;
        display: flex;
        .change-AO {
          color:rgba(255,255,255,1);
          width: calc(100% / 3 - 10);
          margin: 0 20px;
          // opacity: 0.8;
          .AO-box {
            width: 100%;
            height: 52px;
            line-height: 52px;
            text-align: center;
            font-size: 30px;
          }
          .AO-bottom {
            width: 100%;
            text-align: center;
            font-size: 16px;
          }
        }
        // .change-AO {
        //   width:138px;
        //   height:125px;
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        //   border:2px solid rgba(123,222,255,1);
        //   // opacity:0.24;
        //   border-radius:6px;
        //   .AO-box {
        //     width:123px;
        //     height:114px;
        //     padding: 20px;
        //     display: flex;
        //     flex-direction: column;
        //     justify-content: space-between;
        //     background:rgba(29,154,242,0.42);
        //     border:2px solid rgba(123,222,255,1);
        //     // opacity:0.32;
        //     border-radius:4px;
        //     span:first-child {
        //       font-size:20px;
        //       font-weight:400;
        //       color:rgba(255,255,255,1);
        //     }
        //     span:last-child {
        //       font-size:34px;
        //       font-weight:400;
        //       color:rgba(255,255,255,1);
        //     }
        //   }
        // }
        .change-value {
          margin-left: 57px;
          width:138px;
          height:125px;
          display: flex;
          align-items: center;
          justify-content: center;
          border:2px solid rgba(123,222,255,1);
          // opacity:0.38;
          border-radius:6px;
          .value-box {
            width:123px;
            height:114px;
            border:3px solid rgba(1,190,255,1);
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background:linear-gradient(0deg,rgba(29,161,243,1) 0%,rgba(60,233,248,1) 100%);
            border-radius:4px;
            span:first-child {
              font-size:20px;
              font-weight:400;
              color:rgba(0,0,0,1);
            }
            span:last-child {
              font-size:34px;
              font-weight:400;
              color:rgba(0,0,0,1);
            }
          }
        }
      }

      .support-title {
        margin-top: 33px;
        span:first-child {
          color:rgba(255,255,255,1);
          opacity:0.8;
          font-size:18px;
          font-weight:400;
        }
        // span:last-child {
        //   margin-left: 4px;
        //   color:rgba(255,255,255,1);
        //   font-size:14px;
        //   font-weight:400;
        //   opacity:0.4;
        // }
      }
      .support-echarts {
        margin-top: 10px;
        margin-left: 15px;
        width: 100%;
        // height: 100px;
        .el-progress-bar__outer {
          background:rgba(22,56,64,1);
        }
        .el-progress-bar__inner {
          border-radius: 0;
        }
        .el-progress__text {
          display: none!important
        }
        .el-progress-bar__outer {
          border-radius: 0;
        }
        .orange {
          .el-progress-bar__inner {
          background-color: #f9ba48;
        }
        }

        .charts-process {
          // opacity: 0.8;
          color: #ffffff;
          width: 100%;
          padding-right: 50px;
          display: flex;
          justify-content: space-between;
        }
      }

      .quality-title {
        margin-top: 30px;
        span:first-child {
          color:rgba(255,255,255,1);
          opacity:0.8;
          font-size:18px;
          font-weight:400;
        }
        // span:last-child {
        //   margin-left: 4px;
        //   color:rgba(255,255,255,1);
        //   font-size:14px;
        //   font-weight:400;
        //   opacity:0.4;
        // }
      }
      .quality-number {
        margin-left: 26px;
        margin-top: 10px;
        // opacity: 0.8;
        display: flex;
        .number-left {
          position: relative;
          width:148px;
          height:78px;
          border:1px solid rgba(58,202,255,0.5);
          display: flex;
          flex-direction: column;
          .poit-lefttop {
            position: absolute;
            left: -2px;
            top: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:rgba(58,202,255,1);
          }
          .poit-righttop {
            position: absolute;
            right: -2px;
            top: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:rgba(58,202,255,1);
          }
          .poit-leftbottom {
            position: absolute;
            left: -2px;
            bottom: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:rgba(58,202,255,1);
          }
          .poit-rightbottom {
            position: absolute;
            right: -2px;
            bottom: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:rgba(58,202,255,1);
          }
          .left-top {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size:30px;
            font-weight:400;
            color:rgba(60,230,255,1);
          }
          .left-bottom {
            font-weight:400;
            color:rgba(255,255,255,1);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height:28px;
            background:rgba(0,157,196,0.57);
            border:1px solid rgba(58,202,255,1);
          }
        }
        .number-right {
          position: relative;
          margin-left: 35px;
          width:148px;
          height:78px;
          border:1px solid rgba(248,192,75,0.5);
          display: flex;
          flex-direction: column;
          .poit-lefttop {
            position: absolute;
            left: -2px;
            top: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:#F9BA48;
          }
          .poit-righttop {
            position: absolute;
            right: -2px;
            top: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:#F9BA48;
          }
          .poit-leftbottom {
            position: absolute;
            left: -2px;
            bottom: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:#F9BA48;
          }
          .poit-rightbottom {
            position: absolute;
            right: -2px;
            bottom: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:#F9BA48;
          }
          .right-top {
            font-size:30px;
            font-weight:400;
            color:rgba(249,186,72,1);
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .right-bottom {
            font-size:16px;
            font-weight:400;
            color:rgba(255,255,255,1);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height:28px;
            background:rgba(248,192,75,0.5);
            border:1px solid rgba(248,192,75,0.5);
          }
        }
      }

      .abnormal-title {
        margin-top: 33px;
        span:first-child {
          color:rgba(255,255,255,1);
          opacity:0.8;
          font-size:18px;
          font-weight:400;
        }
        // span:last-child {
        //   margin-left: 4px;
        //   color:rgba(255,255,255,1);
        //   font-size:14px;
        //   font-weight:400;
        //   opacity:0.4;
        // }
      }
      .abnormal-content {
        margin-top: 10px;
        margin-left: 19px;
        .content-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 38px 0 19px;
          width:341px;
          height:46px;
          background:rgba(53,147,231,0.1);
          border:1px solid rgba(58,202,255,0.5);
          // opacity:0.8;
          margin-bottom: 10px;
          .poit-lefttop {
            position: absolute;
            left: -2px;
            top: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:rgba(58,202,255,1);
          }
          .poit-righttop {
            position: absolute;
            right: -2px;
            top: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:rgba(58,202,255,1);
          }
          .poit-leftbottom {
            position: absolute;
            left: -2px;
            bottom: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:rgba(58,202,255,1);
          }
          .poit-rightbottom {
            position: absolute;
            right: -2px;
            bottom: -2px;
            display: inline-block;
            width:4px;
            height:4px;
            background:rgba(58,202,255,1);
          }
          span:first-child {
            font-size:18px;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
          span:nth-child(2) {
            font-size:30px;
            font-weight:400;
            color:rgba(60,230,255,1);
          }
        }
      }

      .dispatch-title {
        margin-top: 33px;
        span:first-child {
          color:rgba(255,255,255,1);
          opacity:0.8;
          font-size:18px;
          font-weight:400;
        }
        // span:last-child {
        //   margin-left: 4px;
        //   color:rgba(255,255,255,1);
        //   font-size:14px;
        //   font-weight:400;
        //   opacity:0.4;
        // }
      }
      .dispatch-charts {
        display: flex;
        margin-top: 10px;
        width: 100%;
        height: 200px;

        .charts-circle {
          color: #ffffff;
          width: 50%;
          display: flex;
          // opacity: 0.8;
          align-items: center;
          justify-content: center;
          .circle-title {
            width:152px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            background:linear-gradient(180deg,rgba(4,28,45,1) 0%);
          }
          .el-icon-warning:before {
            display: none
          }
          .el-progress__text {
              font-size: 24px!important;
              color: #30DFFF
            }
          .el-progress /deep/ path:first-child {
            stroke: rgba(22,56,64,1);
          }
          .el-progress /deep/ path:nth-child(2) {
            stroke-linecap: square;
          }
          .orange {
            .el-progress__text {
              color: #f9ba48
            }
          }

        }
      }
    }
    .line-sort {
      position: absolute;
      right: 509px;
      top: 53px;
      display: flex;
      .sort-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 11px;
        width:86px;
        height:86px;
        // background:#F2FCFF;
        background: rgba(29,154,242,0.42);
        // opacity:0.11;
        border-radius:50%;
        cursor: pointer;
        span {
          display: block;
          font-size: 27px;
          // color:rgba(255,255,255,1);
          // opacity:0.35;
          // font-weight:400;
          // color:rgb(255,255,255);
        }
        // width:86px;
        // height:86px;
        // border:1px solid rgba(255,212,122,1);
        // background:linear-gradient(0deg,rgba(252,144,48,1) 0%,rgba(247,202,80,1) 100%);
        // border-radius:50%;
      }
      .active {
        background:linear-gradient(0deg,rgba(252,144,48,1) 0%,rgba(247,202,80,1) 100%);
        color:rgba(255,255,255,1);
      }
    }
    .line-pane {
      position: absolute;
      top: 108px;
      left: 109px;
      .pane-title {
        span:first-child {
          font-size:38px;
          font-weight:400;
          color:rgba(242,174,1,1);
        }
        span:last-child {
          font-size:38px;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }
      .pane-status {
        margin-top: 47px;
        font-size:26px;
        font-weight:400;
        color:rgba(255,255,255,1);
        opacity:0.9;
        span {
          margin-right: 20px
        }
      }
      .pane-process {
        margin-top: 31px;
        font-size:18px;
        font-weight:400;
        color:rgba(255,255,255,1);
        opacity:0.8;
      }
    }
    .line-details {
      position: absolute;
      display: flex;
      top: 315px;
      left: 488px;
      width: 418px;
      height: 179px;
      padding: 12px;
      border:2px solid rgba(45,106,135,1);
      .details-left {
        .left-top {
          margin-left: 13px;
          font-size:22px;
          font-weight:400;
          color:rgba(242,174,1,1);
        }
        .left-line {
          margin-top: 7px;
          margin-left: 13px;
          width:198px;
          height:4px;
          background:linear-gradient(90deg,rgba(242,174,1,1) 0%,rgba(242,174,1,0) 100%);
          opacity:0.52;
          border-radius:2px 0px 0px 2px;
        }
        .left-bottom {
          margin-left: 13px;
          margin-top: 7px;
          .bottom-text {
            height: 36px;
            display: flex;
            align-items: center;
            font-size:18px;
            font-weight:400;
            color:rgba(255,255,255,1);
            opacity:0.73;
          }
        }
      }
      .details-right {
        .right-top {
          margin-left: 13px;
          font-size:22px;
          font-weight:400;
          font-size:18px;
          color:rgba(255,255,255,1);
          opacity:0.73;
        }
        .right-line {
          margin-top: 12px;
          margin-left: 13px;
          width:127px;
          height:4px;
          background:linear-gradient(90deg,rgba(242,174,1,1) 0%,rgba(242,174,1,0) 100%);
          opacity:0.52;
          border-radius:2px 0px 0px 2px;
        }
        .right-bottom {
          margin-top:13px
        }
      }
    }
    .line-air {
      span {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        width:132px;
        height:50px;
        // border:1px solid rgba(58,202,255,1);
        // opacity:0.5;
        position: absolute;
        font-size:38px;
        font-weight:400;
        color:rgba(101,231,255,1);
      }
      .air-active {
        color:#f7ca50;
      }
      .air-stand {
        position: absolute;
        width: 400px;
        // left: 279px;
        // bottom: 179px
      }
    }
  }
</style>
