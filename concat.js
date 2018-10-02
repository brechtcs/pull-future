var concat = require('pull-stream/sinks/concat')

module.exports = function () {
  return function (resolve, reject) {
    return concat(function (err, str) {
      if (err) reject(err)
      else resolve(str)
    })
  }
}
