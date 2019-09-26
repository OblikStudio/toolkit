import { query } from '../../utils'
import { windowClientRect } from '../../utils/dom'
import { clamp } from '../../utils/math'
import { linear } from '../../utils/easings'

const transformers = {
  ratio: function (value) {
    return value
  },
  signed: function (value) {
    var signed = (value - 0.5) * 2
    var eased = (1 - this.easing(1 - Math.abs(signed)))
    return Math.sign(signed) * eased
  },
  trigonometric: function (value) {
    var rad = Math.PI * (transformers.signed(value))

    return {
      sin: Math.sin(rad),
      cos: Math.cos(rad)
    }
  }
}

const easings = {
  linear
}

export function registerTransformers (input) {
  Object.assign(transformers, input)
}

export function registerEasigns (input) {
  Object.assign(easings, input)
}

export default class {
  constructor (element, options) {
    this.element = element
    this.options = Object.assign({
      type: 'signed',
      easing: 'linear',
      name: 'parallax',
      axis: 'y',
      reference: null,
      clamp: true
    }, options)
    
    if (!this.options.reference) {
      this.reference = window
    } else {
      this.reference = query(this.element, this.options.reference).first()
    }

    this.transform = transformers[this.options.type]
    if (typeof this.transform !== 'function') {
      throw new Error(`Invalid transformer ${ this.options.type }`)
    }

    this.easing = easings[this.options.easing]
    if (typeof this.easing !== 'function') {
      throw new Error(`Invalid easing ${ this.options.easing }`)
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

    this.setProperty(this.transform.call(this, value))
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