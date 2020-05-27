import { Component } from '../..'
import { Toggle } from '../toggle'

class DrawerWrapper extends Component<HTMLElement> { }

class DrawerContent extends Component<HTMLElement> { }

class Drawer extends Component<HTMLElement> {
	static components = {
		wrapper: DrawerWrapper,
		content: DrawerContent
	}

	$content: DrawerContent
}

class BarToggle extends Toggle { }

BarToggle.defaults.target = document.body
BarToggle.defaults.class = 'is-active-nav'

class Bar extends Component<HTMLElement> {
	static components = {
		toggle: BarToggle
	}

	$toggle: BarToggle
}

export class Nav extends Component {
	static components = {
		drawer: Drawer,
		bar: Bar
	}

	$bar: Bar
	$drawer: Drawer

	private scrollHandler = this.handleScroll.bind(this)

	init () {
		this.$bar.$toggle.$emitter.on('change', state => {
			if (state === true) {
				this.$drawer.$element.style.height = this.getHeight() + 'px'
			}
		})

		window.addEventListener('scroll', this.scrollHandler)
	}

	destroy () {
		window.removeEventListener('scroll', this.scrollHandler)
	}

	getHeight () {
		return window.scrollY - this.$drawer.$element.offsetTop
	}

	handleScroll () {
		if (this.$bar.$toggle.state === true) {
			let barTop = this.$bar.$element.offsetTop
			let drawerBottom = this.$drawer.$element.offsetTop + this.$drawer.$element.offsetHeight

			if (drawerBottom > barTop) {
				this.$drawer.$element.style.height = this.getHeight() + 'px'
			} else if (barTop > drawerBottom + this.$drawer.$content.$element.offsetHeight) {
				this.$bar.$toggle.toggle()
			}
		}
	}
}

export default Nav
