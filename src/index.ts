/**
 * @todo scrollto turn `scroll()` to static method
 * @todo allow components using querel to accept HTMLElement input
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
  // @ts-ignore
  components
})

w.init()

export {
  components,
  utils
}
