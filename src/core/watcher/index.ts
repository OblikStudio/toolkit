import { Component, ComponentConstructor } from '../..'
import { findAncestor } from '../../utils/dom'
import { merge } from '../../utils/functions'
import { MutationEmitter } from '../../utils/mutation-emitter'
import { value, attribute, ComponentMeta } from './parse'
import { resolve } from './resolve'

interface WatcherSettings {
	prefix?: string
	components: {
		[key: string]: ComponentConstructor
	}
}

export class Watcher extends MutationEmitter {
	private instances: Map<Element, { [key: string]: Component }>

	target: Element
	options: WatcherSettings

	constructor (element: Element, settings: WatcherSettings) {
		super()

		this.target = element
		this.options = merge({
			prefix: 'ob-',
			components: {}
		}, settings)

		this.instances = new Map()
	}

	protected predicate (node: Node) {
		if (node instanceof Element) {
			for (let attribute of node.attributes) {
				if (attribute.name.indexOf(this.options.prefix) === 0) {
					return true
				}
			}
		}

		return false
	}

	protected nodeMatched (node: Element, type: string) {
		switch (type) {
			case 'add': this.createComponents(node); break
			case 'move': this.moveComponents(node); break
			case 'remove': this.destroyComponents(node)
		}
	}

	protected nodeSearched (node: Element, type: string) {
		if (type === 'add' || type === 'move') {
			this.initComponents(node)
		}
	}

	private resolveConstructor (componentId: string) {
		let path = componentId.split('-')
		let name = path.shift()
		let ctor = this.options.components[name]

		if (path.length && ctor) {
			for (let childName of path) {
				let child = ctor.components?.[childName]

				if (child) {
					ctor = child
				} else {
					throw new Error(`Missing child ${childName} in: ${componentId}`)
				}
			}
		}

		if (typeof ctor !== 'function') {
			throw new Error(`Missing component: ${name}`)
		}

		return ctor
	}

	private createComponentInstance (element: Element, meta: ComponentMeta) {
		let Constructor = this.resolveConstructor(meta.id)
		let parentElement = null
		let parent = null

		if (meta.parentAttr) {
			parentElement = findAncestor(element, element => element.hasAttribute(meta.parentAttr))
			parent = this.instance(parentElement, meta.parentId)

			if (!parent) {
				throw new Error(`Parent of ${meta.name} not found: ${meta.parentAttr}`)
			}
		}

		let options = value(meta.value)
		resolve(options, element)

		return new Constructor(element, options, parent)
	}

	private getComponentMeta (element: Element) {
		let results: ComponentMeta[] = []

		for (let entry of element.attributes) {
			let meta = attribute(entry, this.options.prefix)

			if (meta) {
				results.push(meta)
			}
		}

		return results
	}

	private attempt (fn: () => void) {
		try {
			fn()
		} catch (e) {
			console.warn(e)
		}
	}

	private createComponents (element: Element) {
		let attributes = this.getComponentMeta(element)
		let instances = this.instances.get(element)

		if (!instances) {
			instances = {}
			this.instances.set(element, instances)
		}

		attributes.forEach(meta => {
			if (!instances[meta.id]) {
				this.attempt(() => {
					instances[meta.id] = this.createComponentInstance(element, meta)
				})
			}
		})
	}

	private moveComponents (element: Element) {
		let attributes = this.getComponentMeta(element)
		let instances = this.instances.get(element)

		if (!instances) {
			instances = {}
			this.instances.set(element, instances)
		}

		attributes.forEach(meta => {
			let component = instances[meta.id]
			let movable = component?.constructor?.isMovable

			if (component && !movable) {
				this.attempt(() => {
					if (typeof component.$destroy === 'function') {
						component.$destroy()
					}

					instances[meta.id] = this.createComponentInstance(element, meta)
				})
			}
		})
	}

	private initComponents (element: Element) {
		let instances = this.instances.get(element)
		if (instances) {
			for (let name in instances) {
				this.attempt(() => {
					if (typeof instances[name].$init === 'function') {
						instances[name].$init()
					}
				})
			}
		}
	}

	private destroyComponents (element: Element) {
		let instances = this.instances.get(element)
		if (instances) {
			for (let name in instances) {
				this.attempt(() => {
					if (typeof instances[name].$destroy === 'function') {
						instances[name].$destroy()
					}
				})

				delete instances[name]
			}

			this.instances.delete(element)
		}
	}

	init () {
		super.init(this.target, {
			childList: true,
			subtree: true
		})

		this.iterate(this.target, 'add')
	}

	instance (element: Element, id: string) {
		return this.instances.get(element)?.[id]
	}

	destroy () {
		this.target = null
		this.instances.clear()
		super.destroy()
	}
}

export default Watcher
