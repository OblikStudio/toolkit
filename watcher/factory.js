function findAncestorByAttribute (node, attribute) {
  while (node = node.parentElement) {
    if (node.hasAttribute(attribute)) {
      return node
    }
  }

  return null
}

export function create (node, module, meta) {
  var parent = null
  var parentModule = null
  var moduleInstance = null

  if (meta.parentAttribute) {
    parent = findAncestorByAttribute(node, meta.parentAttribute)

    if (parent) {
      parentModule = parent.minibits && parent.minibits[meta.parentName]

      if (!parentModule) {
        throw new Error(`Module instance of parent ${ meta.parentAttribute } not found.`)
      }
    } else {
      throw new Error(`Parent ${ meta.parentAttribute } not found.`)
    }
  }

  if (typeof module === 'function') {
    moduleInstance = new module(node, meta.value, parentModule)
  }

  var moduleName = meta.moduleName
  if (moduleInstance && typeof moduleInstance._name === 'string') {
    moduleName = moduleInstance._name
  }

  if (parentModule) {
    if (moduleInstance) {
      if (typeof parentModule._addModule === 'function') {
        parentModule._addModule(moduleInstance)
      }

      if (typeof parentModule.emit === 'function') {
        parentModule.emit(moduleName + ':add', moduleInstance)
      }
    } else {
      if (typeof parentModule.emit === 'function') {
        parentModule.emit('node:' + moduleName + ':add', node, meta.value)
      } else {
        parentModule[moduleName] = {
          element: node,
          value: meta.value
        }
      }
    }
  }

  return moduleInstance
}

export function destroy (node, instance, meta) {
  if (typeof instance.destroy === 'function') {
    instance.destroy()
  }

  // TODO: notify parent similarly to create()
}
