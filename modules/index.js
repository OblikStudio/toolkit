import cursor from './cursor'
import height from './height'
import loader from './loader'
import masonry from './masonry'
import slider from './slider'
import source from './source'
import toggle from './toggle'
import tweet from './tweet'

import { default as viewport, register as viewportRegister } from './viewport'
import viewportPartials from './viewport/partials'

viewportRegister(viewportPartials)

export default {
  cursor,
  height,
  loader,
  masonry,
  slider,
  source,
  toggle,
  tweet,
  viewport
}