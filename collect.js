var collect = require('pull-stream/sinks/collect')

module.exports = function () {
  return function (resolve, reject) {
    return collect(function (err, arr) {
      if (err) reject(err)
      else resolve(arr)
    })
  }
}
