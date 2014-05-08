
var fs = require('fs')

var promisify = require('./_promisify.js')

var methods = [
  'rename',
  'ftruncate',
  'chown',
  'fchown',
  'lchown',
  'chmod',
  'fchmod',
  'stat',
  'lstat',
  'fstat',
  'link',
  'symlink',
  'readlink',
  'realpath',
  'unlink',
  'rmdir',
  'mkdir',
  'readdir',
  'close',
  'open',
  'utimes',
  'futimes',
  'fsync',
  'write',
  'read',
  'readFile',
  'writeFile',
  'appendFile',
]

methods.forEach(function (name) {
  if (typeof fs[name] === 'function')
    exports[name] = promisify(name, fs[name])
})

// don't know enough about promises to do this haha
exports.exists = promisify('exists', function exists(filename, done) {
  fs.stat(filename, function (err) {
    done(null, !err)
  })
})

// proxy the rest
Object.keys(fs).forEach(function (name) {
  if (!exports[name]) exports[name] = fs[name]
})
