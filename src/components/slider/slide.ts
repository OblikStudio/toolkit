import { Component } from '../..'
import Slider from './index'

interface SlideRect extends ClientRect {
	centerX: number
	centerDiff: number
	thresholdLeft: number
	thresholdRight: number
}

export default class Slide extends Component<HTMLElement> {
	$parent: Slider
	rect: SlideRect

	update () {
		var parentCenter = this.$parent.center
		var threshold = this.$element.offsetWidth * 0.15

		let clientRect = this.$element.getBoundingClientRect()
		let centerX = clientRect.left + (clientRect.width / 2)

		this.rect = {
			...clientRect,
			centerX,
			centerDiff: Math.abs(parentCenter - centerX),
			thresholdLeft: centerX - threshold,
			thresholdRight: centerX + threshold
		}
	}
}
