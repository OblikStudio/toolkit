const RE_NUMBER = /^\d*\.?\d+$/

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
  if (!input || typeof input !== 'string') {
    return undefined
  }

	if (input.length && input[0] === '{') {
		return JSON.parse(input)
	}

	var result = {}
	var values = input.split(';')

	values.forEach(value => {
		var split = value.split(':')
		if (split.length >= 2) {
			var key = split[0].trim()
			split.shift()
			var value = split.join(':')

      if (RE_NUMBER.test(value)) {
        value = parseFloat(value)
      } else if (value === 'true') {
        value = true
      } else if (value === 'false') {
        value = false
      }

      result[key] = value
		}
	})

	if (Object.keys(result) === 0) {
		result.default = input
	}

	return result
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
