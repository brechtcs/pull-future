var asyncMap = require('pull-stream/throughs/async-map')

module.exports = function resolve () {
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

  return asyncMap(res)
}
