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

function applyBits (node, attributes) {
	if (!node.minibits) {
		node.minibits = {}
	}

	attributes.forEach(({ moduleFullName, parentAttribute, parentName, value }) => {
		if (node.minibits[moduleFullName]) {
			return
		}

		var module = findModule(moduleFullName)
		if (module) {
			if (parentAttribute) {
				var parent = findAncestor(node, parentAttribute)
				var parentModule = null

				if (parent) {
					parentModule = parent.minibits && parent.minibits[parentName]
				}

				if (parentModule) {
					node.minibits[moduleFullName] = new module(node, value, parentModule)
				} else {
					console.warn(`Parent module instance of ${ moduleFullName } not found`)
				}
			} else {
				node.minibits[moduleFullName] = new module(node, value)
			}
		} else {
			console.warn(`Module ${ moduleFullName } not found`)
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
