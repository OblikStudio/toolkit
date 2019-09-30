import Component from '../../component'

export default class extends Component {
  constructor () {
    super(...arguments)

    this.$element.addEventListener('mouseenter', () => {
      this.$element.classList.add('is-cursor-hidden')
      this.$visual.$element.classList.add('is-visible')
    })

    this.$element.addEventListener('mousemove', (event) => {
      this.$visual.$element.style.top = event.offsetY + 'px'
      this.$visual.$element.style.left = event.offsetX + 'px'
    })

    this.$element.addEventListener('mouseleave', () => {
      this.$element.classList.remove('is-cursor-hidden')
      this.$visual.$element.classList.remove('is-visible')
    })
  }
}
