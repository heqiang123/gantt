/**
* @Description:
* @author cxg
* @date 2020/04/26
*/
<template>
  <div class="process-page">
    <el-row :gutter="10">
      <el-col v-for="(item, index) in processData" :key="index" :span="8">
        <router-link class="p-item" tag="div" to="/padexecute/fitting">
          <div class="process-header">
            <div class="status-box" :style="{background: colorObj[item.status]}">
              {{ statusDic[item.status] }}
            </div>
            <div class="h-title">
              <div class="t-text">
                {{ item.code + index }}
              </div>
              <div class="sub-t-text">
                {{ item.task }}
              </div>
            </div>
            <div class="h-percent">
              {{ item.percent }}%
            </div>
          </div>
          <div class="process-body">
            <div class="top-content">
              <div>
                负责人：  {{ item.person }}
              </div>
              <div>
                订单号： {{ item.dan }}{{ index + 1 }}
              </div>
              <div>
                开始计划时间： {{ item.start }}
              </div>
              <div>
                结束计划时间： {{ item.end }}
              </div>
            </div>
            <div class="bottom-content">
              当前第<span style="color: rgb(203,144,127)">26</span>步 共30步
            </div>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      statusDic: {
        '1': '进行中',
        '2': '已指派'
      },
      colorObj: {
        '1': '#6BA8E6',
        '2': '#65B46D'
      },
      processData: [
        {
          status: 1,
          code: 'AO-CAS-00',
          dan: 'AG600-002-200',
          start: '2020-04-12',
          end: '2020-04-15',
          person: '王鑫',
          percent: '20',
          task: '左航行灯和左防撞灯的拆卸'
        },
        {
          status: 2,
          code: 'AO-CAS-00',
          dan: 'AG600-002-200',
          start: '2020-04-15',
          end: '2020-04-30',
          person: '王鑫',
          percent: '55',
          task: '左航行灯和左防撞灯的拆卸'
        },
        {
          status: 1,
          code: 'AO-CAS-00',
          dan: 'AG600-002-200',
          start: '2020-04-11',
          end: '2020-04-29',
          person: '王鑫',
          percent: '95',
          task: '右翼尖灯罩连接更改'
        },
        {
          status: 2,
          code: 'AO-CAS-00',
          dan: 'AG600-002-200',
          start: '2020-03-15',
          end: '2020-04-19',
          person: '王鑫',
          percent: '32',
          task: '右翼尖灯罩连接更改'
        },
        {
          status: 1,
          code: 'AO-CAS-00',
          dan: 'AG600-002-200',
          start: '2020-02-15',
          end: '2020-04-10',
          person: '王鑫',
          percent: '65',
          task: '右航行灯和右防撞灯的拆卸'
        },
        {
          status: 2,
          code: 'AO-CAS-00',
          dan: 'AG600-002-200',
          start: '2020-04-18',
          end: '2020-04-23',
          person: '王鑫',
          percent: '10',
          task: '右航行灯和右防撞灯的复装'
        },
        {
          status: 1,
          code: 'AO-CAS-00',
          dan: 'AG600-002-200',
          start: '2020-02-15',
          end: '2020-04-23',
          person: '王鑫',
          percent: '90',
          task: 'W1021线束新增导线敷设及固定'
        },
        {
          status: 1,
          code: 'AO-CAS-00',
          dan: 'AG600-002-200',
          start: '2020-04-15',
          end: '2020-04-28',
          person: '王鑫',
          percent: '100',
          task: 'W1021线束新增导线敷设及固定'
        }
      ]
    }
  },

  computed: {},
  mounted() {},
  methods: {}
}

</script>
<style lang='scss'>
.process-page{
    padding: 10px;
    height: 100%;
    overflow: scroll;
    .p-item{
        width:100%;
        height:300px;
        background:rgba(244,247,248,1);
        box-shadow:2px 3px 16px 0px rgba(208,208,208,0.5);
        border-radius:6px;
        border:1px solid rgba(213,217,220,1);
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        .process-header{
            height: 70px;
            background: #FFF;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .status-box{
                position: absolute;
                left: 0px;
                top: 20px;
                height: 30px;
                line-height: 30px;
                padding-left: 10px;
                width: 74px;
                background:rgba(90,195,140,1);
                box-shadow:1px 1px 5px 0px rgba(184,193,186,0.99);
                border-radius:2px;
                color: #FFF
            }
            .h-title{
                padding-left: 92px;
                .t-text{
                    font-size:20px;
                    color: #5C5C5C
                }
                .sub-t-text{
                    color: #8A8A8A;
                    font-size: 16px;
                }
            }
            .h-percent{
                color: #E68C5C;
                padding-right: 10px;
                font-size: 30px;
                font-weight:normal;
            }
        }
        .process-body{
            flex: 1;
            position: relative;
            background-image: url(/image/plane-bac.png);
            background-repeat: no-repeat;
            background-position:bottom left;
            display: flex;
            flex-direction: column;
            &::after{
                content: '';
                position: absolute;
                left: 20px;
                right: 20px;
                bottom: 51px;
                border-top: 1px dotted #C8D1DB;
            }
            .top-content{
                padding-left: 50px;
                flex: 1;
                display: flex;
                justify-content: center;
                flex-direction: column;
                line-height: 28px;
            }
            .bottom-content{
                height: 50px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding-right: 50px
            }
        }
    }
}
</style>
