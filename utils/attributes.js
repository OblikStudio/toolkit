export function parseName (input, separator) {
	var split = input.split(separator)
	var prefix = split.shift()
	var moduleFullName = split.join(separator)
	var moduleName = split.pop()

	var parentName = null
	var parentAttribute = null

	if (split.length) {
		parentName = split.join(separator)
		parentAttribute = [prefix, parentName].join(separator)
	}

	return {
		prefix,
		moduleName,
		moduleFullName,
		parentName,
		parentAttribute
	}
}

export function parseValue (input) {
	if (input.length && input[0] === '{') {
		return JSON.parse(input)
	}

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

export function get (element, settings) {
	var values = []

	for (var attribute of element.attributes) {
		if (attribute.name.indexOf(settings.prefix) === 0) {
			values.push({
				...parseName(attribute.name, settings.separator),
				value: parseValue(attribute.value)
			})
		}
	}

	return values
}
