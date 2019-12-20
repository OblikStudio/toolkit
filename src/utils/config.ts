import { isObject } from 'lodash-es'

type Resource = (...args: any[]) => void
type ResourceDefinition = {
	type: string | Resource,
	options?: object
}

function isResourceDefinition (input): input is ResourceDefinition {
	return isObject(input) && 'type' in input
}

export function resource<T> (
  input: any,
  registry: { [key: string]: Resource },
  create: (resource: Resource, options: object) => T
) {
  let resource = null
  let resourceName = null
	let options = undefined

	if (isResourceDefinition(input)) {
		resourceName = input.type

		if (isObject(input.options)) {
			options = input.options
		}
	} else {
		resourceName = input
	}

	if (typeof resourceName === 'string') {
		resource = registry[resourceName]
	}

	if (typeof resource === 'function') {
		return create(resource, options)
	}

	throw new Error(`Resource not found: ${ resourceName }`)
}
