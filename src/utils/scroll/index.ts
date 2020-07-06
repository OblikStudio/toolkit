import { Animation } from '../animation'
import { offsetGlobal } from '../dom'

export interface Options {
	duration: Animation['duration']
	easing?: Animation['easing']
	offset?: number
	target?: Element
	interruptible?: boolean
}

export class ScrollAnimation extends Animation {
	start: number
	end: number

	constructor (options: Options) {
		super(options.duration, options.easing)

		this.start = document.scrollingElement.scrollTop
		this.end = options.offset ?? 0

		if (options.target) {
			this.end += offsetGlobal(options.target).top
		}

		if (options.interruptible !== false) {
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
