<template>
  <!--  <grid-layout-->
  <!--    class="card-layout"-->
  <!--    :layout="cardArray"-->
  <!--    :col-num="12"-->
  <!--    :row-height="33"-->
  <!--    :is-draggable="$store.state.card.lock?false:true"-->
  <!--    :is-resizable="false"-->
  <!--    :vertical-compact="true"-->
  <!--    :use-css-transforms="true"-->
  <!--    :margin="[12,12]"-->
  <!--    @layout-updated="layoutUpdatedEvent"-->
  <!--  >-->
  <!--    <grid-item-->
  <!--      v-for="item in cardArray"-->
  <!--      :key="item.i"-->
  <!--      :x="item.x"-->
  <!--      :y="item.y"-->
  <!--      :w="item.w"-->
  <!--      :h="item.h"-->
  <!--      :i="item.i"-->
  <!--      drag-ignore-from=".el-card .el-card__body"-->
  <!--    >-->
  <dee-card
    :id="item.i"
    :key="item.i"
    :shape="item.shape"
    :name="item.name"
    :shadow="$store.state.card.shadow"
    :show="item.show"
    :icon="item.icon"
    :lock="$store.state.card.lock"
    @shapeChange="shapeChange"
    @deleteCard="deleteCard"
    @updateName="updateName"
  >
    <div v-if="item.template==='table'">
      <dee-card-table
        ref="deeTable"
        :columns="item.columns"
        :options="item.options"
      />
    </div>
    <div v-else-if="item.template==='piechart'">
      <card-pie-chart />
    </div>
    <div v-else-if="item.template==='collapse'">
      <card-collapse />
    </div>
    <div v-else-if="item.template==='cardpanel'">
      <card-panel />
    </div>
    <div v-else-if="item.template==='cardlist'">
      <card-list />
    </div>
    <div v-else-if="item.template==='cardlist1'">
      <card-list1 />
    </div>
    <div v-else-if="item.template==='cardlist2'">
      <card-list2 />
    </div>
    <div v-else-if="item.template==='visit'">
      <card-visit :h="item.h" />
    </div>
    <div v-else-if="item.template==='collection'">
      <card-collection :h="item.h" />
    </div>
    <div v-else-if="item.template==='cardassistant'">
      <card-assistant :h="item.h" />
    </div>
    <div v-else-if="item.template==='cardtasktrack'">
      <card-task-track :h="item.h" />
    </div>
  </dee-card>
<!--    </grid-item>-->
<!--  </grid-layout>-->
</template>
<script>
// import VueGridLayout from 'vue-grid-layout'
import DeeCard from './DeeCard.vue'
import DeeCardTable from './DeeCardTable.vue'
import CardPieChart from './DeeCardPieChart.vue'
import CardCollapse from './DeeCardCollapse.vue'
import CardPanel from './DeeCardPanel.vue'
import CardList from './DeeCardList.vue'
import CardList1 from './DeeCardList1.vue'
import CardList2 from './DeeCardList2.vue'
import CardVisit from './DeeCardVisit.vue'
import CardCollection from './DeeCardCollection.vue'
import CardAssistant from './DeeCardAssistant.vue'
import CardTaskTrack from './DeeCardTaskTrack.vue'
export default {
  components: {
    // GridLayout: VueGridLayout.GridLayout,
    // GridItem: VueGridLayout.GridItem,
    DeeCard,
    CardPieChart,
    CardCollapse,
    CardPanel,
    CardList,
    CardList1,
    CardList2,
    DeeCardTable,
    CardVisit,
    CardCollection,
    CardAssistant,
    CardTaskTrack
  },
  props: {
    layout: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      cardArray: [],
      cardX: [0, 3, 6, 9]
    }
  },
  watch: {
    layout: function(val, oldVal) {
      this.initCard()
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      //        this.initCard()
    })
  },
  methods: {
    layoutUpdatedEvent: function(newLayout) {
      localStorage.setItem('cards', JSON.stringify(newLayout))
    },
    updateName(e) {
      this.$set(this.cardArray, e.i, { ...this.cardArray[e.i], name: e.name })
      localStorage.setItem('cards', JSON.stringify(this.cardArray))
    },
    deleteCard(e) {
      this.cardArray.splice(this.cardArray.findIndex(item => item.i === e.i), 1)
      localStorage.setItem('cards', JSON.stringify(this.cardArray))
    },
    shapeChange(e) {
      let shapeHeight
      let shape1h = 10
      let shape2h = 20
      let options
      this.$set(this.cardArray, e.i, { ...this.cardArray[e.i], shape: e.shape })
      switch (e.shape) {
        case 1:
          options = {
            maxHeight: '280',
            height: '280'
          }
          this.$set(this.cardArray, e.i, { ...this.cardArray[e.i], w: 3 })
          shapeHeight = shape1h
          break
        case 2:
          options = {
            maxHeight: '280',
            height: '280'
          }
          this.$set(this.cardArray, e.i, { ...this.cardArray[e.i], w: 6 })
          shapeHeight = shape1h
          break
        case 3:
          options = {
            maxHeight: '730',
            height: '780'
          }
          this.$set(this.cardArray, e.i, { ...this.cardArray[e.i], w: 3 })
          shapeHeight = shape2h
          break
      }
      if (e.closed || e.show === false) {
        this.$set(this.cardArray, e.i, { ...this.cardArray[e.i], h: 2 })
        this.$set(this.cardArray, e.i, { ...this.cardArray[e.i], show: false })
      } else {
        this.$set(this.cardArray, e.i, { ...this.cardArray[e.i], options: options })
        this.$set(this.cardArray, e.i, { ...this.cardArray[e.i], h: shapeHeight })
        this.$set(this.cardArray, e.i, { ...this.cardArray[e.i], show: true })
      }
      localStorage.setItem('cards', JSON.stringify(this.cardArray))
      shape1h = null
      shape2h = null
      options = null
    },
    initCard() {
      this.cardArray = [].concat(this.layout)
      this.cardArray.map((x, i) => {
        if (x.x === 0 && x.y === 0) {
          x.x = this.cardX[i % 4]
          x.y = 10 * Math.floor(i / 4)
        }
        x.i = x.i ? x.i : i
        switch (x.shape) {
          case 1:
            x.w = 3
            x.h = 10
            break
          case 2:
            x.w = 6
            x.h = 10
            break
          case 3:
            x.w = 3
            x.h = 20
            break
        }
        this.shapeChange(x)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../styles/mixin';

  .card-layout {
    height: 100%;
    width: calc(100%);

    /deep/ .vue-grid-item.vue-grid-placeholder {
      @include color(background-color);
    }
  }

  .vue-grid-layout {
    cursor: default;
  }
</style>
