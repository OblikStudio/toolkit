import '../../src/polyfill'

import sensor from '../../src/components/sensor'
import { PositionObserver } from '../../src/utils/position-observer'
import { Component, Watcher } from '../../src'

let w = new Watcher(document.body, {
	components: {
		sensor,
		test: class extends Component<HTMLElement> {
			obs: PositionObserver

			create () {
				this.obs = new PositionObserver(this.$element)
				this.obs.on('change', console.log)
			}

			destroy () {
				this.obs.destroy()
			}
		}
	}
})

w.init()
