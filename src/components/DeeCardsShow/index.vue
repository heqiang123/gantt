/**
* @Description: 卡片显示
* @author cxg
* @date 2019/10/17
*/
<template>
  <div class="card-show-com">
    <div v-for="(item, index) in dataList" :key="index" class="card-item">
      <el-card shadow="hover">
        <div>
          <div class="card-img-box">
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1136213184,3409179390&fm=15&gp=0.jpg" alt="">
          </div>
          <div class="info-content">
            <div>
              资源型号: {{ item.name }}
            </div>
            <div>
              规格/型号: {{ item.specification }}
            </div>
            <div>
              精度/分辨率: {{ item.precision }}
            </div>
            <div>
              状态: {{ item.enabled === '1' ? '有效' : '无效' }}
            </div>
            <div>
              创建人: {{ item.created_by_id.keyed_name }}
            </div>
            <div>
              创建时间: {{ $utils.formatDate(item.created_on, 'YYYY-MM-DD HH:mm:ss') }}
            </div>
            <div>
              备注: {{ item.description }}
            </div>
          </div>
          <dee-tools :tools="btnListTools" mode="dual" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },

  computed: {},
  mounted() {},
  methods: {}
}

</script>
<style lang='scss'>
 .card-show-com{
     width: 100%;
     display: flex;
     flex-wrap:wrap;
     .card-item{
        margin: 8px;
        width: 280px;
        .card-img-box{
            height: 150px;
            text-align: center;
            line-height: 150px;
            img{
                height: 100%;
            }
        }
        .info-content{
            padding: 8px 0;
            font-size: 14px;
        }
     }
 }
</style>
