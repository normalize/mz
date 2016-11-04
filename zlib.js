
require('thenify-all').withCallback(
  require('zlib'),
  exports, [
    'deflate',
    'deflateRaw',
    'gunzip',
    'gzip',
    'inflate',
    'inflateRaw',
    'unzip',
  ]
)
