# pull-promise-end

A small wrapper function around `pull.onEnd`, which drains the stream passed to it and returns a promise.

## Usage

```js
var end = require('pull-promise-end')
var pull = require('pull-stream')

var stream = pull(
  pull.values([5, 4, 3, 2, 1, ]),
  pull.asyncMap(someMagic)
)

end(stream).then(function () {
  // Move on
}).catch(function (err) {
  // Handle error
})
```

Like all promises, you can also use this with `async/await`:

```js
async function drainStream () {
  try {
    await end(stream)
    // Move on
  } catch (err) {
    // Handle error
  }
}
```

## License

Apache-2.0