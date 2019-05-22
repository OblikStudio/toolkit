import Composite from '../modules/composite'

function findAncestorByAttribute (node, attribute) {
  while (node = node.parentElement) {
    if (node.hasAttribute(attribute)) {
      return node
    }
  }

  return null
}

function findParentModule (node, meta) {
  var parent = null
  var parentModule = null

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

  return parentModule
}

function updateChildStorage (parentModule, childModule, remove = false) {
  var key = '$' + childModule._name
  var value = parentModule[key]

  if (Array.isArray(value)) {
    var index = value.indexOf(childModule)
    var added = index >= 0

    if (remove) {
      if (added) {
        value.splice(index, 1)
      }
    } else if (!added) {
      value.push(childModule)
    }
  } else {
    if (remove) {
      if (value === childModule) {
        parentModule[key] = null
      }
    } else {
      parentModule[key] = childModule
    }
  }
}

export function create (node, module, meta) {
  var instance = null
  var parentModule = findParentModule(node, meta)

  if (typeof module === 'function') {
    instance = new module(node, meta.value, parentModule)

    // Handle modules that are plain functions.
    if (!(instance instanceof Composite)) {
      instance._name = meta.moduleName
      instance.$parent = parentModule
    }
  } else {
    instance = new Composite(meta.moduleName, node, meta.value, parentModule)
    instance._unregistered = true
  }

  if (parentModule) {
    if (typeof parentModule.$addModule === 'function') {
      parentModule.$addModule(instance)
    }

    updateChildStorage(parentModule, instance)
  }

  return instance
}

export function destroy (node, instance, meta) {
  if (instance.destroy === 'function') {
    instance.destroy()
  }

  var parentModule = instance.$parent
  if (parentModule) {
    if (typeof parentModule.$removeModule === 'function') {
      parentModule.$removeModule(instance)
    }

    updateChildStorage(parentModule, instance, true)
  }
}
