import Parser from './parser'
import Query from './query'

const RE_NUMBER = /^\d+$/
const parser = new Parser

function argument (arg: any) {
	if (typeof arg === 'string') {
		if (arg.length) {
			if (arg.match(RE_NUMBER)) {
				return parseInt(arg)
			} else {
				return arg
			}
		}
	}
}

export function execute (query: Query, instructions: string) {
	let actions = parser.parse(instructions)

	for (let action of actions) {
		if (typeof query[action.name] === 'function') {
			query = query[action.name](argument(action.arg))
		} else {
			throw new Error(`Invalid query method: ${ action.name }`)
		}
	}

	return query
}
