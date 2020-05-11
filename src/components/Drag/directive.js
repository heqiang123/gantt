import Vue from 'vue'

const drag = {}
drag.install = vue => {
  Vue.directive('drag', {
    inserted: function(el, binding, VNode) {
      el.style.position = 'relative'
      const bodyWrap = document.createElement('div')
      const bodyWrapper = 'position:absolute;top:0;left:0;height:100%;width:100%;background-color:transparent;z-index:99999'
      bodyWrap.setAttribute('style', bodyWrapper)
      const currentDiv = el
      let startTop = null
      if (binding.value && binding.value.includes('right')) {
        const divEleRight = document.createElement('div')
        const divDragRight = 'position:absolute;right:0;top:0;background-color:transparent;height:100%;width:4px;cursor:e-resize'
        divEleRight.setAttribute('style', divDragRight)
        el.appendChild(divEleRight)
        divEleRight.onmousedown = e => {
          e.preventDefault()
          let left = null
          document.body.appendChild(bodyWrap)
          document.body.style.cursor = 'e-resize'
          document.onmousemove = e => {
            e.stopPropagation()
            left = e.clientX - currentDiv.offsetLeft
            currentDiv.style.minWidth = left + 'px'
          }
          document.onmouseup = e => {
            e.preventDefault()
            document.body.removeChild(bodyWrap)
            document.body.style.cursor = null
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      } else if (binding.value && binding.value.includes('bottom')) {
        const divEleBottom = document.createElement('div')
        const divDragBottom = 'position:absolute;bottom:0;left:0;background-color:transparent;height:4px;width:100%;cursor:s-resize'
        divEleBottom.setAttribute('style', divDragBottom)
        el.appendChild(divEleBottom)
        divEleBottom.onmousedown = e => {
          e.preventDefault()
          let top = null
          document.body.appendChild(bodyWrap)
          document.body.style.cursor = 's-resize'
          document.onmousemove = e => {
            e.stopPropagation()
            top = e.clientY - currentDiv.offsetTop
            currentDiv.style.height = top + 'px'
          }
          document.onmouseup = e => {
            e.preventDefault()
            document.body.removeChild(bodyWrap)
            document.body.style.cursor = null
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      } else if (binding.value && binding.value.includes('left')) {
        const divEleLeft = document.createElement('div')
        const divDragLeft = 'position:absolute;left:0;top:0;background-color:transparent;height:100%;width:4px;cursor:e-resize'
        divEleLeft.setAttribute('style', divDragLeft)
        el.appendChild(divEleLeft)
        divEleLeft.onmousedown = e => {
          e.preventDefault()
          let left = null
          document.body.appendChild(bodyWrap)
          document.body.style.cursor = 'e-resize'
          const divLeft = currentDiv.offsetLeft
          const divWidth = currentDiv.offsetWidth
          document.onmousemove = e => {
            e.stopPropagation()
            left = divWidth - (e.clientX - divLeft)
            currentDiv.style.marginLeft = (e.clientX - divLeft) + 'px'
            currentDiv.style.width = left + 'px'
          }
          document.onmouseup = e => {
            e.preventDefault()
            document.body.removeChild(bodyWrap)
            document.body.style.cursor = null
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      } else if (binding.value && binding.value.includes('top')) {
        const divEleTop = document.createElement('div')
        const divDragTop = 'position:absolute;top:0;left:0;background-color:transparent;height:4px;width:100%;cursor:s-resize'
        divEleTop.setAttribute('style', divDragTop)
        el.appendChild(divEleTop)
        divEleTop.onmousedown = e => {
          e.preventDefault()
          let top = null
          document.body.appendChild(bodyWrap)
          document.body.style.cursor = 's-resize'
          let isTop = false
          const topY = currentDiv.offsetTop
          const divHeight = currentDiv.offsetHeight
          if (!startTop) {
            startTop = topY
          }
          currentDiv.style.marginTop ? isTop = true : isTop = false
          document.onmousemove = e => {
            e.stopPropagation()
            if (e.clientY > topY) {
              top = divHeight - (e.clientY - topY)
              currentDiv.style.height = top + 'px'
              if (isTop) {
                currentDiv.style.marginTop = (e.clientY - startTop) + 'px'
              } else {
                currentDiv.style.marginTop = (e.clientY - topY) + 'px'
              }
            } else {
              top = divHeight + (topY - e.clientY)
              currentDiv.style.height = top + 'px'
              currentDiv.style.marginTop = (e.clientY - startTop) + 'px'
            }
          }
          document.onmouseup = e => {
            e.preventDefault()
            document.body.removeChild(bodyWrap)
            document.body.style.cursor = null
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  })
}
export default drag
