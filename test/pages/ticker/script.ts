import Watcher from '../../../src/watcher'
import { Poller } from '../../../src/utils/poller'
import { mutate } from '../../../src/utils/ticker'
import { Component } from '../../../src/components/component'

class Test extends Component<HTMLElement> {
  create () {
    let p = new Poller(this.$element, ['offsetWidth'], true)

    p.on('change', data => {
      mutate(() => {
        this.$element.style.height = data.offsetWidth + 'px'
      })
    })
  }
}

let w = new Watcher(document.body, {
  components: {
    test: Test
  }
})

w.init()

for (let i = 0; i < 300; i++) {
  let el = document.createElement('div')
  el.setAttribute('ob-test', '')
  document.body.appendChild(el)
}
