import { parse } from '../query'

function query (input: string, element: Element) {
	let elements = parse(element, input)

	if (elements.length === 1) {
		return elements[0]
	} else {
		return elements
	}
}

export function resolve (options: object, context: Element) {
	for (let name in options) {
		let value = options[name]

		if (typeof value === 'string' && name.indexOf('$') === 0 && name !== '$preset') {
			let newName = name.substr(1)

			options[newName] = query(value, context)
			delete options[name]
		} else if (value && typeof value === 'object') {
			resolve(value, context)
		}
	}
}
