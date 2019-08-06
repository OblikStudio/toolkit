import { clamp } from '../../utils/math'

export default class {
  constructor (element, options) {
    this.element = element
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
    value = (value - 0.5) * 2
    this.element.style.setProperty('--parallax', value)
  }

  $destroy () {
    window.removeEventListener('scroll', this.handler)
  }
}