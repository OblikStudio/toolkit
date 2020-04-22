type QueryList = Element[] | NodeList | HTMLCollection
export type QueryInput = Element | QueryList

function isQueryList (input: any): input is QueryList {
  return (
    Array.isArray(input) ||
    input instanceof NodeList ||
    input instanceof HTMLCollection
  )
}

export class Query {
  elements: Element[] = []

  constructor (input?: QueryInput) {
    if (input) {
      this.add(input)
    }
  }

  /**
   * Attempts to add an Element to the queried elements and returns its index.
   */
  _addTarget (input: Element | Node) {
    if (
      input instanceof Element &&
      this.elements.indexOf(input) < 0
    ) {
      return this.elements.push(input)
    }
  }

  /**
   * Add targets to the query.
   */
  add (input: QueryInput) {
    if (isQueryList(input)) {
      for (let element of input) {
        this._addTarget(element)
      }
    } else {
      this._addTarget(input)
    }

    return this
  }

  /**
   * Invokes `callback` for each element in the query and returns a new Query
   * with the resulting targets of each invocation.
   */
  process (callback: ((element: Element) => QueryInput)) {
    var query = new Query()

    for (let element of this.elements) {
      query.add(callback(element))
    }

    return query
  }

  /**
   * Returns a parent `levels` up the DOM tree.
   */
  parent (levels = 1) {
    return this.process(element => {
      var localLevel = levels

      while (element && localLevel > 0) {
        element = element.parentElement
        localLevel--
      }

      return element
    })
  }

  /**
   * Returns an element `levels` down the DOM tree, using the first child in
   * each iteration. Useful when dealing with wrapper elements.
   */
  descendant (levels: number) {
    return this.process(element => {
      var localLevel = levels

      while (element && localLevel > 0) {
        element = element.children[0]
        localLevel--
      }

      return element
    })
  }

  /**
   * Returns the child at `index`.
   */
  child (index = 0) {
    return this.process(element => {
      var children = element.children
      if (children && children[index]) {
        return children[index]
      }
    })
  }

  /**
   * Returns all children.
   */
  children () {
    return this.process(element => {
      return element.children
    })
  }

  /**
   * Returns the nth next sibling when `pointer` is positive, and the nth
   * previous sibling when `pointer` is negative.
   */
  sibling (pointer = 1) {
    return this.process(element => {
      var useNext = (pointer > 0)
      var localPointer = Math.abs(pointer)

      while (element && localPointer > 0) {
        if (useNext) {
          element = element.nextElementSibling
        } else {
          element = element.previousElementSibling
        }

        localPointer--
      }

      return element
    })
  }

  /**
   * Returns the product of `querySelector(selector)`
   */
  select (selector: string) {
    return this.process(element => {
      if (typeof selector === 'string') {
        return element.querySelector(selector)
      }
    })
  }

  /**
   * Returns the product of `querySelectorAll(selector)`
   */
  selectAll (selector = '*') {
    return this.process(element => {
      if (typeof selector === 'string') {
        return element.querySelectorAll(selector)
      }
    })
  }

  /**
   * Leave only the element at `index` in the query.
   */
  nth (index: number) {
    var element = this.elements[index] || null
    this.elements = element ? [element] : []
    return this
  }

  /**
   * Leave only the first element in the query.
   */
  first () {
    return this.nth(0)
  }

  /**
   * Leave only the last element in the query.
   */
  last () {
    return this.nth(this.elements.length - 1)
  }
}

export default Query
