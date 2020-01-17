import Watcher from '../../../src/watcher'

import { Sensor } from '../../../src/components/functional/sensor'
import Tag from '../../../src/components/functional/sensor/actions/tag'
import Relative from '../../../src/components/functional/sensor/observers/relative'
import { PositionObserver } from '../../../src/utils/position-observer'

let el = document.querySelector('#test')
let obs = new PositionObserver(el)

obs.on('change', (data) => {
  console.log(data)
})

Sensor.resources = {
  actions: {
    tag: Tag
  },
  observers: {
    relative: Relative
  }
}

let w = new Watcher(document.body, {
  components: {
    sensor: Sensor
  }
})

w.init()
