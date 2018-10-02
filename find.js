var find = require('pull-stream/sinks/find')

module.exports = function (test) {
  return function (resolve, reject) {
    return find(test, function (err, res) {
      if (err) reject(err)
      else resolve(res)
    })
  }
}
