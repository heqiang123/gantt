<template>
  <div class="ag-block" :class="manzuStyle">
    <span v-if="values === 'AG600'">需求{{ scope.row.AG600.val1 }}</span>
    <span v-else-if="values === 'AG700'">需求{{ scope.row.AG700.val1 }}</span>
    <span v-else-if="values === 'AG800'">需求{{ scope.row.AG800.val1 }}</span>
    <span v-if="values === 'AG600'">可用{{ scope.row.AG600.val2 }}</span>
    <span v-else-if="values === 'AG700'">可用{{ scope.row.AG700.val2 }}</span>
    <span v-else-if="values === 'AG800'">可用{{ scope.row.AG800.val2 }}</span>
  </div>
</template>
<script>
export default {
  name: 'Agblock',
  props: {
    scope: {
      type: Object,
      default: () => {
        return {}
      }
    },
    values: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  computed: {
    manzuStyle() {
      if (this.values === 'AG600') {
        if (this.scope.row.AG600.val2 === 0) {
          return 'bu-man'
        } else if (this.scope.row.AG600.val1 > this.scope.row.AG600.val2) {
          return 'bu-fen'
        } else if (this.scope.row.AG600.val1 === this.scope.row.AG600.val2) {
          return 'quan-bu'
        } else {
          return ''
        }
      } else if (this.values === 'AG700') {
        if (this.scope.row.AG700.val2 === 0) {
          return 'bu-man'
        } else if (this.scope.row.AG700.val1 > this.scope.row.AG700.val2) {
          return 'bu-fen'
        } else if (this.scope.row.AG700.val1 === this.scope.row.AG700.val2) {
          return 'quan-bu'
        } else {
          return ''
        }
      } else if (this.values === 'AG800') {
        if (this.scope.row.AG800.val2 === 0) {
          return 'bu-man'
        } else if (this.scope.row.AG800.val1 > this.scope.row.AG800.val2) {
          return 'bu-fen'
        } else if (this.scope.row.AG800.val1 === this.scope.row.AG800.val2) {
          return 'quan-bu'
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  },
  mounted() {
    console.log(this.values)
  }
}
</script>
<style lang="scss">
  .ag-block {
    width: 100%;
    color: #ffffff;
    font-size: 12px;
    padding: 0 8px;
    text-align: left;
    box-sizing: border-box;
    span {
      display: block;
      height: 18px;
    }
  }
  .bu-man {
    background: rgb(230, 165, 107);
  }
  .bu-fen {
    background: rgb(107, 168, 230);
  }
  .quan-bu {
    background: rgb(101, 180, 109);
  }
</style>
