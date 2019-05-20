import * as factory from './factory'
import Observer from './Observer'

const _modules = {}

function findModuleDefinition (moduleFullName) {
  var obj = _modules
  var path = moduleFullName.split('-')

  for (var part of path) {
    if (obj) {
      obj = obj[part]
    }
  }

  if (typeof obj === 'function') {
    return obj
  } else if (obj && typeof obj.$base === 'function') {
    return obj.$base
  }

  return null
}

function createModules (node, attributes) {
  if (!node.minibits) {
    node.minibits = {}
  }

  attributes.forEach((data) => {
    if (!node.minibits[data.moduleFullName]) {
      var definition = findModuleDefinition(data.moduleFullName)
      if (!definition && !data.parentAttribute) {
        // If a module has no definition and it's not a child module, ignore it.
        console.warn(`Definition of module ${ data.moduleFullName } not found.`)
        return
      }

      var instance = factory.create(node, definition, data)
      if (instance) {
        node.minibits[data.moduleFullName] = instance
      }
    }
  })
}

function initModules (node) {
  for (var k in node.minibits) {
    if (typeof node.minibits[k].init === 'function') {
      node.minibits[k].init()
    }
  }
}

function destroyModules (node, attributes) {
  attributes.forEach((data) => {
    var instance = node.minibits && node.minibits[data.moduleFullName]
    factory.destroy(node, instance, data)
  })

  delete node.minibits
}

export function register (modules) {
  Object.assign(_modules, modules)
}

export function init (element = document.body) {
  var observer = new Observer(element, {
    prefix: 'mb',
    separator: '-'
  })

  observer.on('added', createModules)
  observer.on('searched', initModules)
  observer.on('removed', destroyModules)

  observer.addNode(observer.element)
}

export default {
  register,
  init
}
