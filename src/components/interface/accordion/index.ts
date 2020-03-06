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

interface Options {
	active: number
}

export default class Accordion extends Component<Element, Options> {
  static components = {
    slide: Slide
	}

	static defaults = {
		active: 0
	}

  $slide: Slide[]

  create () {
    this.$slide = []
	}

	init () {
		let initial = this.$slide[this.$options.active]
		if (initial) {
			this.toggle(initial)
		}
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
