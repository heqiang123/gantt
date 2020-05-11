<script>
export default {
  name: 'RenderCustomComponent',
  /* eslint-disable */
  props: {
    /**
       * @description v-model双向绑定的值
       */
    value: {
      required: true
    },
    /**
       * @description 传入的组件名
       */
    componentName: {
      required: true
    },
    /**
       * @description 传入的自定义参数
       */
    props: {
      default: null
    },
    /**
       * @description 传入的行数据
       */
    scope: {
      default: null
    },
    handler: {
      default: null
    }
  },
  /* eslint-enable */
  render(h) {
    const self = this
    const events = {}
    if (self.handler) {
      Object.keys(self.handler).forEach(x => {
        events[x] = (e) => {
          self.$emit(x, e)
        }
      })
    }
    events['changeData'] = function(event, a) {
      self.$emit('input', event, a)
    }
    events['addSign'] = (addrow) => {
      self.$emit('addSign', addrow)
    }
    events['componentData'] = (addrow, val) => {
      self.$emit('componentData', addrow, val)
    }
    return h(self.componentName, {
      props: {
        value: self.value,
        scope: self.scope,
        ...self.props
      },
      on: events
    })
  }
}
</script>
