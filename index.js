import { get as getAttributes } from './utils/attributes'

const _modules = {}
const _settings = {
	prefix: 'mb',
	separator: '-'
}

function findBits (node, callback) {
	if (!node || node.nodeType !== 1) {
		return
	}

	var attrs = getAttributes(node, _settings)
	if (attrs.length) {
		callback(node, attrs)
	}

	node = node.firstElementChild

	while (node) {
		findBits(node, callback)
		node = node.nextElementSibling
	}
}

function findAncestor (node, attribute) {
	while (node = node.parentElement) {
		if (node.hasAttribute(attribute)) {
			return node
		}
	}

	return null
}

function findModule (moduleFullName) {
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

function createModule (node, meta) {
	var name = meta.moduleFullName
	var module = findModule(name)
	var moduleInstance = null
	var parent = null
	var parentModule = null

	if (meta.parentAttribute) {
		parent = findAncestor(node, meta.parentAttribute)

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

		if (parentModule) {
      parentModule.emit(moduleInstance._name + ':add', moduleInstance) // emit only after child has initialized
		}
	} else {
		if (parentModule) {
			// do this if parent is instance of BaseClass and has emit
			parentModule.emit('node:' + meta.moduleName + ':add', node)
			// else do something like
			// parentModule[name] = node
		}
	}

	return moduleInstance
}

function applyBits (node, attributes) {
	if (!node.minibits) {
		node.minibits = {}
	}

	attributes.forEach((data) => {
		var module = null

		if (!node.minibits[data.moduleFullName]) {
			module = createModule(node, data)

			if (module) {
				node.minibits[data.moduleFullName] = module
			}
		}
	})
}

function removeBits (node, attributes) {
	if (!node.minibits) {
		return
	}

	for (var k in node.minibits) {
		if (typeof node.minibits[k].destroy === 'function') {
			node.minibits[k].destroy()
		}
	}

	delete node.minibits
}

export function init () {
	var observer = new MutationObserver(mutationsList => {
		mutationsList.forEach(mutation => {
			if (mutation.removedNodes.length) {
				for (var node of mutation.removedNodes) {
					findBits(node, removeBits)
				}
			}

			if (mutation.addedNodes.length) {
				for (var node of mutation.addedNodes) {
					findBits(node, applyBits)
				}
			}
		})
	})

	observer.observe(document.body, {
		childList: true,
		subtree: true
	})

	findBits(document.body, applyBits)
}

export function register (modules) {
	Object.assign(_modules, modules)
}
