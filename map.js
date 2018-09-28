var pull = require('pull-stream')

module.exports = function map (fn) {
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

  if (!fn) {
    return pull.asyncMap(res)
  }
  return pull(
    pull.map(fn),
    pull.asyncMap(res)
  )
}
