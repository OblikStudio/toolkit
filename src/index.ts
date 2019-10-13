/**
 * @todo add component hooks
 * @todo make component resolveOptions static
 * @todo scrollto turn `scroll()` to static method
 * @todo allow components using querel to accept HTMLElement input
 * @todo extend $defaults and $presets with methods
 */

import 'core-js'

import * as components from './components'
import * as utils from './utils'
import Watcher from './watcher'

import { actions, observers } from './components/functional/sensor'
import * as allActions from './components/functional/sensor/actions'
import * as allObservers from './components/functional/sensor/observers'

Object.assign(actions, allActions)
Object.assign(observers, allObservers)

let w = new Watcher(document.body, {
  components: {
    height: components.height,
    slider: components.slider,
    toggle: components.toggle
  }
})

w.init()

export {
  components,
  utils
}
