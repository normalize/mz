
var thenifyAll = require('thenify-all')
var fs;
try {
  fs = require('graceful-fs');
} catch(err) {
  fs = require('fs');
}

thenifyAll(fs, exports, [
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
])

// don't know enough about promises to do this haha
exports.exists = thenifyAll.thenify(function exists(filename, done) {
  fs.stat(filename, function (err) {
    done(null, !err)
  })
})
