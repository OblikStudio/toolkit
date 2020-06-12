/**
 * Creates a MutationObserver and emits events based on whether changed nodes
 * and their children pass through a predicate function.
 */
export abstract class MutationEmitter {
	observer: MutationObserver

	constructor () {
		this.observer = new MutationObserver(list => this.handleMutations(list))
	}

	private handleMutations (list: MutationRecord[]) {
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

		removed.forEach(node => this.iterate(node, 'remove'))
		moved.forEach(node => this.iterate(node, 'move'))
		added.forEach(node => this.iterate(node, 'add'))
	}

	protected abstract predicate (node: Node): boolean

	protected abstract nodeMatched (node: Node, type: string): void

	protected abstract nodeSearched (node: Node, type: string): void

	protected iterate (node: Node, event: string) {
		if (this.predicate(node) === true) {
			this.nodeMatched(node, event)
		}

		if (node instanceof Element) {
			// Children must be cached in an array before iteration because
			// event listeners might alter the child list.
			Array.from(node.childNodes).forEach(node => {
				this.iterate(node, event)
			})
		}

		this.nodeSearched(node, event)
	}

	init (...args: Parameters<MutationObserver['observe']>) {
		return this.observer.observe.apply(this.observer, args)
	}

	destroy () {
		this.observer.disconnect()
	}
}
