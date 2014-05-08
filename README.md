
# MDZ - Modernize node.js

Modernize node.js to current ECMAScript specifications!
node.js will not update their API to ES6+ [for a while](https://github.com/joyent/node/issues/7549).
This library is a wrapper for various aspects of node.js' API.

## Installation and Usage

Set `mdz` as a dependency and install it.

```bash
npm i mdz
```

Then prefix the relevant `require()`s with `mdz/`:

```js
var fs = require('mdz/fs')

fs.exists(__filename).then(function (exists) {
  if (exists) // do something
})
```

Personally, I use this with generator-based control flow libraries such as [co](https://github.com/visionmedia/co) so I don't need to use implementation-specific wrappers like [co-fs](https://github.com/visionmedia/co-fs).

```js
var co = require('co')
var fs = require('mdz/fs')

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
var exec = require('mdz/child_process').exec

exec('node --version').then(function (stdout) {
  console.log(stdout)
})
```

If you're using node v0.11.13+,
the native v8 `Promise` is used.
Otherwise, __you must install [bluebird][bluebird] yourself__.
If you want to force this library to use [bluebird][bluebird], set the `MDZ_BLUEBIRD` environmental variable:

```bash
export MDZ_BLUEBIRD=1
```

## FAQ

### Can I use this in production?

You may want to always use bluebird in production until v8 fixes and optimizes its `Promise` implementation.

### Can I add more features?

Sure.
Open an issue.

[bluebird]: https://github.com/petkaantonov/bluebird
