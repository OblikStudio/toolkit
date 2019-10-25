import Component from '../../component'

class Toggle extends Component {
  create () {
    this.$element.addEventListener('click', () => {
      let accordion = this.$parent.$parent as Accordion
      accordion.toggle(this.$parent)
    })
  }
}

class Slide extends Component {
  static components = {
    toggle: Toggle
  }
}

export default class Accordion extends Component {
  static components = {
    slide: Slide
  }

  $slide: Slide[]

  create () {
    this.$slide = []
  }

  toggle (toggledSlide: Slide) {
    this.$slide.forEach(slide => {
      if (slide === toggledSlide) {
        slide.$element.classList.toggle('is-active')
      } else {
        slide.$element.classList.remove('is-active')
      }
    })
  }
}
