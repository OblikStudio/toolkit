import cursor from './cursor'
import height from './height'
import loader from './loader'
import masonry from './masonry'
import scrollto from './scrollto'
import slider from './slider'
import source from './source'
import toggle from './toggle'
import tweet from './tweet'

import { default as sensor, register as sensorRegister } from './sensor'
import * as sensorPartials from './sensor/partials'

sensorRegister(sensorPartials)

export default {
  cursor,
  height,
  loader,
  masonry,
  scrollto,
  slider,
  source,
  toggle,
  tweet,
  sensor
}