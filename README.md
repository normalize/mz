
# MZ - Modernize node.js

Modernize node.js to current ECMAScript specifications!
node.js will not update their API to ES6+ [for a while](https://github.com/joyent/node/issues/7549).
This library is a wrapper for various aspects of node.js' API.

## Installation and Usage

Set `mz` as a dependency and install it.

```bash
npm i mz
```

Then prefix the relevant `require()`s with `mz/`:

```js
var fs = require('mz/fs')

fs.exists(__filename).then(function (exists) {
  if (exists) // do something
})
```

Personally, I use this with generator-based control flow libraries such as [co](https://github.com/visionmedia/co) so I don't need to use implementation-specific wrappers like [co-fs](https://github.com/visionmedia/co-fs).

```js
var co = require('co')
var fs = require('mz/fs')

co(function* () {
  if (yield fs.exists(__filename)) // do something
})()
```

## Promisification

Many node methods are converted into promises.
Any properties that are deprecated or aren't asynchronous will simply be proxied.
The modules wrapped are:

- `child_process`
- `crypto`
- `dns`
- `fs`
- `zlib`

```js
var exec = require('mz/child_process').exec

exec('node --version').then(function (stdout) {
  console.log(stdout)
})
```

If you're using node v0.11.13+,
the native v8 `Promise` is used.
Otherwise, __you must install [bluebird][bluebird] yourself__.
If you want to force this library to use [bluebird][bluebird], set the `MZ_BLUEBIRD` environmental variable:

```bash
export MZ_BLUEBIRD=1
```

## FAQ

### Can I use this in production?

You may want to always use bluebird in production until v8 fixes and optimizes its `Promise` implementation.

### Will this make my app faster?

Nope

### Can I add more features?

Sure.
Open an issue.

Currently, the plans are to eventually support:

- ECMAScript7 Streams

[bluebird]: https://github.com/petkaantonov/bluebird
