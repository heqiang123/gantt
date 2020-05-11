/**
* @Description:
* @author cxg
* @date 2020/04/27
*/
<template>
  <div class="checkout-page">
    <div class="c-header">
      <dee-readable-form :form-data="readBealformData" :span-value="6" />
    </div>
    <div class="c-body">
      <div class="c-step-sel">
        <div v-for="(item, index) in 10" :key="index" class="step-sel-item" :class="{'do-ing-step': index === active, 'to-do-step': index > active}">
          <div class="step-sel-item-content">
            <svg-icon class="g-icon" icon-class="gongren" />
            <span class="text">工步{{ index + 1 }}</span>
          </div>
        </div>
      </div>
      <div class="c-step-info">
        <div class="step-info-header">
          <div class="main-info">
            <span>计划时间：2020/2/23 12:08</span>
            <span>计划完成时间：2020/4/30 15:30</span>
            <span>实际开始时间：2020/4/30 15:30</span>
          </div>
          <div class="help-say" @click="drawer=true">
            <svg-icon class="g-icon" icon-class="bangzhu" />
            操作说明
          </div>
        </div>
        <div class="step-info-body">
          <el-row v-for="(item, index) in checkData" :key="index" class="check-item">
            <el-col :span="4">{{ item.instrument }}</el-col>
            <el-col :span="10"><input v-model="item.data" class="value-content" type="text"></el-col>
            <el-col :span="8"><Unit :icon-value="item.value" :classification-icon="item.classification" /></el-col>
            <el-col :span="2"><svg-icon v-if="item.passed" class="passed-icon" icon-class="passed" /></el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="slid-menu-box">
      <div class="slid-menu-item" @click="uploadFun">
        <img src="@/icons/amscloud.png" alt="">
        <span class="s-text">程序上传</span>
      </div>
      <div class="slid-menu-item" @click="submitFun">
        <img src="@/icons/jsontijiao.png" alt="">
        <span class="s-text">合格提交</span>
      </div>
      <div class="slid-menu-item" @click="dialogVisible=true">
        <img src="@/icons/shenqing.png" alt="">
        <span class="s-text">预审申请</span>
      </div>
      <div class="slid-menu-item">
        <img src="@/icons/wenjianjia.png" alt="" @click="uploadFun">
        <span class="s-text">附件上传</span>
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
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
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
                name: 'el-input'
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
          value: '2020/3/23 - 2020/5/23',
          width: 1
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
          value: '2020/3/23 - 2020/5/23',
          width: 1
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

  computed: {},
  mounted() {},
  methods: {
    uploadFun() {
      var W = document.getElementById('avatar')
      W.click()
    },
    submitFun() {
      this.$confirm('确认合格提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    }
  }
}

</script>
<style lang='scss'>
.checkout-page{
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    .c-header{
        padding: 15px;
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
            width: 300px;
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        .c-step-info{
            position: absolute;
            left: 300px;
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
            .help-say{
                position: absolute;
                right: 30px;
                top: 0
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
        top: 30%;
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
}
.d-content-box{
    padding: 20px
}
</style>
