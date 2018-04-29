var pull = require('pull-stream')
var resolve = require('./')
var test = require('tape')

var happy = pull(
  pull.values([1, 2, 3]),
  pull.asyncMap(function (val, cb) {
    cb(null, val * 2)
  })
)

var fail = pull(
  pull.values([1, 2, 3]),
  pull.asyncMap(function (val, cb) {
    cb(new Error('panic!'))
  })
)

test('onEnd', async function (t) {
  t.plan(2)

  try {
    await resolve(happy)
    t.ok(true, 'no error')
  } catch (err) {
    t.notOk(err, 'this should not be executred')
  }

  try {
    await resolve(fail)
    t.ok(false, 'this should not be executred')
  } catch (err) {
    t.ok(err, 'error thrown')
  }
})
