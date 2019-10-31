/**
 * @todo avoid reflow after each element
 */

import Component from '../../component'
import { ElementObserver } from '../../../utils/element-observer'

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

export class Item extends Component<HTMLElement> {
  observer: ElementObserver
  $parent: Masonry

  create () {
    this.observer = new ElementObserver(this.$element, ['offsetTop', 'offsetHeight'])
    this.observer.on('change', () => {
      this.$parent.updateItems()
    })
  }

  destroy () {
    this.observer.destroy()
  }
}

export class Masonry extends Component<HTMLElement> {
  static components = {
    item: Item
  }

  $item: Item[] = []

  init () {
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
        if (previousNode.offsetTop < node.offsetTop) {
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
}

export default Masonry
