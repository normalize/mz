
var promisify
try {
  promisify = require('bluebird').promisify
} catch (_) {}

if (promisify) {
  module.exports = function mz_promisify(name, fn) {
    return promisify(fn)
  }
} else {
  if (typeof Promise !== 'function') {
    console.error()
    console.error('mz: a `Promise` implementation could not be found.')
    console.error('mz: please use a version of node that has native Promises')
    console.error('mz: or `npm i bluebird`')
    console.error()
    process.exit(1)
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
}

module.exports.bluebird = !!promisify

function makeCallback(resolve, reject) {
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
