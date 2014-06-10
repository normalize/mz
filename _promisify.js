
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
  module.exports.bluebird = true
} else if (typeof Promise === 'function') {
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
    return eval('(function ' + name + '() {\n'
      + 'var len = arguments.length\n'
      + 'var args = new Array(len + 1)\n'
      + 'for (var i = 0; i < len; ++i) args[i] = arguments[i]\n'
      + 'var lastIndex = i\n'
      + 'return new Promise(function (resolve, reject) {\n'
        + 'args[lastIndex] = makeCallback(resolve, reject)\n'
        + 'fn.apply(null, args)\n'
      + '})\n'
    + '})')
  }
  module.exports.bluebird = false
}
