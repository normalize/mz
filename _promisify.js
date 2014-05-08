
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
  var slice = require('sliced')

  module.exports = function mz_promisify(name, fn) {
    // set(anonymous, name)
    return anonymous

    function anonymous() {
      var args = slice(arguments)
      return new Promise(function (resolve, reject) {
        fn.apply(null, args.concat(function (err, res) {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        }))
      })
    }
  }
}
