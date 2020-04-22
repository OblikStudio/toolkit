import { Query, QueryInput } from './query'
import { execute } from './interpreter'

export type QueryTarget = string | QueryInput

/**
 * Executes `query` string on `target`. If `target` is string, it is used as
 * `query`. Use `type` to filter elements by `instanceof type`.
 */
export function parse<T extends typeof Element>(target: QueryTarget, query: string, type: T): InstanceType<T>[]
/**
 * Executes `query` string on `target`. If `target` is string, it is used as
 * `query`.
 */
export function parse(target: QueryTarget, query?: string): Element[]
export function parse(target: QueryTarget, query?: string, type?: any) {
  let instance = new Query()
  let instructions = null

  if (typeof target === 'string') {
    query = target
    target = null
  }

  if (typeof query === 'string') {
    let split = query.split('@')
    let selector = split[0]
    instructions = split[1]

    if (selector.length) {
      target = document.querySelectorAll(selector)
    }
  }

  let input = target as QueryInput
  instance.add(input)
  
  if (instructions) {
    instance = execute(instance, instructions)
  }

  let elements = instance.elements
  let count = elements.length

  if (typeof type === 'function') {
    elements = elements.filter(element => {
      return element instanceof type
    })

    if (count && !elements.length) {
      throw new Error(`No matched elements are of type: ${ type.name }`)
    }
  }

  return elements
}

export {
  Query,
  QueryInput
}

export default parse
