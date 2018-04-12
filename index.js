var pull = require('pull-stream')

module.exports = function (stream) {
  return new Promise(function (resolve, reject) {
    pull(stream, pull.onEnd(function (err) {
      if (err) reject(err)
      else resolve()
    }))
  })
}
