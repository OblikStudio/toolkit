import { defaultsDeep } from 'lodash-es'
import { Component, ComponentConstructor } from '../..'
import { MutationEmitter, findAncestor } from '..'
import { value, attribute, ComponentMeta } from './parse'

interface ComponentList {
	[key: string]: ComponentConstructor
}

interface ComponentInstances {
	[key: string]: Component
}

interface WatcherSettings {
	prefix?: string
	components: ComponentList
}

export class Watcher {
	_hosts: Map<Element, ComponentInstances>
	_regex: RegExp
	_components: ComponentList
	_observer: MutationEmitter

	element: Element
	options: WatcherSettings

	constructor (element: Element, settings: WatcherSettings) {
		this.element = element
		this.options = defaultsDeep(settings, {
			prefix: 'ob',
			components: {}
		})

		this._hosts = new Map()
		this._regex = new RegExp(`^${this.options.prefix}\\-(.*)`)
		this._components = this.options.components

		this._observer = new MutationEmitter(node => {
			if (node instanceof Element) {
				for (let attribute of node.attributes) {
					if (this._regex.exec(attribute.name)) {
						return true
					}
				}
			}
		})

		this._observer.on('before:add', this._createComponents, this)
		this._observer.on('after:add', this._initComponents, this)
		this._observer.on('before:move', this._moveComponents, this)
		this._observer.on('after:move', this._initComponents, this)
		this._observer.on('before:remove', this._destroyComponents, this)

		this._observer.observe(this.element, {
			childList: true,
			subtree: true
		})
	}

	_ctor (componentId: string) {
		let path = componentId.split('-')
		let name = path.shift()
		let ctor = this._components[name]

		if (path.length && ctor) {
			for (let childName of path) {
				let child = ctor.components && ctor.components[childName]

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

	_elementMeta (element: Element) {
		let results: ComponentMeta[] = []

		for (let entry of element.attributes) {
			let meta = attribute(entry, this._regex)

			if (meta) {
				results.push(meta)
			}
		}

		return results
	}

	_create (element: Element, meta: ComponentMeta) {
		let Constructor = this._ctor(meta.id)
		let parentElement = null
		let parent = null

		if (meta.parentAttr) {
			parentElement = findAncestor(element, element => element.hasAttribute(meta.parentAttr))
			parent = this.getInstance(parentElement, meta.parentId)

			if (!parent) {
				throw new Error(`Parent element of ${meta.name} not found: ${meta.parentAttr}`)
			}
		}

		return new Constructor(element, value(meta.value), parent)
	}

	_createComponents (element: Element) {
		let attributes = this._elementMeta(element)
		let instances = this._hosts.get(element)

		if (!instances) {
			instances = {}
			this._hosts.set(element, instances)
		}

		attributes.forEach(meta => {
			if (!instances[meta.id]) {
				try {
					instances[meta.id] = this._create(element, meta)
				} catch (e) {
					console.warn(e)
				}
			}
		})
	}

	_moveComponents (element: Element) {
		let attributes = this._elementMeta(element)
		let instances = this._hosts.get(element)

		if (!instances) {
			instances = {}
			this._hosts.set(element, instances)
		}

		attributes.forEach(meta => {
			let component = instances[meta.id]
			let movable = component?.constructor?.isMovable

			if (component && !movable) {
				component.$destroy()

				try {
					instances[meta.id] = this._create(element, meta)
				} catch (e) {
					console.warn(e)
				}
			}
		})
	}

	_initComponents (element: Element) {
		let instances = this._hosts.get(element)
		if (instances) {
			for (let name in instances) {
				instances[name].$init()
			}
		}
	}

	_destroyComponents (element: Element) {
		let instances = this._hosts.get(element)
		if (instances) {
			for (let name in instances) {
				instances[name].$destroy()
				delete instances[name]
			}

			this._hosts.delete(element)
		}
	}

	init () {
		this._observer.search(this.element, 'add')
	}

	getInstance (element: Element): ComponentInstances
	getInstance (element: Element, id: string): Component
	getInstance (element: Element, id?: string): any {
		let instances = this._hosts.get(element)

		if (instances) {
			if (id) {
				return instances[id] || null
			} else {
				return instances
			}
		}

		return null
	}

	destroy () {
		this._observer.destroy()
		this._hosts.clear()

		this._hosts = null
		this._components = null
		this.element = null
	}
}

export default Watcher
