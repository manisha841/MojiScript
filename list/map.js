const signature = require('../_internal/debug/signature')
const call = require('../_internal/call')
const reduceWhile = require('./reduceWhile')
const isIterable = require('../_internal/isIterable')
const isFunctor = require('../_internal/isFunctor')

const asyncMapReducer = func => acc => x => call(val => (acc.push(val), acc))(func(x))

// map :: Function -> Mapable -> Array
const map = func => mapable =>
  isIterable(mapable) ? reduceWhile(null)(asyncMapReducer(func))([])(mapable)
  : isFunctor(mapable) ? (mapable['fantasy-land/map'] || mapable.map).call(mapable, func)
  : (() => { throw new TypeError('Object is not mappable.') })()

module.exports = map

// Experimental debug code
if (process.env.MOJI_DEBUG === 'true') {
  module.exports = signature({ method: 'map', args: [ 'Function', 'Mapable' ], returnType: 'Array' })(map)
}
