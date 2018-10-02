var reduce = require('pull-stream/sinks/reduce')

module.exports = function (...args) {
  return function (resolve, reject) {
    return reduce(...args, function (err, res) {
      if (err) reject(err)
      else resolve(res)
    })
  }
}
