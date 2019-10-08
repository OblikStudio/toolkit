import { Parser } from 'slic'
import { Observer, findAncestor } from '../utils'
import Component from '../components/component'

interface ComponentList {
  [key: string]: Partial<typeof Component>
}

interface ComponentInstances {
  [key: string]: Component<any>
}

interface ComponentMeta {
  attr: string
  value: string

  id: string
  name: string
  parentId: string
  parentName: string
  parentAttr: string
}

interface WatcherSettings {
  prefix?: string
  components: ComponentList
}

const slic = new Parser()

function parseValue (input) {
  if (!input || typeof input !== 'string') {
    return undefined
  }

	if (input.length && input[0] === '{') {
		return JSON.parse(input)
	} else {
		return slic.parse(input)
	}
}

export class Watcher {
  static defaults: Partial<WatcherSettings> = {
    prefix: 'ob',
    components: {}
  }

  element: HTMLElement
  components: ComponentList
  attrRegex: RegExp
  observer: Observer
  hosts: Map<Element, ComponentInstances>

  constructor (element: HTMLElement, settings: WatcherSettings) {
    settings = Object.assign(Watcher.defaults, settings)

    this.element = element
    this.components = settings.components
    this.hosts = new Map()
    this.attrRegex = new RegExp(`^${ settings.prefix }\\-(.*)`)

    this.observer = new Observer(this.element, node => {
      if (node instanceof HTMLElement) {
        // @ts-ignore
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
  getInstance (element: Element, componentName: string): Component<any>
  getInstance (element: Element, componentName?: string): any {
    let instances = this.hosts.get(element)

    if (instances) {
      if (componentName) {
        return instances[componentName] || null
      } else {
        return instances
      }
    }

    return null
  }

  getConstructor (componentId: string) {
    let path = componentId.split('-')
    let name = path.shift()
    let ctor = this.components[name] as typeof Component

    if (path.length) {
      for (let childName of path) {
        let child = ctor && ctor.$components && ctor.$components[childName]

        if (child) {
          ctor = child
        } else {
          throw new Error(`Missing subcomponent of ${ name }: ${ childName }`)
        }
      }
    }

    if (typeof ctor !== 'function') {
      throw new Error(`Missing component: ${ name }`)
    }

    return ctor
  }

  parseComponentAttribute (attr: Attr): ComponentMeta {
    let matches = this.attrRegex.exec(attr.name)
    
    if (matches) {
      let id = matches[1]
      let split = id.split('-')
      let name = split.pop()
      let parentId = split.join('-')
      let parentName = split.pop()
      let parentAttr = null

      if (parentName) {
        parentAttr = attr.name.replace(id, parentId)
      } else {
        parentId = null
        parentName = null
      }

      return {
        attr: attr.name,
        value: attr.value,
        id,
        name,
        parentId,
        parentName,
        parentAttr
      }
    }

    return null
  }

  getComponentAttributes (element: Element): ComponentMeta[] {
    let results: ComponentMeta[] = []

    // @ts-ignore
    for (let entry of element.attributes) {
      let attr = entry as Attr
      let meta = this.parseComponentAttribute(attr)

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
          throw new Error(`Parent of ${ meta.name } not found: ${ meta.parentAttr }`)
        }
      }

      instances[meta.name] = new Constructor(element, parseValue(meta.value), parent)
    })
  }

  destroyComponents (element: HTMLElement) {
    let instances = this.hosts.get(element)

    if (instances) {
      for (let name in instances) {
        instances[name]._destroy()
        delete instances[name]
      }

      this.hosts.delete(element)
    }
  }

  initComponents (element: HTMLElement) {
    let instances = this.hosts.get(element)
    if (instances) {
      for (let name in instances) {
        instances[name]._init()
      }
    }
  }

  init () {
    this.observer.add(this.element)
  }
}

export default Watcher
