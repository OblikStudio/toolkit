import { get as getAttribute } from './utils/attributes'

var _prefix = 'mb-'
var _modules = {}

function findBits (node, callback) {
	if (!node || node.nodeType !== 1) {
		return
	}

	var attrs = getAttribute(node, _prefix)
	if (attrs.length) {
		callback(node, attrs)
	}

	node = node.firstElementChild

	while (node) {
		findBits(node, callback)
		node = node.nextElementSibling
	}
}

function applyBits (node, attributes) {
	if (!node.minibits) {
		node.minibits = {}
	}

	attributes.forEach(attr => {
		var moduleName = attr.name

		if (!node.minibits[moduleName]) {
			if (typeof _modules[moduleName] === 'function') {
				node.minibits[moduleName] = new _modules[moduleName](node, attr.value)
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
	_modules = modules
}
