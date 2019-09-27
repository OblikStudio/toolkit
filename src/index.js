import * as components from './components'
import * as watcher from './watcher'
import * as utils from './utils'

import { actions, observers } from './components/sensor'
import * as sensorPartials from './components/sensor/partials'

Object.assign(actions, sensorPartials.actions)
Object.assign(observers, sensorPartials.observers)

export function init () {
  watcher.register(components)
  watcher.init()
}

export default {
  components,
  watcher,
  utils,
  init
}