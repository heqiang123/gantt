/**
* @Description:
* @author cxg
* @date 2020/04/27
*/
<template>
  <div class="fitting-page">
    <div class="c-header">
      <dee-readable-form :form-data="readBealformData" :span-value="5" label-width="76px" />
    </div>
    <div class="c-body">
      <div class="c-step-sel">
        <div v-for="(item, index) in 10" :key="index" class="step-sel-item" :class="{'do-ing-step': index === active, 'to-do-step': index > active}">
          <div class="step-sel-item-content">
            <svg-icon class="g-icon" icon-class="gongren" />
            <span class="text">工步{{ index + 1 }}</span>
            <div v-if="index === active" class="help-say" @click="drawer=true">
              <svg-icon class="g-icon" icon-class="bangzhu" />
              操作说明
            </div>
          </div>
        </div>
      </div>
      <div class="c-step-info">
        <div class="step-info-header">
          <div class="main-info">
            <span>设备：Ready</span>
            <span>工装工具：Ready</span>
            <span>人员：Ready</span>
            <span>环境：Ready</span>
            <span>安全：Ready</span>
          </div>
          <!-- <div class="help-say" @click="drawer=true">
            <svg-icon class="g-icon" icon-class="bangzhu" />
            操作说明
          </div> -->
        </div>
        <div class="step-info-body">
          <div class="step-info-body-left">
            <div class="step-header">
              装配进度
            </div>
            <div id="chart" style="height: 90%;width: 240px" />
          </div>
          <div class="step-info-body-right">
            <dee-table :columns="workColumns" :data="workData" :options="{'row-class-name':tableRowClassName}" @row-click="rowClickFun" @cell-data-change="cellDataChange" />
          </div>
        </div>
      </div>
    </div>
    <div class="slid-menu-box">
      <div class="slid-menu-item" @click="uploadFun">
        <img src="@/icons/amscloud.png" alt="">
        <span class="s-text">完工</span>
      </div>
      <div class="slid-menu-item" @click="submitFun">
        <img src="@/icons/jsontijiao.png" alt="">
        <span class="s-text">检验记录</span>
      </div>
      <div class="slid-menu-item" @click="eError=true">
        <img src="@/icons/shenqing.png" alt="">
        <span class="s-text">异常</span>
      </div>
      <div class="slid-menu-item">
        <img src="@/icons/wenjianjia.png" alt="" @click="elog=true">
        <span class="s-text">装配明细</span>
      </div>
    </div>
    <el-drawer
      :with-header="false"
      :visible.sync="drawer"
      direction="rtl"
    >
      <div class="d-content-box">
        <h3>AG600</h3>
        <img style="width: 100%" src="/image/wheelgear.png" alt="">
        <p>检查设备、工装工具是否到位，装配环境和装配人员是否到位</p>
        <ul style="padding-left: 30px">
          <li style="list-style-type:disc">打开夹具，将装配件放置好</li>
          <li style="list-style-type:disc">开始按照工序进行装配</li>
          <li style="list-style-type:disc">装配完成后检查是否合格</li>
          <li style="list-style-type:disc">完成装配作业</li>
        </ul>
      </div>
    </el-drawer>

    <input
      id="avatar"
      type="file"
      style="display:none"
      name="avatar"
    >
    <DeeDialog title="不合格预审发起" :dialog-visible="dialogVisible" @handleClose="dialogVisible = false">
      <dee-form
        :form-data="formData"
        :form="form"
        label-width="110px"
      />
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </div>
    </DeeDialog>
    <DeeDialog title="检验记录" :dialog-visible="edia" @handleClose="edia = false">
      <dee-tools
        id="toolsTree"
        ref="toolsTree"
        :tools="toolsTree"
        mode="normal"
      />
      <dee-table :columns="diaColumns" :data="checkData" />
    </DeeDialog>
    <DeeDialog title="异常" :dialog-visible="eError" @handleClose="eError = false">
      <dee-form
        :form-data="eformData"
        :form="eform"
        label-width="110px"
      />
      <div slot="footer">
        <el-button @click="eError = false">取消</el-button>
        <el-button type="primary" @click="eError = false">确定</el-button>
      </div>
    </DeeDialog>
    <DeeDialog title="装配明细" :dialog-visible="elog" @handleClose="elog = false">
      <dee-table :columns="logdiaColumns" :data="logcheckData" />
    </DeeDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      eform: false,
      eformData: [
        {
          split: 2,
          title: '异常问题',
          data: [
            {
              title: '问题类别',
              key: 'number1',
              component: {
                name: 'el-select',
                placeholder: '请选择',
                options: [
                  {
                    label: '设备问题',
                    value: '1'
                  },
                  {
                    label: '配套问题',
                    value: '2'
                  },
                  {
                    label: '人员问题',
                    value: '3'
                  },
                  {
                    label: '工艺问题',
                    value: '4'
                  },
                  {
                    label: '质量问题',
                    value: '5'
                  }
                ]
              }
            },
            {
              title: '问题级别',
              key: 'number2',
              component: {
                name: 'el-select',
                placeholder: '请选择',
                options: [
                  {
                    label: '一级响应',
                    value: '1'
                  },
                  {
                    label: '二级响应',
                    value: '2'
                  },
                  {
                    label: '三级响应',
                    value: '3'
                  }
                ]
              }
            },
            {
              title: '问题原因',
              key: 'number3',
              component: {
                name: 'el-select',
                placeholder: '请选择',
                options: [
                  {
                    label: '配套物料数量不够',
                    value: '1'
                  },
                  {
                    label: '配套物料出现问题件',
                    value: '2'
                  }
                ]
              }
            },
            {
              title: '要求解决时间',
              key: 'number4',
              component: {
                name: 'el-date-picker',
                placeholder: '请选择'
              }
            },
            {
              title: '问题描述',
              key: 'number5',
              width: 2,
              component: {
                name: 'el-input',
                placeholder: '请输入'
              }
            }
          ]
        },
        {
          title: '责任人',
          split: 2,
          data: [
            {
              title: '部门',
              key: 'sorties',
              component: {
                name: 'el-select',
                placeholder: '请选择',
                options: [
                  {
                    label: '飞控部',
                    value: '1'
                  },
                  {
                    label: '导航部',
                    value: '2'
                  }
                ]
              }
            },
            {
              title: '人员',
              key: 'sortiesd',
              component: {
                name: 'el-select',
                placeholder: '请选择',
                options: [
                  {
                    label: '王鑫',
                    value: '1'
                  },
                  {
                    label: '王金',
                    value: '2'
                  }
                ]
              }
            }
          ]
        }
      ],
      eError: false,
      elog: false,
      toolsTree: [
        {
          type: 'icon',
          name: '新建',
          icon: '/icons/c-batchc.png',
          handler: {
            click: () => {
              this.edia = true
            }
          }
        },
        {
          type: 'icon',
          name: '删除',
          icon: '/icons/c-batchd.png',
          handler: {
            click: () => {
              this.edia = true
            }
          }
        },
        {
          type: 'icon',
          name: '提交',
          icon: '/icons/check.png',
          handler: {
            click: () => {
              this.edia = true
            }
          }
        }
      ],
      diaColumns: [
        {
          title: '检验要求',
          key: '',
          component: {
            show: true,
            name: 'ElementView'
          }
        },
        {
          title: '检验结果',
          component: {
            show: true,
            name: 'el-input'
          }
        }
      ],
      edia: false,
      tableRowClassName: ({ row }) => {
        if (row.num5 === '代料') {
          return 'dailiao'
        } else if (row.num5 === '串换件') {
          return 'chuanhuan'
        }
      },
      logcheckData: [
        {
          num1: 'WX2001',
          num2: '5',
          num3: 'WX2003',
          num4: '4',
          num5: '1/2'
        },
        {
          num1: 'DT2003',
          num2: '2',
          num3: 'DT2003',
          num4: '3',
          num5: '1/5'
        },
        {
          num1: 'WX2003',
          num2: '9',
          num3: 'WX2006',
          num4: '4',
          num5: '2/5'
        },
        {
          num1: 'DT2004',
          num2: '4',
          num3: 'DT2004',
          num4: '1',
          num5: '1/9'
        },
        {
          num1: 'WX2005',
          num2: '12',
          num3: 'WX2005',
          num4: '4',
          num5: '2/8'
        },
        {
          num1: 'WX2006',
          num2: '2',
          num3: 'WX2006',
          num4: '1',
          num5: '9/10'
        }
      ],
      logdiaColumns: [
        { title: '物料编号', key: 'num1' },
        { title: '物料数量', key: 'num2' },
        { title: '装配记录', key: 'num3' },
        { title: '装配数量', key: 'num4' },
        { title: '状态', key: 'num5' }
      ],
      workColumns: [
        { title: '物料号', key: 'num1' },
        { title: '数量', key: 'num2' },
        { title: '实物编号', key: 'num3' },
        {
          title: '已装数量',
          key: 'num4'
        },
        { title: '装配类型', key: 'num5' }
      ],
      dialogVisible: false,
      drawer: false,
      active: 3,
      formData: [
        {
          split: 1,
          data: [
            {
              title: '原因代码',
              key: 'number',
              component: {
                name: 'el-input'
              }
            }
          ]
        },
        {
          split: 1,
          data: [
            {
              title: '责任单位',
              key: 'sorties',
              component: {
                name: 'el-input'
              }
            }
          ]
        },
        {
          split: 1,
          data: [
            {
              title: '质量问题描述',
              key: 'sortiesw',
              component: {
                name: 'el-input',
                type: 'number'
              }
            }
          ]
        }
      ],
      form: {
        number: '',
        sorties: ''
      },
      readBealformData: [
        {
          label: '订单号',
          value: '2932323828338',
          width: 1
        },
        {
          label: '产品编号',
          value: 'AG600-002',
          width: 1
        },
        {
          label: '产品名称',
          value: '飞机',
          width: 1
        },
        {
          label: '计划时间',
          value: '2020/3/23-2020/5/23',
          width: 1.6
        },
        {
          label: '批架次',
          value: '2232',
          width: 1
        },
        {
          label: 'AO号',
          value: 'AOS010101',
          width: 1
        },
        {
          label: '装配单元',
          value: '飞控',
          width: 1
        },
        {
          label: '实际时间',
          value: '2020/3/23-2020/5/23',
          width: 1.6
        }
      ],
      checkData: [
        {
          instrument: '游标卡尺',
          classification: '尺寸公差/普通尺寸',
          value: '<>{5.555 +0.012 0}<+><+><+>',
          passed: true,
          data: ''
        },
        {
          instrument: '游标卡尺',
          classification: '位置公差/定位/位置度',
          value: '<>{0.2}<><+><><><+><><><+><><>',
          passed: true,
          data: ''
        },
        {
          instrument: '游标卡尺',
          classification: '尺寸公差/角度',
          value: '{50°0′0″ 30′ -30′}<+><+><+>',
          passed: false,
          data: ''
        },
        {
          instrument: '游标卡尺',
          classification: '尺寸公差/普通尺寸',
          value: '<>{5.555 +0.012 0}<+><+><+>',
          passed: false,
          data: ''
        }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'workData'
    ])
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    if (this.$route.query.num1) {
      this.$store.dispatch('fitting/deleteWData', this.$route.query.num1)
    }
  },
  methods: {
    rowClickFun(row, event, column) {
      this.$router.push({ path: '/scan/home', query: { num1: row.num1 }})
    },
    cellDataChange({ rowIndex, value, row }) {
      if (value === row.num2) {
        this.workData.splice(rowIndex, 1)
      }
    },
    initChart() {
      var uploadedDataURL = '/asset/get/s/data-1559120606810-8K55q2kWT.png'
      const Green = {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: '#99da69' // 0% 处的颜色
        }, {
          offset: 1,
          color: '#01babc' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      }
      var dataValArray = 0.63
      var datatext = ['17.25']
      var datasubtext = ['完成比例']
      this.chart2 = this.$echarts.init(document.getElementById('chart'))
      const option = {
        title: {
          text: datatext[0] + '%',
          subtext: datasubtext[0],
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 26,
            fontWeight: 'normal',
            color: ['#67828c']
          },
          subtextStyle: {
            color: '#67828c',
            fontSize: 16,
            align: 'center'
          }
        },
        series: [{
        // 渐变圆环
          name: '',
          type: 'pie',
          radius: ['55%', '90%'],
          startAngle: 180,
          hoverAnimation: false,
          avoidLabelOverlap: true,
          z: 0,
          zlevel: 0,
          label: {
            show: false,
            normal: { show: false }
          },
          data: [{
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                color: Green
              }
            }
          }]
        },
        {
          // 仪表盘样式
          name: '',
          type: 'gauge',
          radius: '90%',
          startAngle: 180,
          clockwise: true,
          splitNumber: 50,
          hoverAnimation: true,
          axisTick: {
            show: false
          },
          splitLine: {
            length: 30,
            lineStyle: {
              width: 1,
              color: '#fff'
            }
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              opacity: 0
            }
          },
          detail: {
            show: false
          },
          data: [{
            value: Math.round((dataValArray * 100)),
            name: ''
          }]
        },
        {
          // 进度圆环
          name: 'Line 1',
          type: 'pie',
          startAngle: 180,
          clockWise: true,
          radius: ['95%', '96%'],
          itemStyle: {
            normal: {
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,

          data: [{
            value: Math.round((dataValArray * 100)),
            itemStyle: {
              normal: {
                color: '#20da97'
              }
            }
          }, {// 画中间的图标
            name: '',
            value: 0,
            label: {
              position: 'inside',
              backgroundColor: {
                image: uploadedDataURL
              },
              width: 16,
              height: 16,
              borderRadius: 20,
              padding: 11
            }
          }, {
            value: 100 - Math.round((dataValArray * 100)),
            name: 'invisible',
            itemStyle: {
              normal: {
                color: 'transparent', // 未完成的圆环的颜色
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }
          ]
        }
        ]
      }
      this.chart2.setOption(option)
    },
    uploadFun() {
      this.$confirm('确认完工吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '完工成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消完工'
        })
      })
    },
    submitFun() {
      this.edia = true
    }
  }
}

