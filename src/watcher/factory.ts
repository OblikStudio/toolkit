import Component from '../components/component'

function findAncestorByAttribute (node, attribute) {
  while (node = node.parentElement) {
    if (node.hasAttribute(attribute)) {
      return node
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

function updateChildStorage (parentComponent, childComponent, remove = false) {
  var key = '$' + childComponent._name
  var value = parentComponent[key]

  if (Array.isArray(value)) {
    var index = value.indexOf(childComponent)
    var added = index >= 0

    if (remove) {
      if (added) {
        value.splice(index, 1)
      }
    } else if (!added) {
      value.push(childComponent)
    }
  } else {
    if (remove) {
      if (value === childComponent) {
        parentComponent[key] = null
      }
    } else {
      parentComponent[key] = childComponent
    }
  }
}

export function create (node, component, meta) {
  var instance = null
  var parentComponent = findParentComponent(node, meta)

  if (typeof component === 'function') {
    instance = new component(node, meta.value)
  } else {
    instance = new Component(node, meta.value)
    instance._unregistered = true
  }

  instance._name = meta.componentName
  instance.$parent = parentComponent

  if (parentComponent) {
    if (typeof parentComponent.$addComponent === 'function') {
      parentComponent.$addComponent(instance)
    }

    updateChildStorage(parentComponent, instance)
  }

  return instance
}

export function destroy (node, instance, meta) {
  if (typeof instance.$destroy === 'function') {
    instance.$destroy()
  }

  var parentComponent = instance.$parent
  if (parentComponent) {
    if (typeof parentComponent.$removeComponent === 'function') {
      parentComponent.$removeComponent(instance)
    }

    updateChildStorage(parentComponent, instance, true)
  }
}
