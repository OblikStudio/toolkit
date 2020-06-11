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

export class Watcher {
	private instances: Map<Element, { [key: string]: Component }>
	private attrRegex: RegExp
	private mutations: MutationEmitter

	target: Element
	options: WatcherSettings

	constructor (element: Element, settings: WatcherSettings) {
		this.target = element
		this.options = merge({
			prefix: 'ob',
			components: {}
		}, settings)

		this.instances = new Map()
		this.attrRegex = new RegExp(`^${this.options.prefix}\\-(.*)`)

		this.mutations = new MutationEmitter(node => {
			if (node instanceof Element) {
				for (let attribute of node.attributes) {
					if (this.attrRegex.exec(attribute.name)) {
						return true
					}
				}
			}
		})

		this.mutations.on('before:add', this.createComponents, this)
		this.mutations.on('after:add', this.initComponents, this)
		this.mutations.on('before:move', this.moveComponents, this)
		this.mutations.on('after:move', this.initComponents, this)
		this.mutations.on('before:remove', this.destroyComponents, this)

		this.mutations.init(this.target, {
			childList: true,
			subtree: true
		})
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
			let meta = attribute(entry, this.attrRegex)

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
		this.mutations.search(this.target, 'add')
	}

	instance (element: Element, id: string) {
		return this.instances.get(element)?.[id]
	}

	destroy () {
		this.target = null
		this.instances.clear()
		this.mutations.destroy()
	}
}

export default Watcher
