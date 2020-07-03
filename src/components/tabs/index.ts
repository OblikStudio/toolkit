import { Component } from '../..'

export class Toggle extends Component {
	$parent: Tabs

	init () {
		this.$element.addEventListener('click', () => {
			this.$parent.handleClick(this)
		})
	}
}

export class Item extends Component { }

export interface Options {
	active: number
	class: string
}

export class Tabs extends Component<Element, Options> {
	static components = {
		toggle: Toggle,
		item: Item
	}

	static defaults = {
		active: 0,
		class: 'is-active'
	}

	$item: Item[] = []
	$toggle: Toggle[] = []
	activeIndex: number

	init () {
		if (typeof this.$options.active === 'number') {
			this.activate(this.$options.active - 1)
		}
	}

	activate (index: number) {
		if (typeof this.activeIndex === 'number') {
			let activeToggle = this.$toggle[this.activeIndex]
			let activeItem = this.$item[this.activeIndex]

			activeToggle?.$element.classList.remove(this.$options.class)
			activeItem?.$element.classList.remove(this.$options.class)
		}

		let toggle = this.$toggle[index]
		let item = this.$item[index]

		toggle?.$element.classList.add(this.$options.class)
		item?.$element.classList.add(this.$options.class)

		this.activeIndex = index
	}

	handleClick (target: Toggle) {
		let index = this.$toggle.indexOf(target)
		if (index >= 0) {
			this.activate(index)
		}
	}
}

export default Tabs
