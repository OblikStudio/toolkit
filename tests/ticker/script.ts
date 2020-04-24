import Watcher from '../../src/utils/watcher'
import { Poller } from '../../src/utils/poller'
import { Component, mutate } from '../../src'

class Test extends Component<HTMLElement> {
  create () {
    let p = new Poller(this.$element, ['offsetWidth'])

    p.on('change', data => {
      mutate(() => {
        this.$element.style.height = data.offsetWidth.newValue + 'px'
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
