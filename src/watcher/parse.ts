import { Parser } from 'slic'

export interface ComponentMeta {
  attr: string
  value: string

  id: string
  name: string
  parentId: string
  parentName: string
  parentAttr: string
}

const slic = new Parser()

export function value (input) {
  if (!input || typeof input !== 'string') {
    return undefined
  }

	if (input.length && input[0] === '{') {
		return JSON.parse(input)
	} else {
		return slic.parse(input)
	}
}

export function attribute (attr: Attr, regex: RegExp): ComponentMeta {
  let matches = regex.exec(attr.name)
  
  if (matches) {
    let id = matches[1]
    let split = id.split('-')
    let name = split.pop()
    let parentId = split.join('-')
    let parentName = split.pop()
    let parentAttr = null

    if (parentName) {
      parentAttr = attr.name.replace(id, parentId)
    } else {
      parentId = null
      parentName = null
    }

    return {
      attr: attr.name,
      value: attr.value,
      id,
      name,
      parentId,
      parentName,
      parentAttr
    }
  }

  return null
}
