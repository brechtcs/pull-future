var future = require('./future')
var pull = require('./')
var test = require('tape')

test('basic', async function (t) {
  try {
    await future(happy())
    t.ok(true, 'no error')
  } catch (err) {
    t.notOk(err, 'this should not be executed')
  }

  try {
    await future(fail())
    t.ok(false, 'this should not be executed')
  } catch (err) {
    t.ok(err, 'error thrown')
  }

  t.end()
})

test('collect', async function (t) {
  var collect = require('./collect')
  var result = await future(happy(), collect())

  t.ok(Array.isArray(result), 'returns array')
  t.equal(result[0], 2, 'first element')
  t.equal(result[1], 4, 'second element')
  t.equal(result[2], 6, 'third element')
  t.end()
})

test('concat', async function (t) {
  var concat = require('./concat')
  var result = await future(happy(), concat())

  t.ok(typeof result === 'string', 'returns string')
  t.equal(result, '246', 'verify result')
  t.end()
})

test('find', async function (t) {
  var find = require('./find')
  var result = await future(happy(), find(n => n % 3 === 0))

  t.ok(typeof result === 'number', 'returns number')
  t.equal(result, 6, 'verify result')

  try {
    await future(fail(), find(n => n % 3 === 0))
    t.ok(false, 'this should not be executed')
  } catch (err) {
    t.ok(err, 'catch error')
  }

  t.end()
})

test('reduce', async function (t) {
  var reduce = require('./reduce')

  var result = await future(happy(), reduce((acc, n) => acc + n, 1))
  t.ok(typeof result === 'number', 'returns number')
  t.equal(result, 13, 'verify result')

  var second = await future(happy(), reduce((acc, n) => acc + n))
  t.equal(second, 12, 'without accumulator')

  try {
    await future(fail(), reduce((acc, n) => acc + n))
    t.ok(false, 'this should not be executed')
  } catch (err) {
    t.ok(err, 'catch error')
  }

  t.end()
})

/**
 * Stream factories:
 */
function happy () {
  return pull(
    pull.values([1, 2, 3]),
    pull.map(async function (val) {
      return val * 2
    }),
    pull.resolve()
  )
}

function fail () {
  return pull(
    pull.values([1, 2, 3]),
    pull.map(async function (val) {
      throw new Error('panic!')
    }),
    pull.resolve()
  )
}
