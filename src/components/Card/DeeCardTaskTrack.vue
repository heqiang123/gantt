<template>
  <div class="assistants">
    <div class="assistant-item" @click="getInfo('/viewProductCodeApply')">
      <div class="warp-img">
        <img src="../../icons/components/card/cardAssistant/wenjian2.png">
      </div>
      <span>查看产品代号申请</span>
    </div>
    <div class="assistant-item" @click="getInfo('/viewSPBOMApply')">
      <div class="warp-img">
        <img src="../../icons/components/card/cardAssistant/wenjian2.png">
      </div>
      <span>查看SPBOM申请</span>
    </div>
    <div class="assistant-item" @click="getInfo('/viewWhiteChartApply')">
      <div class="warp-img">
        <img src="../../icons/components/card/cardAssistant/wenjian2.png">
      </div>
      <span>查看白图快速投产申请</span>
    </div>
    <div class="assistant-item" @click="getInfo('/queryProductConfig')">
      <div class="warp-img">
        <img src="../../icons/components/card/cardAssistant/wenjian2.png">
      </div>
      <span>产品配置查询</span>
    </div>
    <div class="assistant-item" @click="getInfo('/borrowedPartsProcessingResults')">
      <div class="warp-img">
        <img src="../../icons/components/card/cardAssistant/wenjian2.png">
      </div>
      <span>借用件处理结果查询</span>
    </div>
    <div class="assistant-item" @click="getInfo('/viewERCChangeRecord')">
      <div class="warp-img">
        <img src="../../icons/components/card/cardAssistant/wenjian2.png">
      </div>
      <span>ECR实物更改记录</span>
    </div>
    <div class="assistant-item" @click="getInfo('/viewEBOMErrataApply')">
      <div class="warp-img">
        <img src="../../icons/components/card/cardAssistant/wenjian2.png">
      </div>
      <span>EBOM勘误申请查询</span>
    </div>
    <div class="assistant-item" @click="jump('http://gncic.facri.com:8083/QB803/TYGLDrawGDQueryTY.aspx')">
      <div class="warp-img">
        <img src="../../icons/components/card/cardAssistant/wenjian2.png">
      </div>
      <span>图样归档查询</span>
    </div>
    <div class="assistant-item" @click="jump('http://gncpmis.facri.com/Page/BOM/Ebom/EBomBaseline_Search.aspx')">
      <div class="warp-img">
        <img src="../../icons/components/card/cardAssistant/wenjian2.png">
      </div>
      <span>PMIS产品基线查询</span>
    </div>
    <div class="assistant-item" @click="getInfo('/queryDesignChangesResults')">
      <div class="warp-img">
        <img src="../../icons/components/card/cardAssistant/wenjian2.png">
      </div>
      <span>设计更改落实状况</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    initData() {
    },
    getInfo(path) {
      this.$router.push(path)
      console.log('path=>', path)
    },
    jump(url) {
      window.location.href = url
    }
  },
  filter: {}
}
</script>
<style lang="scss" scoped>
  .assistants {
    display: flex;
    flex-flow:row wrap;
    height: 380px;
    .assistant-item {
      width: 48%;
      height: 50px;
      line-height: 50px;
      text-align: left;
      border: 1px #e5e5e5 solid;
      border-radius: 10px;
      cursor: pointer;
      margin-top: 12px;
      .warp-img {
        width: 36px;
        height: 50px;
        background-color: #2a68c9;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        float: left;
        img {
          width: 22px;
          height: 22px;
          margin: 14px 0 0 7px;
        }
      }
      span {
        display: inline-block;
        font-size: 14px;
        color: #333;
        width: 158px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        overflow: hidden;
      }
    }
    .assistant-item:nth-child(2n) {
      margin-left: 2%;
    }
    .assistant-item:hover {
      span {
        color: #0000ff;
      }
    }
  }
</style>
