
var falsey = {
  0: true,
  false: true,
  no: true,
  nope: true
}

var bloob = process.env.MZ_BLUEBIRD
if (typeof Promise === 'undefined' || (bloob && !falsey[bloob])) {
  // use bluebird
  var promisify
  try {
    promisify = require('bluebird').promisify
  } catch (err) {
    throw new Error('please install bluebird!')
  }
  module.exports = function mz_promisify(name, fn) {
    return promisify(fn)
  }
} else if (typeof Promise === 'function') {
  // var set = require('function-name')
  var makeCallback = function(resolve, reject) {
    return function(err, value) {
      if (err) {
        reject(err)
      } else {
        var len = arguments.length
        if (len > 2) {
          var values = new Array(len - 1)
          for (var i = 1; i < len; ++i) {
            values[i - 1] = arguments[i]
          }
          resolve(values)
        } else {
          resolve(value)
        }
      }
    }
  }

  module.exports = function mz_promisify(name, fn) {
    // set(anonymous, name)
    return anonymous

    function anonymous() {
      var len = arguments.length
      var args = new Array(len + 1)
      for (var i = 0; i < len; ++i) {
        args[i] = arguments[i]
      }
      return new Promise(function (resolve, reject) {
        args[i] = makeCallback(resolve, reject)
        fn.apply(null, args)
      })
    }
  }
}
