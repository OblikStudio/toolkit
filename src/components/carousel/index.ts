import { Component } from '../..'
import { Slider } from './slider'

export class Next extends Component {
	$parent: Carousel

	init () {
		this.$element.addEventListener('click', () => {
			this.action()
			this.$parent.$slider.update()
		})
	}

	action () {
		this.$parent.$slider.nextScreen()
	}
}

export class Prev extends Next {
	action () {
		this.$parent.$slider.prevScreen()
	}
}

export class Carousel extends Component<Element> {
	static components = {
		slider: Slider,
		next: Next,
		prev: Prev
	}

	$slider: Slider
}

export default Carousel
