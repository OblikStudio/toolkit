export function parse (input) {
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

export function get (element, prefix) {
	var values = []

	for (var attribute of element.attributes) {
		if (attribute.name.indexOf(prefix) === 0) {
			values.push({
				name: attribute.name.substr(prefix.length),
				value: parse(attribute.value)
			})
		}
	}

	return values
}
