var _prefix = 'mb-'
var _modules = {}

function getAttributes (element) {
	var values = []

	for (var attribute of element.attributes) {
		if (attribute.name.indexOf(_prefix) === 0) {
			values.push(attribute.name.substr(_prefix.length))
		}
	}

	return values
}

function findBits (node, callback) {
	if (!node || node.nodeType !== 1) {
		return
	}

	var attrs = getAttributes(node)
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
	attributes.forEach(attr => {
		if (typeof _modules[attr] === 'function') {
			_modules[attr](node)
		}
	})
}

export function register (modules) {
	_modules = modules
}

export function init () {
	var observer = new MutationObserver(mutationsList => {
		mutationsList.forEach(mutation => {
			if (mutation.addedNodes.length) {
				mutation.addedNodes.forEach(node => {
					findBits(node, applyBits)
				})
			}
		})
	})

	observer.observe(document.body, {
		childList: true,
		subtree: true
	})

	findBits(document.body, applyBits)
}
