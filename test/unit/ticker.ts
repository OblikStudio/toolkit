import { Ticker } from '../../src/utils/ticker'

describe('ticker', () => {
  it('starts', function (done) {
    let inst = new Ticker()
    let spy = sinon.spy()

    inst.start()
    inst.on('tick', delta => {
      expect(typeof delta).equal('number')
      spy()

      inst.stop()
    })

    setTimeout(() => {
      expect(spy).callCount(1)
      done()
    }, 100)
  })
})
