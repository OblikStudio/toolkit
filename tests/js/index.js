import components from '@/components'
import * as watcher from '@/watcher'
import * as utils from '@/utils'

watcher.register(components)
watcher.init()

window.Minibits = {
  components,
  utils,
  watcher
}
