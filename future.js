var pull = require('pull-stream')

module.exports = function future (stream, fn) {
  return new Promise(function (resolve, reject) {
    fn = fn || onEnd
    pull(stream, fn(resolve, reject))
  })
}

function onEnd (resolve, reject) {
  return pull.onEnd(function (err) {
    if (err) reject(err)
    else resolve()
  })
}

