import Component from '../../component'

function findTexts (node: Node): Node[] {
  let texts = []

  if (node.nodeType === Node.TEXT_NODE) {
    texts.push(node)
  } else {
    for (let child of node.childNodes) {
      texts = texts.concat(findTexts(child))
    }
  }

  return texts
}

function replaceNode (node: Node, elements: Node[]) {
  let parent = node.parentNode

  elements.forEach(element => {
    parent.insertBefore(element, node)
  })

  parent.removeChild(node)
}

interface Row {
  bottom: number
  elements: HTMLElement[]
}

interface Options {
  chars: boolean,
  class: {
    char: string
    word: string
    line: string
  }
}

export default class Splitter extends Component<Options> {
  static defaults: Options = {
    chars: false,
    class: {
      char: 'text-char',
      word: 'text-word',
      line: 'text-line'
    }
  }

  createChar (text: string) {
    let elem = document.createElement('span')
    elem.classList.add(this.$options.class.char)
    elem.innerHTML = text
    return elem
  }

  splitChars (node: Node) {
    let text = node.textContent.replace(/\s+/g, '')
    let chars = text.split('')
    return chars.map(this.createChar, this)
  }

  createWord (text: string) {
    let elem = document.createElement('span')
    elem.classList.add(this.$options.class.word)
    elem.innerHTML = ` ${ text } `
    return elem
  }

  splitWords (node: Node) {
    let text = node.textContent.trim()
    let elements: Element[] = []
  
    if (text.length) {
      let words = text.split(/\s+/)
  
      elements = words.map(this.createWord, this)
    }
  
    return elements
  }

  findLines () {
    let rows: Row[] = []

    for (let child of this.$element.children) {
      if (child instanceof HTMLElement) {
        let row = rows[rows.length - 1]
        let height = child.offsetHeight
        let bottom = child.offsetTop + height

        if (!row || (bottom - row.bottom >= height)) {
          row = { bottom, elements: [] }
          rows.push(row)
        }
    
        row.elements.push(child)
      }
    }

    return rows
  }

  createLine (elements: Element[]) {
    let elem = document.createElement('div')
    elem.classList.add(this.$options.class.line)

    elements.forEach(el => {
      elem.appendChild(el)
    })

    return elem
  }

  splitLines () {
    for (let line of this.findLines()) {
      let previous = line.elements[0].previousSibling
      let elem = this.createLine(line.elements)
      let reference = previous && previous.nextSibling

      this.$element.insertBefore(elem, reference)
    }
  }

  init () {
    findTexts(this.$element).forEach(text => {
      let words = this.splitWords(text)
      
      if (this.$options.chars) {
        words.forEach(word => {
          let textNode = word.childNodes[0]
          let chars = this.splitChars(word)
          
          replaceNode(textNode, chars)
          word.appendChild(document.createTextNode(' '))
        })
      }
      
      replaceNode(text, words)
    })

    this.splitLines()
  }
}
