var pull = require('pull-stream')

module.exports = function (...args) {
  return function (resolve, reject) {
    return pull.reduce(...args, function (err, res) {
      if (err) reject(err)
      else resolve(res)
    })
  }
}
