import { Ticker, measure, mutate } from '../../src/utils/ticker'

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

  it('calls measure and mutate in the correct order', function (done) {
    let read1 = sinon.spy()
    let write = sinon.spy()
    let read2 = sinon.spy()

    measure(read1)
    mutate(write)
    measure(read2)

    window.requestAnimationFrame(() => {
      expect(write).calledAfter(read2)
      expect(read2).calledAfter(read1)
      done()
    })
  })

  it('calls promise mutation after callback mutation', function (done) {
    let promise = sinon.spy()
    let callback = sinon.spy()

    measure().then(() => {
      promise()
    })
    
    measure(() => {
      callback()
    })

    window.requestAnimationFrame(() => {
      expect(promise).calledAfter(callback)
      done()
    })
  })
})
