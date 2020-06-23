import { Animation } from '../animation'
import { offsetGlobal } from '../dom'

export interface Options {
	target: Element
	duration: Animation['duration']
	offset?: number
	interruptible?: boolean
	easing?: Animation['easing']
}

export class ScrollAnimation extends Animation {
	target: Element
	start: number
	end: number

	constructor (options: Options) {
		if (!options.target) {
			throw new Error('No scroll target')
		}

		super(options.duration, options.easing)

		this.target = options.target
		this.start = document.scrollingElement.scrollTop
		this.end = offsetGlobal(this.target).top + (options.offset || 0)

		if (options.interruptible || true) {
			let interruptHandler = (event) => {
				this.stop()
				window.removeEventListener('wheel', interruptHandler)
				window.removeEventListener('touchstart', interruptHandler)
			}

			window.addEventListener('wheel', interruptHandler)
			window.addEventListener('touchstart', interruptHandler)
		}
	}

	update () {
		let diff = this.end - this.start
		let pos = this.start + (diff * this.value)

		if (document.scrollingElement) {
			document.scrollingElement.scrollTop = pos
		}
	}
}

export function scrollTo (options: Options) {
	let anim = new ScrollAnimation(options)
	anim.run()
	return anim
}
