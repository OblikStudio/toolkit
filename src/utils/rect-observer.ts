import { measure } from '../core'
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
	target: Window | HTMLElement
	rect: ClientRect

	constructor (target: RectObserver['target'], options: { reference: 'document' | 'viewport' }) {
		super()

		this.target = target

		measure(() => {
			if (options.reference === 'viewport') {
				this._initViewportBased()
			} else {
				this._initDocumentBased()
			}
		})
	}

	private _initViewportBased () {
		if (this.target instanceof Window) {
			this.top = 0
			this.left = 0
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.rect = rect(this.left, this.top, this.width, this.height)
			this.emit('init', this.rect)

			window.addEventListener('resize', () => {
				measure(() => {
					this.width = window.innerWidth
					this.height = window.innerHeight
					this.rect = rect(this.left, this.top, this.width, this.height)
					this.emit('change', this.rect)
				})
			})
		} else {
			this.rect = this.target.getBoundingClientRect()
			this.emit('init', this.rect)

			window.addEventListener('scroll', () => {
				measure(() => {
					this.rect = (this.target as Element).getBoundingClientRect()
					this.emit('change', this.rect)
				})
			})

			window.addEventListener('resize', () => {
				measure(() => {
					this.rect = (this.target as Element).getBoundingClientRect()
					this.emit('change', this.rect)
				})
			})
		}
	}

	private _initDocumentBased () {
		if (this.target instanceof Window) {
			this.top = document.documentElement.scrollTop
			this.left = document.documentElement.scrollLeft
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.rect = rect(this.left, this.top, this.width, this.height)
			this.emit('init', this.rect)

			window.addEventListener('scroll', () => {
				measure(() => {
					this.top = document.scrollingElement.scrollTop
					this.left = document.scrollingElement.scrollLeft
					this.rect = rect(this.left, this.top, this.width, this.height)
					this.emit('change', this.rect)
				})
			})
	
			window.addEventListener('resize', () => {
				measure(() => {
					this.width = window.innerWidth
					this.height = window.innerHeight
					this.rect = rect(this.left, this.top, this.width, this.height)
					this.emit('change', this.rect)
				})
			})
		} else {
			let observer = new PositionObserver(this.target)
			
			observer.once('init', (rect: ClientRect) => {
				this.rect = rect
				this.emit('init', rect)

				observer.on('change', (rect: ClientRect) => {
					this.rect = rect
					this.emit('change', rect)
				})
			})
		}
	}
}
