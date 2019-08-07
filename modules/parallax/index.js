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
      value: 'signed',
      name: 'parallax'
    }, options)

    this.handler = this.update.bind(this)
    window.addEventListener('scroll', this.handler)
    this.update()
  }

  update () {
    var rect = this.element.getBoundingClientRect()
    var offset = window.innerHeight
    var positionCurrent = offset - rect.top
    var positionEnd = rect.height + offset
    
    var value = clamp(positionCurrent / positionEnd, 0, 1)
    var transformer = transformers[this.options.value]

    if (typeof transformer !== 'function') {
      throw new Error(`Missing transformer ${ this.options.value }`)
    }

    this.setProperty(transformer(value))
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
    window.removeEventListener('scroll', this.handler)
  }
}