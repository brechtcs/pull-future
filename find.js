var pull = require('pull-stream')

module.exports = function (test) {
  return function (resolve, reject) {
    return pull.find(test, function (err, res) {
      if (err) reject(err)
      else resolve(res)
    })
  }
}
