import 'core-js'

import * as components from './components'
import * as watcher from './watcher'
import * as utils from './utils'

import { actions, observers } from './components/functional/sensor'
import * as allActions from './components/functional/sensor/actions'
import * as allObservers from './components/functional/sensor/observers'

Object.assign(actions, allActions)
Object.assign(observers, allObservers)

watcher.register(components)
watcher.init()

export {
  components,
  watcher,
  utils
}
