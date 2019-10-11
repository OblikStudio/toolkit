import { value, attribute, ComponentMeta } from './parse'
import { Observer, findAncestor } from '../utils'
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
  element: HTMLElement
  components: ComponentList
  attrRegex: RegExp
  observer: Observer
  hosts: Map<Element, ComponentInstances>

  constructor (element: HTMLElement, settings: WatcherSettings) {
    this.element = element
    this.components = settings.components || {}
    let prefix = settings.prefix || 'ob'

    this.hosts = new Map()
    this.attrRegex = new RegExp(`^${ prefix }\\-(.*)`)

    this.observer = new Observer(this.element, node => {
      if (node instanceof HTMLElement) {
        for (let attribute of node.attributes) {
          if (this.attrRegex.exec(attribute.name)) {
            return true
          }
        }
      }
    })

    this.observer.on('added', this.createComponents.bind(this))
    this.observer.on('removed', this.destroyComponents.bind(this))
    this.observer.on('searched', this.initComponents.bind(this))
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

  getConstructor (componentId: string) {
    let path = componentId.split('-')
    let name = path.shift()
    let ctor = this.components[name]

    if (path.length && ctor) {
      for (let childName of path) {
        let child = ctor.$components && ctor.$components[childName]

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

  getComponentAttributes (element: Element) {
    let results: ComponentMeta[] = []

    for (let entry of element.attributes) {
      let meta = attribute(entry, this.attrRegex)

      if (meta) {
        results.push(meta)
      }
    }

    return results
  }

  createComponents (element: HTMLElement) {
    let attributes = this.getComponentAttributes(element)
    let instances = this.hosts.get(element)

    if (!instances) {
      instances = {}
      this.hosts.set(element, instances)
    }

    attributes.forEach(meta => {
      if (instances[meta.name]) {
        return
      }

      let Constructor = this.getConstructor(meta.id)
      let parentElement = null
      let parent = null

      if (meta.parentAttr) {
        parentElement = findAncestor(element, element => element.hasAttribute(meta.parentAttr))
        parent = this.getInstance(parentElement, meta.parentId)

        if (!parent) {
          throw new Error(`Parent element of ${ meta.name } not found: ${ meta.parentAttr }`)
        }
      }

      instances[meta.id] = new Constructor(element, value(meta.value), parent)
    })
  }

  destroyComponents (element: HTMLElement) {
    let instances = this.hosts.get(element)

    if (instances) {
      for (let name in instances) {
        if (typeof instances[name]._destroy === 'function') {
          instances[name]._destroy()
        }

        delete instances[name]
      }

      this.hosts.delete(element)
    }
  }

  initComponents (element: HTMLElement) {
    let instances = this.hosts.get(element)
    if (instances) {
      for (let name in instances) {
        if (typeof instances[name]._init === 'function') {
          instances[name]._init()
        }
      }
    }
  }

  init () {
    this.observer.add(this.element)
  }
}

export default Watcher
