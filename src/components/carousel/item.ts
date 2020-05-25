import { Component } from '../..'

interface Location {
	left: number
	right: number
}

export class Item extends Component<HTMLElement> {
	location: Location = null
	marginLeft: number = 0
	marginRight: number = 0
	width: number = 0

	update () {
		let style = window.getComputedStyle(this.$element)
		this.marginLeft = parseFloat(style.marginLeft)
		this.marginRight = parseFloat(style.marginRight)
		this.width = parseFloat(style.width)
	}

	space () {
		return this.marginLeft + this.width + this.marginRight
	}
}
