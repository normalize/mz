
var Promise = require('native-or-bluebird')
var fs
try {
  fs = require('graceful-fs')
} catch(err) {
  fs = require('fs')
}

var api = [
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

typeof fs.access === 'function' && api.push('access')

require('thenify-all')(fs, exports, api)

// don't know enough about promises to do this haha
exports.exists = function (filename) {
  return new Promise(function (resolve) {
    fs.stat(filename, function (err) {
      resolve(!err)
    })
  })
}
