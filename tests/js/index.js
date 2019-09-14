import modules from '@/modules'
import * as watcher from '@/watcher'
import utils from '@/utils'

watcher.register(modules)
watcher.init()

window.Minibits = {
  modules,
  utils,
  watcher
}
