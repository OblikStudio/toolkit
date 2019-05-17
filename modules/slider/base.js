import BaseModule from '../BaseModule'
import drag from '../../utils/drag'

function checkAnchor (element) {
  var value = false

  do {
    value = element.nodeName === 'A'
  } while (!value && (element = element.parentNode))

  return value
}

export default class extends BaseModule {
  constructor (element, options, parent) {
    super('slider', parent)

    this.element = element
    this.slides = []

    this.currentSlideIndex = null
    this.currentSlide = null

    this.dragOrigin = null
    this.dragLive = null
    this.dragDelta = null

    this.clickThreshold = 40
    this.isDraggingLink = null
    this.isDrag = null

    this.on('slideAdd', function (module) {
      this.slides.push(module.element)
    })

    drag(this.element, {
      start: this.pointerDown.bind(this),
      move: this.pointerMove.bind(this),
      end: this.pointerUp.bind(this)
    })

    this.element.addEventListener('click', (event) => {
      // If the user tried to drag, prevent redirection.
      if (this.isDraggingLink && this.isDrag) {
        event.preventDefault()
      }
    })

    // should happen on module init() event
    setTimeout(() => {
      this.setSlide(0)
    }, 0)
  }

  setSlide (index) {
    var slide = this.slides[index]
    if (slide) {
      this.currentSlideIndex = index
      this.currentSlide = slide
      this.origin = {
        x: -this.currentSlide.offsetLeft,
        y: -this.currentSlide.offsetTop
      }

      this.renderItems()
      return true
    }

    return false
  }

  move (direction) {
    return this.setSlide(this.currentSlideIndex + direction)
  }

  next () {
    return this.move(1)
  }

  previous () {
    return this.move(-1)
  }

  pointerDown (event) {
    this.dragOrigin = {
      x: event.pageX,
      y: event.pageY
    }

    this.dragDelta = {
      x: 0,
      y: 0
    }

    this.isDrag = false
    this.isDraggingLink = checkAnchor(event.target)
    this.element.classList.remove('has-transition')

    // event might not be just Touch instance
    if (event.preventDefault) {
      event.preventDefault()
    }
  }

  pointerMove (event) {
    this.dragLive = {
      x: event.pageX,
      y: event.pageY
    }

    this.dragDelta = {
      x: this.dragLive.x - this.dragOrigin.x,
      y: this.dragLive.y - this.dragOrigin.y
    }

    if (!this.isDrag && Math.abs(this.dragDelta.x) > this.clickThreshold) {
      this.isDrag = true
    }

    this.renderItems()
  }

  pointerUp (event) {
    var direction = Math.sign(this.dragDelta.x)
    var absoluteDelta = Math.abs(this.dragDelta.x)
    var changeSlide = absoluteDelta > (this.currentSlide.offsetWidth * 0.25)

    this.dragOrigin = null
    this.dragLive = null
    this.dragDelta = null

    this.element.classList.add('has-transition')

    if (changeSlide && this.move(direction * -1)) {
      return
    } else {
      this.renderItems()
    }
  }

  renderItems () {
    var itemsX = this.origin.x

    if (this.dragDelta) {
      itemsX += this.dragDelta.x
    }

    this.slides.forEach(slide => {
      slide.style.transform = `translateX(${ itemsX }px)`
    })
  }
}
