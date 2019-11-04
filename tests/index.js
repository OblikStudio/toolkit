import 'core-js'

import * as Oblik from '../js/index'

import { actions, observers } from '../js/components/functional/sensor'
import * as allActions from '../js/components/functional/sensor/actions'
import * as allObservers from '../js/components/functional/sensor/observers'

Object.assign(actions, allActions)
Object.assign(observers, allObservers)

let w = new Oblik.Watcher(document.body, {
  components: Oblik.components
})

w.init()
