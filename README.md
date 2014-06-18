
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

## Promise Engine

If you've installed [bluebird][bluebird],
[bluebird][bluebird] will be used.
`mz` does not install [bluebird][bluebird] for you.

Otherwise, if you're using a node that has native v8 Promises (v0.11.13+),
then that will be used.

Otherwise, this library will crash the process and exit,
so you might as well install [bluebird][bluebird] as a dependency!

## FAQ

### Can I use this in production?

If you do, you should probably install [bluebird][bluebird] as
native v8 promises are still pretty raw.

### Will this make my app faster?

Nope, probably slower actually.

### Can I add more features?

Sure.
Open an issue.

Currently, the plans are to eventually support:

- ECMAScript7 Streams

[bluebird]: https://github.com/petkaantonov/bluebird
