import Component from '../../component'

function getNodeBottom (node) {
  return node.offsetTop + node.offsetHeight + parseInt(window.getComputedStyle(node).marginBottom)
}

function nodesIntersect (a, b) {
  var halfA = (a.offsetWidth / 2)
  var halfB = (b.offsetWidth / 2)
  var centerA = a.offsetLeft + halfA
  var centerB = b.offsetLeft + halfB
  return Math.abs(centerA - centerB) < (halfA + halfB - 1) // -1 for threshold because widths are rounded
}

class Item extends Component {
  static $name = 'item'
}

export default class extends Component {
  static $components = {
    item: Item
  }

  $item: Component[] = []
  updateHandler: () => any

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
          if (nodesIntersect(node, previousNode)) {
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