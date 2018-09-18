var pull = require('pull-stream')

module.exports = function resolve (stream, fn) {
  return new Promise(function (resolve, reject) {
    fn = fn || onEnd
    pull(stream, fn(resolve, reject))
  })
}

module.exports.map = function map (mapper) {
  function res (val, cb) {
    if (typeof val.then === 'function') {
      val.then(function (data) {
        cb(null, data)
      }).catch(function (err) {
        cb(err)
      })
    } else {
      cb(null, val)
    }
  }

  return pull(
    pull.map(mapper),
    pull.asyncMap(res)
  )
}

function onEnd (resolve, reject) {
  return pull.onEnd(function (err) {
    if (err) reject(err)
    else resolve()
  })
}
