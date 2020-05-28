import { Component } from '../..'

class Toggle extends Component {
	$parent: Item

	create () {
		this.$element.addEventListener('click', () => {
			this.$parent.$parent.toggle(this.$parent)
		})
	}
}

class Item extends Component {
	$parent: Accordion

	static components = {
		toggle: Toggle
	}
}

interface Options {
	active: number
}

export class Accordion extends Component<Element, Options> {
	static components = {
		item: Item
	}

	static defaults = {
		active: null
	}

	$item: Item[]

	create () {
		this.$item = []
	}

	init () {
		let initial = this.$item[this.$options.active]
		if (initial) {
			this.toggle(initial)
		}
	}

	toggle (toggledItem: Item) {
		this.$item.forEach(item => {
			if (item === toggledItem) {
				item.$element.classList.toggle('is-active')
			} else {
				item.$element.classList.remove('is-active')
			}
		})
	}
}

export default Accordion
