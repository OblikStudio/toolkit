import '../../src/polyfill'

import Watcher from '../../src/utils/watcher'

import sensor from '../../src/components/sensor'
import sticky from '../../src/components/sensor/sticky'
import { PositionObserver } from '../../src/utils/position-observer'
import { Component } from '../../src'

let w = new Watcher(document.body, {
	components: {
		sensor,
		sticky,
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
