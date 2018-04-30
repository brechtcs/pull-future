var pull = require('pull-stream')

module.exports = function () {
  return function (resolve, reject) {
    return pull.concat(function (err, str) {
      if (err) reject(err)
      else resolve(str)
    })
  }
}