</script>
<style lang='scss'>
.fitting-page{
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    .dailiao{
      background: #B2E5B0;
    }
    .chuanhuan{
      background: #28C29A;
    }
    .c-header{
        padding: 15px 0;
        background: #FFF;
        height: 94px;
    }
    .c-body{
         position: absolute;
         top: 94px;
         left: 0;
         right: 0;
         bottom: 0;
        .step-sel-item{
            width: 200px;
            height: 100px;
            background: #FFF;
            margin-top: 10px;
            line-height: 100px;
            text-align: center;
            color: #7A7D82;
            .step-sel-item-content{
                height: 100%;
                position: relative;
                &::after{
                    position: absolute;
                    content: '';
                    width: 10px;
                    background: #65B46D;
                    left: 0;
                    top: 0;
                    bottom: 2px;
                }
                 .help-say{
                    position: absolute;
                    right: 10px;
                    font-size: 12px;
                    top: 8px;
                    height: 20px;
                    line-height: 20px;
                    color: #6482DC;
                    .g-icon{
                        font-size: 16px;
                    }
                 }
            }
            .g-icon{
                font-size: 40px;
            }
            .text{
                font-size: 22px;
            }
            position: relative;
            &::after{
                position: absolute;
                content: '';
                left: 0;
                top: -8px;
                width: 10px;
                border-top: 5px solid #FFF;
                border-right: 5px solid #65B46D;
                border-bottom: 5px solid #65B46D;
                border-left: 5px solid #65B46D;
            }
            &:first-child{
              &::after{
                position: absolute;
                content: '';
                left: 0;
                top: -8px;
                width: 10px;
                border-width: 0;
            }
            }
            &::before{
                position: absolute;
                content: '';
                width: 10px;
                background: #65B46D;
                left: 0;
                bottom: -8px;
                border-top: 5px solid #65B46D;
                border-right: 5px solid #FFF;
                border-bottom: 5px solid #FFF;
                border-left: 5px solid #FFF;
            }
        }
           .do-ing-step{
               .step-sel-item-content{
                  color:#323335;
                  &::after{
                    background: #DCB168;
                  }
               }
                &::after{
                    border-top: 5px solid #FFF;
                    border-right: 5px solid #DCB168;
                    border-bottom: 5px solid #DCB168;
                    border-left: 5px solid #DCB168;
                }
                 &::before{
                    border-top: 5px solid #DCB168;
                    border-right: 5px solid #FFF;
                    border-bottom: 5px solid #FFF;
                    border-left: 5px solid #FFF;
                }
            }
           .to-do-step{
               .step-sel-item-content{
                  &::after{
                    background: #B5B6B9;
                  }
               }
                &::after{
                    border-top: 5px solid #FFF;
                    border-right: 5px solid #B5B6B9;
                    border-bottom: 5px solid #B5B6B9;
                    border-left: 5px solid #B5B6B9;
                }
                 &::before{
                    border-top: 5px solid #B5B6B9;
                    border-right: 5px solid #FFF;
                    border-bottom: 5px solid #FFF;
                    border-left: 5px solid #FFF;
                }
            }
        .c-step-sel{
            width: 200px;
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        .c-step-info{
            position: absolute;
            left: 200px;
            top: 0;
            right: 0;
            bottom: 0;
        }
        .step-info-header{
            height: 80px;
            line-height: 80px;
            padding: 0 30px;
            font-size: 16px;
            position: relative;
            .main-info{
                display: flex;
                justify-content: space-between;
                max-width: 1000px;
            }
            &::after{
              position: absolute;
              content: '';
              height: 1px;
              bottom: 10px;
              left: 0px;
              right: 0px;
              background: #E2E2E2;
            }
        }
        .step-info-body{
            padding-right: 150px;
            display: flex;
            height: calc(100% - 80px);
            justify-content: center;
            align-items: center;
            .step-info-body-left{
              width: 400px;
              height: 400px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .step-info-body-right{
              flex: 1
            }
            .check-item{
                padding:10px 30px;
                line-height: 30px;
                max-width: 1000px;
                .value-content{
                    height:30px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(199,199,199,1);
                }
                .passed-icon{
                    font-size: 26px;
                    color: #39B33E
                }
            }
        }
    }
    .slid-menu-box{
        position: fixed;
        height: 400px;
        bottom: 60px;
        right: 0;
        width: 100px;
        background: #FFF;
        box-shadow:-3px 5px 13px 0px rgba(218,218,218,0.5);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .slid-menu-item{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                width: 40px;
                height: 30px;
            }
            .s-text{
                padding-top: 10px
            }
        }
    }
    .step-header{
        height: 10%;
        text-align:center;
        display: flex;
        justify-content: center;
        align-items:flex-end;
        font-size: 20px;
        font-weight: bold;
    }
}
.d-content-box{
    padding: 20px
}
</style>
