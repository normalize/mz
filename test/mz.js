
var assert = require('assert')

describe('fs', function () {
  var fs = require('../fs')

  it('.stat()', function (done) {
    fs.stat(__filename).then(function (stats) {
      assert.equal(typeof stats.size, 'number')
      done()
    }).catch(done)
  })

  it('.statSync()', function () {
    var stats = fs.statSync(__filename)
    assert.equal(typeof stats.size, 'number')
  })

  it('.exists()', function (done) {
    fs.exists(__filename).then(function (exists) {
      assert(exists)
      done()
    }).catch(done)
  })

  it('.existsSync()', function () {
    var exists = fs.existsSync(__filename)
    assert(exists)
  })

  describe('callback support', function () {
    it('.stat()', function (done) {
      fs.stat(__filename, function (err, stats) {
        assert(!err)
        assert.equal(typeof stats.size, 'number')
        done()
      })
    })

    it('.exists()', function (done) {
      fs.exists(__filename, function (err, exists) {
        assert(!err)
        assert(exists)
        done()
      })
    })
  })
})

describe('child_process', function () {
  var cp = require('../child_process')

  it('.exec().then()', function (done) {
    cp.exec('node --version').then(function (stdout) {
      assert.equal(stdout.toString('utf8')[0], 'v')
      done()
    })
  })

  it('.exec().catch()', function (done) {
    cp.exec('lkajsdfkljalskdfjalsdf').catch(function (err) {
      done()
    })
  })

  describe('callback support', function () {
    it('.exec() success', function (done) {
      cp.exec('node --version', function (err, stdout) {
        assert.equal(stdout.toString('utf8')[0], 'v')
        done()
      })
    })

    it('.exec() err', function (done) {
      cp.exec('lkajsdfkljalskdfjalsdf', function (err) {
        assert(err)
        done()
      })
    })
  })
})

describe('crypto', function () {
  var crypto = require('../crypto')

  it('.randomBytes().then()', function (done) {
    crypto.randomBytes(8).then(function (buf) {
      assert.equal(buf.length, 8)
      done()
    })
  })

  describe('callback support', function () {
    it('.randomBytes()', function (done) {
      crypto.randomBytes(8, function (err, buf) {
        assert(!err)
        assert.equal(buf.length, 8)
        done()
      })
    })
  })
})

describe('zlib', function () {
  var zlib = require('../zlib')

  it('.gzip().then().gunzip()', function (done) {
    zlib.gzip('lol').then(function (res) {
      return zlib.gunzip(res)
    }).then(function (string) {
      assert.equal(string, 'lol')
      done()
    })
  })

  describe('callback support', function () {
    it('.gzip() and .gunzip()', function (done) {
      zlib.gzip('lol', function (err, res) {
        assert(!err)
        assert(Buffer.isBuffer(res))
        zlib.gunzip(res, function (err, string) {
          assert(!err)
          assert.equal(string, 'lol')
          done()
        })
      })
    })
  })
})
