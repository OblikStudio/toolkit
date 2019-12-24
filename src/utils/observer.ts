import { TinyEmitter } from 'tiny-emitter'

type EventName = 'added' | 'removed' | 'moved' | 'searched'

export interface Observer {
  emit(event: EventName, node: Node): this
  on(event: EventName, callback: (node: Node) => void): this
}

export class Observer extends TinyEmitter {
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

  move (node: Node) {
    this.search(node, node => {
      this.emit('moved', node)
    })
  }

  handleMutations (list: MutationRecord[]) {
    let added = []
    let removed = []
    let moved = []

    list.forEach(mutation => {
      added = added.concat(Array.from(mutation.addedNodes))
      removed = removed.concat(Array.from(mutation.removedNodes))
    })

    moved = added.filter(entry => removed.includes(entry))
    added = added.filter(entry => !moved.includes(entry))
    removed = removed.filter(entry => !moved.includes(entry))

    removed.forEach(node => this.remove(node))
    moved.forEach(node => this.move(node))
    added.forEach(node => this.add(node))
  }

  destroy () {
    this.observer.disconnect()
  }
}
