import { Component } from '../..'
import { Rail } from './rail'

export class Next extends Component {
	$parent: Carousel

	init () {
		this.$element.addEventListener('click', () => {
			this.action()
			this.$parent.$rail.update()
		})
	}

	action () {
		this.$parent.$rail.nextScreen()
	}
}

export class Prev extends Next {
	action () {
		this.$parent.$rail.prevScreen()
	}
}

export class Carousel extends Component<Element> {
	static components = {
		rail: Rail,
		next: Next,
		prev: Prev
	}

	$rail: Rail
}

export default Carousel
