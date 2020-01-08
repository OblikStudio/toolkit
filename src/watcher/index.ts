import { defaultsDeep } from 'lodash-es'
import { value, attribute, ComponentMeta } from './parse'
import { MutationEmitter, findAncestor } from '../utils'
import { Component, ComponentConstructor } from '../components/component'

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
  element: Element
  options: WatcherSettings
  components: ComponentList
  attrRegex: RegExp
  observer: MutationEmitter
  hosts: Map<Element, ComponentInstances>

  constructor (element: Element, settings: WatcherSettings) {
    this.element = element
    this.options = defaultsDeep(settings, {
      prefix: 'ob',
      components: {}
    })

    this.hosts = new Map()
    this.attrRegex = new RegExp(`^${ this.options.prefix }\\-(.*)`)
    this.components = this.options.components

    this.observer = new MutationEmitter(node => {
      if (node instanceof Element) {
        for (let attribute of node.attributes) {
          if (this.attrRegex.exec(attribute.name)) {
            return true
          }
        }
      }
    })

    this.observer.on('before:add', this._createComponents, this)
    this.observer.on('after:add', this._initComponents, this)
    this.observer.on('before:move', this._moveComponents, this)
    this.observer.on('before:remove', this._destroyComponents, this)

    this.observer.observe(this.element, {
      childList: true,
      subtree: true
    })
  }

  getInstance (element: Element): ComponentInstances
  getInstance (element: Element, id: string): Component
  getInstance (element: Element, id?: string): any {
    let instances = this.hosts.get(element)

    if (instances) {
      if (id) {
        return instances[id] || null
      } else {
        return instances
      }
    }

    return null
  }

  _ctor (componentId: string) {
    let path = componentId.split('-')
    let name = path.shift()
    let ctor = this.components[name]

    if (path.length && ctor) {
      for (let childName of path) {
        let child = ctor.components && ctor.components[childName]

        if (child) {
          ctor = child
        } else {
          throw new Error(`Missing child ${ childName } in: ${ componentId }`)
        }
      }
    }

    if (typeof ctor !== 'function') {
      throw new Error(`Missing component: ${ name }`)
    }

    return ctor
  }

  _elementMeta (element: Element) {
    let results: ComponentMeta[] = []

    for (let entry of element.attributes) {
      let meta = attribute(entry, this.attrRegex)

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
        throw new Error(`Parent element of ${ meta.name } not found: ${ meta.parentAttr }`)
      }
    }

    return new Constructor(element, value(meta.value), parent)
  }

  _moveComponents (element: Element) {
    let attributes = this._elementMeta(element)
    let instances = this.hosts.get(element)

    if (!instances) {
      instances = {}
      this.hosts.set(element, instances)
    }

    attributes.forEach(meta => {
      let component = instances[meta.id]
      let movable = component?.constructor?.isMovable

      if (component && !movable) {
        component.$destroy()

        try {
          instances[meta.id] = this._create(element, meta)
          // $init() should be called by the `searched` handler
        } catch (e) {
          console.warn(e)
        }
      }
    })
  }

  _createComponents (element: Element) {
    let attributes = this._elementMeta(element)
    let instances = this.hosts.get(element)

    if (!instances) {
      instances = {}
      this.hosts.set(element, instances)
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

  _initComponents (element: Element) {
    let instances = this.hosts.get(element)
    if (instances) {
      for (let name in instances) {
        instances[name].$init()
      }
    }
  }

  _destroyComponents (element: Element) {
    let instances = this.hosts.get(element)
    if (instances) {
      for (let name in instances) {
        instances[name].$destroy()
        delete instances[name]
      }

      this.hosts.delete(element)
    }
  }

  init () {
    this.observer.search(this.element, 'add')
  }

  destroy () {
    this.observer.destroy()
    this.hosts.clear()
    this.hosts = null
    this.element = null
    this.components = null
  }
}

export default Watcher
