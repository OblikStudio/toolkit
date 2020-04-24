import { measure } from '..'
import { Emitter } from './emitter'
import { PositionObserver } from './position-observer'

function rect (x: number, y: number, width: number, height: number): ClientRect {
	return {
		width,
		height,
		top: y,
		right: x + width,
		bottom: y + height,
		left: x
	}
}

export class RectObserver extends Emitter {
	top: number
	left: number
	width: number
	height: number
	rect: ClientRect
	target: Window | HTMLElement
	documentRelative: boolean

	private _resizeHandler: () => void
	private _scrollHandler: () => void
	private _observer: PositionObserver

	constructor (target: RectObserver['target'], documentRelative = false) {
		super()

		this.target = target
		this.documentRelative = documentRelative

		this._init().then(() => {
			this.emit('init', this.rect)
		})
	}

	private _initWindowViewport () {
		return measure().then(() => {
			this.top = 0
			this.left = 0
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.rect = rect(this.left, this.top, this.width, this.height)

			this._resizeHandler = () => {
				measure(() => {
					this.width = window.innerWidth
					this.height = window.innerHeight
					this.rect = rect(this.left, this.top, this.width, this.height)
					this.emit('change', this.rect)
				})
			}

			window.addEventListener('resize', this._resizeHandler)
		})
	}

	private _initWindowDocument () {
		return measure().then(() => {
			this.top = document.documentElement.scrollTop
			this.left = document.documentElement.scrollLeft
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.rect = rect(this.left, this.top, this.width, this.height)

			this._scrollHandler = () => {
				measure(() => {
					this.top = document.scrollingElement.scrollTop
					this.left = document.scrollingElement.scrollLeft
					this.rect = rect(this.left, this.top, this.width, this.height)
					this.emit('change', this.rect)
				})
			}
	
			this._resizeHandler = () => {
				measure(() => {
					this.width = window.innerWidth
					this.height = window.innerHeight
					this.rect = rect(this.left, this.top, this.width, this.height)
					this.emit('change', this.rect)
				})
			}

			window.addEventListener('scroll', this._scrollHandler)
			window.addEventListener('resize', this._resizeHandler)
		})
	}

	private _initElementViewport () {
		return measure().then(() => {
			let element = this.target as HTMLElement

			this.rect = element.getBoundingClientRect()

			this._scrollHandler = () => {
				measure(() => {
					this.rect = element.getBoundingClientRect()
					this.emit('change', this.rect)
				})
			}

			this._resizeHandler = this._scrollHandler

			window.addEventListener('scroll', this._scrollHandler)
			window.addEventListener('resize', this._resizeHandler)
		})
	}

	private _initElementDocument () {
		let element = this.target as HTMLElement

		this._observer = new PositionObserver(element)

		return this._observer.promise('init').then((rect: ClientRect) => {
			this.rect = rect
			this._observer.on('change', (rect: ClientRect) => {
				this.rect = rect
				this.emit('change', rect)
			})
		})
	}

	private _init () {
		if (this.target instanceof Window) {
			if (this.documentRelative) {
				return this._initWindowDocument()
			} else {
				return this._initWindowViewport()
			}
		} else {
			if (this.documentRelative) {
				return this._initElementDocument()
			} else {
				return this._initElementViewport()
			}
		}
	}

	destroy () {
		if (this._scrollHandler) {	
			window.removeEventListener('scroll', this._scrollHandler)
		}

		if (this._resizeHandler) {
			window.removeEventListener('resize', this._resizeHandler)
		}

		if (this._observer) {
			this._observer.destroy()
		}
	}
}
