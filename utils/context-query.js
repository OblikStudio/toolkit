const RE_NUM = /^-?\d+$/
const RE_INSTRUCTION = /.(?:(?:-?\d+)|\*)?/ig

const ACTIONS = {
  '<': function (element) {
    return element.parentElement
  },
  '>': function (element) {
    return element.children[0]
  },
  '+': function (element, modifier) {
    var prop = 'nextSibling'

    if (typeof modifier === 'number' && modifier < 0) {
      prop = 'previousSibling'
    }

    do {
      element = element[prop]
    } while (element.nodeType !== Node.ELEMENT_NODE)

    return element
  },
  ':': function (element, modifier, iteration) {
    var index = 0
    var children = element.children

    if (typeof modifier === 'number') {
      if (modifier < 0) {
        index = children.length + modifier
      } else {
        index = modifier - 1
      }
    }

    if (iteration === 0) {
      return children[index]
    } else {
      return false
    }
  }
}

function parseInstructions (input) {
  if (typeof input !== 'string' || input[0] !== '@') {
    throw new Error('Contextual select must start with "@"')
  } else {
    input = input.substr(1) // remove @
  }

  var matches = input.match(RE_INSTRUCTION)
  var instructions = matches.map((match) => {
    var type = match[0]
    var modifier = match.substr(1)

    if (modifier.length) {
      if (modifier.match(RE_NUM)) {
        modifier = parseInt(modifier)
      }
    } else {
      modifier = null
    }

    return {
      type,
      modifier
    }
  })

  return instructions
}

export default function (element, string) {
  var instructions = parseInstructions(string)
  var activeElement = element

  instructions.forEach(({ type, modifier }) => {
    var action = ACTIONS[type]
    var loops = 1

    if (!action) {
      throw new Error(`Invalid action: ${ type }`)
    }
    
    if (typeof modifier === 'number') {
      loops = Math.abs(modifier)
    }

    for (let i = 0; i < loops; i++) {
      if (!activeElement) {
        throw new Error(`Can not perform action "${ type }${ modifier }"`)
      }

      let result = action(activeElement, modifier, i)

      if (result !== false) {
        activeElement = result
      } else {
        break
      }
    }
  })

  return activeElement
}
