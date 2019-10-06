import { Parser } from 'slic'
import { Observer } from '../utils'
import * as factory from './factory'
import getAttributes from './attributes'
import Component from '../components/component'

const slic = new Parser()

interface ComponentList {
  [key: string]: ComponentSchema
}

interface ComponentSchema {
  definition: typeof Component,
  components: ComponentList
}

interface ComponentInstances {
  [key: string]: Component
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
  prefix: string
  components: ComponentList
}

let defaults: Partial<WatcherSettings> = {
  prefix: 'ob',
  components: {}
}

function findAncestorByAttribute (element: Element, attribute: string) {
  while (element = element.parentElement) {
    if (element.hasAttribute(attribute)) {
      return element
    }
  }

  return null
}

function findParentComponent (node, meta) {
  var parent = null
  var parentComponent = null

  if (meta.parentAttribute) {
    parent = findAncestorByAttribute(node, meta.parentAttribute)

    if (parent) {
      parentComponent = parent.minibits && parent.minibits[meta.parentName]

      if (!parentComponent) {
        throw new Error(`Component instance of parent ${ meta.parentAttribute } not found.`)
      }
    } else {
      throw new Error(`Parent ${ meta.parentAttribute } not found.`)
    }
  }

  return parentComponent
}

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
  element: HTMLElement
  components: ComponentList
  attrRegex: RegExp
  observer: Observer
  hosts: Map<Element, ComponentInstances>

  constructor (element: HTMLElement, settings: WatcherSettings) {
    settings = Object.assign(settings, defaults)

    this.element = element
    this.components = settings.components
    this.attrRegex = new RegExp(`^${ settings.prefix }\\-(.*)`)

    this.observer = new Observer(this.element, node => {
      if (element instanceof HTMLElement) {
        // @ts-ignore
        for (let attribute of element.attributes) {
          if (this.attrRegex.exec(attribute.name)) {
            return true
          }
        }
      }
    })
  }

  getInstance (element: Element): ComponentInstances
  getInstance (element: Element, componentName: string): Component
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

  getDefinition (componentId: string) {
    let path = componentId.split('-')
    let name = path.shift()
    let model = this.components[name]

    if (model) {
      for (let childName of path) {
        let subcomponents = model.components
        if (subcomponents && subcomponents[childName]) {
          model = subcomponents[childName]
        } else {
          throw new Error(`Missing subcomponent of ${ name }: ${ childName }`)
        }
      }
      
      if (typeof model.definition === 'function') {
        return model.definition
      } else {
        throw new Error(`Missing definition: ${ componentId }`)
      } 
    } else {
      throw new Error(`Missing component: ${ name }`)
    }
  }

  parseComponentAttribute (attr: Attr): ComponentMeta {
    let matches = this.attrRegex.exec(attr.name)
    
    if (matches) {
      let id = matches[1]
      let split = id.split('-')
      let name = split.pop()
      let parentId = split.join('-')
      let parentName = split.pop()
      let parentAttr = attr.name.replace(id, parentId)

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

      let definition = this.getDefinition(meta.name)
      let parent = null

      if (meta.parentAttr) {
        let parentElement = findAncestorByAttribute(element, meta.parentAttr)
        let parentInstance = this.getInstance(parentElement, meta.parentId)

        let instance = new definition(element, parseValue(meta.value), parentInstance)
        instance._name = meta.name

        var parentComponent = findParentComponent(node, meta)
        instance.$parent = parentComponent

        if (parentComponent) {
          if (typeof parentComponent.$addComponent === 'function') {
            parentComponent.$addComponent(instance)
          }

          updateChildStorage(parentComponent, instance)
        }

        instances[meta.name] = factory.create(element, definition, meta)
      } else if (!meta.parentName) {
      }
      return console.warn(`Component definition not found: ${ meta.name }`)
    })
  }
}



const _components: ComponentList = {}

function findComponentDefinition (componentFullName: string) {
  var value = _components
  var path = componentFullName.split('-')

  for (var part of path) {
    if (value) {
      // @ts-ignore
      value = value[part]
    }
  }

  if (typeof value === 'function') {
    return value
  } else if (value && "$base" in value) {
    return value.$base
  }

  return null
}

function createComponents (node) {
  let attributes = getAttributes(node, {
    prefix: 'ob',
    separator: '-'
  })

  if (!node.minibits) {
    node.minibits = {}
  }

  attributes.forEach((data) => {
    if (!node.minibits[data.componentFullName]) {
      var definition = findComponentDefinition(data.componentFullName)
      if (!definition && !data.parentAttribute) {
        // If a component has no definition and it's not a child component, ignore it.
        console.warn(`Definition of component ${ data.componentFullName } not found.`)
        return
      }

      var instance = factory.create(node, definition, data)
      if (instance) {
        node.minibits[data.componentFullName] = instance
      }
    }
  })
}

function initComponents (node) {
  for (var k in node.minibits) {
    if (typeof node.minibits[k].$init === 'function') {
      node.minibits[k].$init()
    }
  }
}

function destroyComponents (node) {
  let attributes = getAttributes(node, {
    prefix: 'ob',
    separator: '-'
  })

  attributes.forEach((data) => {
    var instance = node.minibits && node.minibits[data.componentFullName]
    if (instance) {
      factory.destroy(node, instance, data)
    }
  })

  delete node.minibits
}

export function register (components) {
  Object.assign(_components, components)
}

export function init (element = document.body) {
  var observer = new Observer(element, element => {
    if (element instanceof HTMLElement) {
      // @ts-ignore
      for (let attribute of element.attributes) {
        if (attribute.name.match(/^ob\-/)) {
          return true
        }
      }
    }
  })

  observer.on('added', createComponents)
  observer.on('searched', initComponents)
  observer.on('removed', destroyComponents)

  observer.add(element)
}

export default {
  register,
  init
}
