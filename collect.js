var pull = require('pull-stream')

module.exports = function () {
  return function (resolve, reject) {
    return pull.collect(function (err, arr) {
      if (err) reject(err)
      else resolve(arr)
    })
  }
}
