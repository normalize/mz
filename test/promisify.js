
var assert = require('assert')

var promisify = require('../_promisify')

var setImmediate = global.setImmediate || function (fn) {
  process.nextTick(fn)
}

describe('Promisify', function () {
  it('should reject errors', function (done) {
    function fn(done) {
      setImmediate(function () {
        var err = new Error('boom')
        err.boom = 'boom'
        done(err)
      })
    }

    var prom = promisify('a', fn)

    prom().catch(function (err) {
      assert.equal(err.message, 'boom')
      assert.equal(err.boom, 'boom')
      done()
    })
  })

  it('should reject errors with arguments', function (done) {
    function fn(a, b, done) {
      setImmediate(function () {
        done(new Error('boom'))
      })
    }

    var prom = promisify('a', fn)

    prom(1, 2).catch(function (err) {
      assert.equal(err.message, 'boom')
      done()
    })
  })

  /**
   * bluebird can resolve multiple arguments,
   * but v8 promises can't. -_-
   */
  it('should return the result', function (done) {
    function fn(done) {
      setImmediate(function () {
        done(null, 1)
      })
    }

    var prom = promisify('a', fn)

    prom().then(function (a) {
      assert.equal(a, 1)
      done()
    })
  })

  if (!promisify.bluebird) {
    it('should name functions', function () {
      var prom = promisify('lol', function () {})
      assert.equal(prom.name, 'lol')
    })
  }
})
