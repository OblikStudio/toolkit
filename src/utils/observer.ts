import { Emitter } from '.'

type EventName = 'added' | 'removed' | 'searched'

export interface Observer {
  emit(event: EventName, node: Node): this
  on(event: EventName, callback: (node: Node) => void): this
}

export class Observer extends Emitter {
  node: Node
  predicate: (input: Node) => boolean
  observer: MutationObserver
  
  /**
   * Creates a MutationObserver on a Node and emits events based on whether
   * changed nodes pass through a predicate function.
   */
  constructor (node: Node, predicate: Observer['predicate']) {
    super()
    this.node = node
    this.predicate = predicate

    this.observer = new MutationObserver(this.handleMutations.bind(this))
    this.observer.observe(this.node, {
      childList: true,
      subtree: true
    })
  }

  search (node: Node, callback: (node: Node) => void) {
    if (this.predicate(node) === true) {
      callback(node)
    }

    if (node instanceof Element) {
      // Children must be cached in an array before iteration because event
      // listeners might alter the child list.
      Array.from(node.childNodes).forEach(node => {
        this.search(node, callback)
      })
    }

    this.emit('searched', node)
  }

  add (node: Node) {
    this.search(node, node => {
      this.emit('added', node)
    })
  }

  remove (node: Node) {
    this.search(node, node => {
      this.emit('removed', node)
    })
  }

  handleMutations (list: MutationRecord[]) {
    list.forEach(mutation => {
      mutation.removedNodes.forEach(node => {
        this.remove(node)
      })

      mutation.addedNodes.forEach(node => {
        this.add(node)
      })
    })
  }

  destroy () {
    this.observer.disconnect()
  }
}
