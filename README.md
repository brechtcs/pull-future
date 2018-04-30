# pull-resolve

Library to wrap `pull-stream` sinks and await the result.

## Usage

A basic resolver just wraps `pull.onEnd`. This lets you wait until a pull-stream has finished, and move on or catch errors accordingly.

```js
var pull = require('pull-stream')
var resolve = require('pull-resolve')

async function demo () {
  var stream = pull(
    pull.values([5, 4, 3, 2, 1]),
    pull.asyncMap(someMagic)
  )

  try {
    await resolve(stream)
    // Move on
  } catch (err) {
    // Handle errors
  }
}
```

### Builtin sinks

In addition to `pull.onEnd`, this library ships with a couple of plugins to support other builtin pull-stream sinks as well.

#### collect()

This plugin is used without arguments.

```js
var collect = require('pull-resolve/collect')
var pull = require('pull-stream')
var resolve = require('pull-resolve')

async function demo () {
  var stream = pull.values([1, 2, 3])
  var result = await resolve(stream, collect())

  console.log(result) // [1, 2, 3]
}
```

#### concat()

This plugin is used without arguments.

```js
var concat = require('pull-resolve/concat')
var pull = require('pull-stream')
var resolve = require('pull-resolve')

async function demo () {
  var stream = pull.values(['some', 'stuff'])
  var result = await resolve(stream, concat())

  console.log(result) // 'somestuff'
}
```

#### find(test?: function)

This plugin takes a test function as argument, just like `Array.prototype.find`.

```js
var find = require('pull-resolve/find')
var pull = require('pull-stream')
var resolve = require('pull-resolve')

async function demo () {
  var stream = pull.values(['some', 'mysterious', 'stuff'])
  var result = await resolve(stream, find(word => word.includes('myst')))

  console.log(result) // 'mysterious'
}
```

#### reduce(reducer: function, accumulator?: any)

This plugin takes a reducer function and an optional accumulator value as arguments, just like `Array.prototype.reduce`.

```js
var pull = require('pull-stream')
var reduce = require('pull-resolve/reduce')
var resolve = require('pull-resolve')

async function demo () {
  var stream = pull.values([1, 1, 2, 3, 5, 8])
  var resolve = await resolve(stream, reduce(function (acc, val) {
    return acc + val
  }, 0))

  console.log(result) // 20
}
```

### Advanced sinks

You can wrap any pull-stream sink and plug it into a resolver. This example using `pull-level` demonstrates the correct pattern:

```js
var level = require('pull-level')
var pull = require('pull-stream')
var resolve = require('pull-resolve')

function write (db, opts) {
  return function (resolve, reject) {
    return level.write(db, opts, function (err) {
      if (err) reject(err)
      else resolve()
    })
  }
}

async function demo () {
  var stream = pull.values(someData)
  
  try {
    await resolve(stream, write(db))
    // move on
  } catch (err) {
    // handle errors
  }
}
```

### Compatibility

If `async/await` isn't supported in your environment, you can use the promise directly:

```js
resolve(stream).then(moveOn).catch(handleError)
```

## License

Apache-2.0
