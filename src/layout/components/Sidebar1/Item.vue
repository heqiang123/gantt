<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon class='menu-icon' icon-class={icon}/>)
    }

    if (title) {
      vnodes.push(<span class='menu-box-text' slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
