<template>
  <el-scrollbar class="scroll-container">
    <div
      v-deeLoading="loading"
      style="min-height:250px"
      :class="{divheightmin:isDataChangeColl,divheightmax:!isDataChangeColl}"
      class="listCollection"
    >
      <div v-for="(item, index) in CollectionData" :key="index" class="cardCollection" @click="handleCellClick(item)">
        <span class="spanFirst">
          <img
            alt
            :src="item.src"
            style="width: 40px;height: 40px;vertical-align: middle;padding-right: 15px"
          >
          <span :title="item.name + '-' + item.number" style="cursor:pointer">{{ item.name }}-{{ item.number }}</span>
        </span>
        <span class="spanSecond" :title="item.type">{{ item.type }}</span>
        <span class="spanThird" />
      </div>
      <div v-show="showMoreColl && CollectionData.length > 0" class="more" @click="clickMore">更多></div>
      <div v-show="CollectionData.length < 1" class="more">无数据</div>
    </div>
  </el-scrollbar>
</template>

<script>
import { getCollectList } from '../../api/home2'
import moment from 'moment'

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
      arrayList: [],
      showMoreColl: true,
      isDataChangeColl: true,
      CollectionData: [],
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
        this.isDataChangeColl = true
      }
      if (val === 20) {
        this.isDataChangeColl = false
      }
    }
  },
  mounted: function() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.$nextTick(function() {
        getCollectList()
          .then(res => {
            this.loading = false
            let ListDataArrCollection = []
            this.arrayList = []
            if (res.items) {
              ListDataArrCollection = res.items
              ListDataArrCollection.forEach(temp => {
                this.arrayList.push({
                  src: '',
                  name: temp.dxObject.name,
                  type: temp.dxObject.subTypeName.split('___')[1],
                  number: temp.dxObject.number,
                  dxClassname: temp.dxObject.dxClassname,
                  subTypeName: temp.dxObject.subTypeName,
                  id: temp.dxObject.id
                })
              })
              console.log(this.arrayList)
              this.CollectionData = this.arrayList.slice(0, 5)
            }
            console.log(res)
          })
          .catch(res => {
            this.loading = false
            console.log(res)
          })
      })
    },
    clickMore() {
      this.$nextTick(function() {
        this.CollectionData = this.arrayList
        this.showMoreColl = false
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

  .listCollection {
    // overflow: auto;
    .cardCollection {
      font-size: 16px;
      width: 100%;
      font-weight: 400;
      color: #333333;
      line-height: 53px;
      overflow: hidden;
      border-bottom: 1px solid #e6e6e6;

      .spanFirst {
        a {
          text-decoration: none;
        }

        float: left;
        width: 63%;
        color: #0000ff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .spanSecond {
        float: right;
        width: 29%;
        color: #1e1e1e;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .spanThird {
        clear: both;
      }
    }

    .more {
      display: table;
      margin: 0 auto;
      cursor: pointer;
    }
  }
</style>
