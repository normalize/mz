
var promisify = require('./_promisify.js')

module.exports = function (source, exports, methods) {
  methods.forEach(function (name) {
    // fucking node and util.deprecate()
    var desc = Object.getOwnPropertyDescriptor(source, name)
    if (desc.get) return // fuck this shit
    
    if (typeof source[name] === 'function')
      exports[name] = promisify(name, source[name])
  })

  // proxy the rest
  Object.keys(source).forEach(function (name) {
    if (!exports[name]) exports[name] = source[name]
  })
}
