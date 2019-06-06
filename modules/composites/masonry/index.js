import Composite from '../../composite'

function pointInsideNode (point, node) {
  return (point >= node.offsetLeft && point <= node.offsetLeft + node.offsetWidth)
}

function getNodeBottom (node) {
  return node.offsetTop + node.offsetHeight + parseInt(window.getComputedStyle(node).marginBottom)
}

export default class extends Composite {
  constructor () {
    super('masonry', ...arguments)
    this.$item = []
  }

  $init () {
    this.updateHandler = this.updateItems.bind(this)
    window.addEventListener('resize', this.updateHandler)

    this.updateItems()
  }

  updateItems () {
    this.$item.forEach(item => {
      // Reset previous marginTop settings because they affect elements'
      // position.
      item.$element.style.marginTop = ''
    })

    var previousNodes = []
    this.$item.forEach(item => {
      var node = item.$element

      var aboveNodes = previousNodes.filter(previousNode => {
        if (previousNode.offsetTop + previousNode.offsetHeight < node.offsetTop) {
          if (
            (pointInsideNode(node.offsetLeft, previousNode)) ||
            (pointInsideNode(previousNode.offsetLeft, node))
          ) {
            return true
          }
        }
      })

      var lowestNode = aboveNodes.reduce((memo, node) => {
        if (!memo) {
          return node
        }

        var bottom = getNodeBottom(node)
        var memoBottom = getNodeBottom(memo)
        if (bottom > memoBottom) {
          return node
        } else {
          return memo
        }
      }, null)

      if (lowestNode) {
        var currentMarginTop = parseInt(window.getComputedStyle(node).marginTop)
        var marginTop = getNodeBottom(lowestNode) - node.offsetTop + (currentMarginTop * 2)

        node.style.marginTop = `${ marginTop }px`
      }

      previousNodes.push(node)
    })
  }

  $destroy () {
    window.removeEventListener('resize', this.updateHandler)
  }
}