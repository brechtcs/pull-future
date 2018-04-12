var end = require('./')
var pull = require('pull-stream')
var test = require('tape')

test('Happy flow', async function (t) {
  t.plan(1)

  var stream = pull(
    pull.values([1, 2, 3]),
    pull.asyncMap(function (val, cb) {
      cb(null, val * 2)
    })
  )

  try {
    await end(stream)
    t.ok(true, 'no error')
  } catch (err) {
    t.notOk(err, 'this should not be executred')
  }
})

test('Throw error', async function (t) {
  t.plan(1)

  var stream = pull(
    pull.values([1, 2, 3]),
    pull.asyncMap(function (val, cb) {
      cb(new Error('panic!'))
    })
  )

  try {
    await end(stream)
    t.ok(false, 'this should not be executred')
  } catch (err) {
    t.ok(err, 'error thrown')
  }
})
