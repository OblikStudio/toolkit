import query from '../../utils/context-query'
import { windowClientRect } from '../../utils/dom'
import { clamp } from '../../utils/math'

const transformers = {
  ratio: function (value) {
    return value
  },
  signed: function (value) {
    return (value - 0.5) * 2
  },
  trigonometric: function (value) {
    var rad = Math.PI * (transformers.signed(value))

    return {
      sin: Math.sin(rad),
      cos: Math.cos(rad)
    }
  }
}

export function registerTransformers (input) {
  Object.assign(transformers, input)
}

export default class {
  constructor (element, options) {
    this.element = element
    this.options = Object.assign({
      name: 'parallax',
      value: 'signed',
      axis: 'y',
      reference: null,
      clamp: true
    }, options)
    
    if (!this.options.reference) {
      this.reference = window
    } else {
      this.reference = query(this.element, this.options.reference)
    }

    this.transform = transformers[this.options.value]
    if (typeof this.transform !== 'function') {
      throw new Error(`Invalid transformer ${ this.options.value }`)
    }
    
    this.handler = this.update.bind(this)
    this.reference.addEventListener('scroll', this.handler)
    this.update()
  }

  calculate (elementRect, referenceRect, axis) {
    var offset, edge, edgeEnd

    if (axis === 'x') {
      offset = referenceRect.width
      edge = elementRect.left - referenceRect.left
      edgeEnd = elementRect.width
    } else {
      offset = referenceRect.height
      edge = elementRect.top - referenceRect.top
      edgeEnd = elementRect.height
    }

    var positionCurrent = offset - edge
    var positionEnd = edgeEnd + offset

    return positionCurrent / positionEnd
  }

  update () {
    var rect = this.element.getBoundingClientRect()
    var refRect
    var value

    if (this.reference instanceof Element) {
      refRect = this.reference.getBoundingClientRect()
    } else {
      refRect = windowClientRect()
    }
 
    value = this.calculate(rect, refRect, this.options.axis)
    
    if (this.options.clamp) {
      value = clamp(value, 0, 1)
    }
    
    this.setProperty(this.transform(value))
  }

  setProperty (property) {
    if (typeof property === 'object') {
      for (var k in property) {
        this.element.style.setProperty(`--${ this.options.name }-${ k }`, property[k])
      }
    } else {
      this.element.style.setProperty(`--${ this.options.name }`, property)
    }
  }

  $destroy () {
    this.reference.removeEventListener('scroll', this.handler)
  }
}