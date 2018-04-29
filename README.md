# pull-resolve

A small wrapper function around `pull.onEnd`, which drains the stream passed to it and returns a promise.

## Usage

```js
var pull = require('pull-stream')
var resolve = require('pull-resolve')

var stream = pull(
  pull.values([5, 4, 3, 2, 1, ]),
  pull.asyncMap(someMagic)
)

resolve(stream).then(function () {
  // Move on
}).catch(function (err) {
  // Handle error
})
```

Like all promises, you can also use this with `async/await`:

```js
async function drainStream () {
  try {
    await resolve(stream)
    // Move on
  } catch (err) {
    // Handle error
  }
}
```

## License

Apache-2.0
