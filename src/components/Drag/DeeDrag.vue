<template>
  <div class="drag-list-wrapper">
    <div class="drag-list-con con1">
      <slot name="left-title" />
      <draggable class="drop-box" :class="dropConClass.left" :options="options" :value="list" @input="handleListChange($event)" @end="handleEnd($event)">
        <div v-for="(item, index) in list" :key="`drag_li1_${index}`" class="drag-list-item">
          <slot name="left" :item="item" />
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'DragList',
  components: {
    draggable
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    list2: {
      type: Array,
      default: () => []
    },
    dropConClass: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      options: { group: 'drag_list' }
    }
  },
  methods: {
    handleListChange(value) {
      this.$emit('update:list', value)
    },
    handleEnd(event, type) {
      this.$emit('on-change', {
        oldIndex: event.oldIndex,
        newIndex: event.newIndex
      })
    }
  }
}
</script>
<style lang="scss">
.drag-list-wrapper{
  height: 100%;
  .drag-list-con{
    width: 100%;
  }
}
</style>
