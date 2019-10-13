/**
 * @todo add component hooks
 * @todo make component resolveOptions static
 * @todo scrollto turn `scroll()` to static method
 * @todo allow components using querel to accept HTMLElement input
 * @todo extend $defaults and $presets with methods
 * @todo store components in Watcher with lowercase keys
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

import Component from './components/component'

class Child extends Component { }

class Parent extends Component {
  static $components = {
    bar: Child
  }

  $create () {
    this.$emitter.on('bar:added', component => {
      console.log('added', component)
    })
  }

  $init () {
    console.log('child', this.$bar)
  }
}

let w = new Watcher(document.body, {
  components: {
    foo: Parent
  }
})

w.init()


export {
  components,
  utils
}
