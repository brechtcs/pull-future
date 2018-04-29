# pull-resolve

A small wrapper function around `pull.onEnd`, which drains the stream passed to it and returns a promise.

## Usage

```js
var pull = require('pull-stream')
var resolve = require('pull-resolve')

async function example () {
  var stream = pull(
    pull.values([5, 4, 3, 2, 1, ]),
    pull.asyncMap(someMagic)
  )

  try {
    await resolve(stream)
    // Move on
  } catch (err) {
    // Handle error
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
