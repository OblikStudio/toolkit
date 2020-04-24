import { Emitter } from '../utils/emitter'

export interface MutationEmitter {
	emit (event: string, node: Node): any
	on (event: string, callback: (node: Node) => void, context?: any): any
}

export class MutationEmitter extends Emitter {
	predicate: (input: Node) => boolean
	observer: MutationObserver

  /**
   * Creates a MutationObserver and emits events based on whether changed nodes
   * and their children pass through a predicate function.
   */
	constructor (predicate: MutationEmitter['predicate']) {
		super()

		this.predicate = predicate
		this.observer = new MutationObserver(list => this._handleMutations(list))
	}

	_handleMutations (list: MutationRecord[]) {
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

		removed.forEach(node => this.search(node, 'remove'))
		moved.forEach(node => this.search(node, 'move'))
		added.forEach(node => this.search(node, 'add'))
	}

	search (node: Node, event: string) {
		if (this.predicate(node) === true) {
			this.emit(`before:${ event }`, node)
		}

		if (node instanceof Element) {
			// Children must be cached in an array before iteration because event
			// listeners might alter the child list.
			Array.from(node.childNodes).forEach(node => {
				this.search(node, event)
			})
		}

		this.emit(`after:${ event }`, node)
	}

	observe (...args: Parameters<MutationObserver['observe']>) {
		return this.observer.observe.apply(this.observer, args)
	}

	destroy () {
		super.destroy()
		this.observer.disconnect()
	}
}
