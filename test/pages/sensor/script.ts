import '../../../src/polyfill'

import Watcher from '../../../src/watcher'

import { Sensor } from '../../../src/components/functional/sensor'
import { Sticky } from '../../../src/components/functional/sensor/sticky'
import Tag from '../../../src/components/functional/sensor/actions/tag'
import Relative from '../../../src/components/functional/sensor/observers/relative'
import { PositionObserver } from '../../../src/utils/position-observer'
import { Component } from '../../../src'

Sensor.resources = {
  actions: {
    tag: Tag
  },
  observers: {
    relative: Relative
  }
}

Sticky.resources = {
  observers: {
    relative: Relative
  }
}

let w = new Watcher(document.body, {
  components: {
    sensor: Sensor,
    sticky: Sticky,
    test: class extends Component {
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
