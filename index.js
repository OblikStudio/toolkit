var _prefix = 'mb-'
var _modules = {}

function parseAttribute (input) {
	var object = {}
	var objectEmpty = true
	var values = input.split(';')

	values.forEach(value => {
		var split = value.split(':')
		if (split.length >= 2) {
			var key = split[0].trim()
			split.shift()

			object[key] = split.join(':')
			objectEmpty = false
		}
	})

	if (objectEmpty) {
		object.default = input
	}

	return object
}

function getAttributes (element) {
	var values = []

	for (var attribute of element.attributes) {
		if (attribute.name.indexOf(_prefix) === 0) {
			values.push({
				name: attribute.name.substr(_prefix.length),
				value: parseAttribute(attribute.value)
			})
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
	if (!node.minibits) {
		node.minibits = {}
	}

	attributes.forEach(attr => {
		var moduleName = attr.name

		if (
			!node.minibits[moduleName] &&
			typeof _modules[moduleName] === 'function'
		) {
			node.minibits[moduleName] = _modules[moduleName](node, attr.value) || true
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
