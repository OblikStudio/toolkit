import { Ticker } from '..'

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
    let inst = new Ticker()
    let read1 = sinon.spy()
    let write = sinon.spy()
    let read2 = sinon.spy()

    inst.once('measure', read1)
    inst.once('mutate', write)
    inst.once('measure', read2)

    inst.once('tick', () => {
      inst.once('tick', () => {
        expect(write).calledAfter(read2)
        expect(read2).calledAfter(read1)
        done()
      })
    })

    inst.start()
  })

  it('calls mutation after promised measure', function (done) {
    let inst = new Ticker()
    let mutateSpy = sinon.spy()
    let measureSpy = sinon.spy()
    
    inst.once('mutate', mutateSpy)
    inst.promise('measure').then(measureSpy)

    inst.once('tick', () => {
      inst.once('tick', () => {
        expect(mutateSpy).calledAfter(measureSpy)
        done()
      })
    })

    inst.start()
  })
})
