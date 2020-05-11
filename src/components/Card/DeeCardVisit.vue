<template>
  <el-scrollbar class="scroll-container" style="height:100%">
    <div
      v-deeLoading="loading"
      class="listvisit"
    >
      <div v-for="(item,index) in visitedData" :key="index" class="cardvisit" @click="handleCellClick(item)">
        <div class="border">
          <span class="spanFirst">
            <img
              v-if="item.src"
              :src="item.src"
            >
            <img :src="showIcon(item)" alt="">
            <span :title="item.name">{{ item.name }}</span>
          </span>
          <span class="spanSecond"><i class="el-icon-arrow-right" /></span>
          <span class="spanThird" />
        </div>
      </div>
      <div v-show="showMore && visitedData.length > 0" class="more" @click="clickMore">更多></div>
      <div v-show="visitedData.length < 1" class="more">无数据</div>
    </div>
  </el-scrollbar>
</template>

<script>
import { getVisitData } from '../../api/home2'
import moment from 'moment'
import { showIcon } from '@/utils/util'

export default {
  components: {},
  props: {
    h: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      array: [],
      showMore: false,
      isDataChange: true,
      visitedData: [],
      loading: false
    }
  },
  computed: {
    collectionState() {
      return this.$store.state.refreshCount
    }
  },
  watch: {
    collectionState() {
      this.getData()
    },
    h(val) {
      if (val === 10) {
        this.isDataChange = true
      }
      if (val === 20) {
        this.isDataChange = false
      }
    },
    x(val) {
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getData()
    })
  },
  methods: {
    showIcon(row) {
      return showIcon(row)
    },
    getData() {
      // 添加遮罩层
      this.loading = true
      getVisitData()
        .then(res => {
          console.log(res)
          this.loading = false
          this.array = []
          if (res.items) {
            res.items.forEach(temp => {
              if (!this.array.some(r => r.id === temp.dxObject.id)) {
                this.array.push({
                  src: '',
                  name: temp.dxObject.name,
                  time: temp.dxObjTime,
                  dxClassname: temp.dxObject.dxClassname,
                  subTypeName: temp.dxObject.subTypeName,
                  id: temp.dxObject.id
                })
              }
            })
            this.visitedData = this.array
          }
        })
        .catch(res => {
          this.loading = false
        })
    },
    clickMore() {
      this.$nextTick(function() {
        this.visitedData = this.array
        this.showMore = false
      })
    },
    handleCellClick(item) {
      const id = item.id.substring(item.id.lastIndexOf(':') + 1)
      // this.$router.addRoutes([{
      //   path: '/index',
      //   component: Layout,
      //   children: [{
      //     path: '/generalDetails-' + id,
      //     name: 'GeneralDetails-' + id,
      //     hidden: true,
      //     component: () => Vue.component('GeneralDetails-' + id, import('../../business-components/DocumentDetail/GeneralDetails'))
      //   }]
      // }])
      this.$router.push({
        path: '/generalDetails-' + id,
        query: {
          id: item.id,
          dxClassname: item.dxClassname,
          subTypeName: item.subTypeName,
          title: item.name,
          time: moment().valueOf()
        }
      })
    }
  },
  filter: {}
}
</script>

<style lang="scss">
  .divheightmin {
    max-height: 330px;
  }

  .divheightmax {
    max-height: 760px;
  }

  .listvisit {
    // overflow: auto;
    // padding-bottom: 20px;
    min-height: 200px;
    .cardvisit {
      padding: 0 8px;

      .border {
        color: #212121;
        line-height: 40px;
        height: 40px;
        overflow: hidden;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        border-bottom: 1px solid #d9d9d9;
        padding: 0px 4px;
      }

      transition: transform .3s ease-in-out, box-shadow .3s cubic-bezier(.47, 0, .745, .715), border .3s linear .1s;

      &:hover {
        box-shadow: 0 2px 5px rgba(51, 51, 51, .25);
        -webkit-transform: translateY(-2px);
        -moz-transform: translateY(-2px);
        transform: translateY(-2px);

        .spanFirst {
          color: #2A75CE;
        }

        .spanSecond i {
          color: #212121;
        }

        .border {
          border-bottom: 1px solid #fff;

        }
      }

      .spanFirst {
        float: left;
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        img {
          width: 14px;
          height: 14px;
          vertical-align: middle;
          padding-right: 4px;
        }
      }

      .spanSecond {
        float: right;
        text-align: right;
        width: 20px;
        color: #d9d9d9;
      }

      .spanThird {
        clear: both;
      }
    }

    .more {
      display: table;
      margin: 0 auto;
      font-size: 14px;
      color: #333;
      cursor: pointer;
    }
  }
</style>
