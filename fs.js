
var Promise = require('any-promise')
var fs
try {
  fs = require('graceful-fs')
} catch(err) {
  fs = require('fs')
}

var api = [
  'appendFile',
  'chmod',
  'chown',
  'close',
  'fchmod',
  'fchown',
  'fstat',
  'fsync',
  'ftruncate',
  'futimes',
  'lchown',
  'link',
  'lstat',
  'mkdir',
  'mkdtemp',
  'open',
  'read',
  'readFile',
  'readdir',
  'readlink',
  'realpath',
  'rename',
  'rmdir',
  'stat',
  'symlink',
  'truncate',
  'unlink',
  'utimes',
  'write',
  'writeFile',
]

typeof fs.access === 'function' && api.push('access')
typeof fs.mkdtemp === 'function' && api.push('mkdtemp')

require('thenify-all').withCallback(fs, exports, api)

exports.exists = function (filename, callback) {
  // callback
  if (typeof callback === 'function') {
    return fs.stat(filename, function (err) {
      callback(null, !err);
    })
  }
  // or promise
  return new Promise(function (resolve) {
    fs.stat(filename, function (err) {
      resolve(!err)
    })
  })
}
