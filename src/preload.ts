// @ts-ignore
global.cheerio = require('cheerio')
// @ts-ignore
global.datastore = require('nedb')
// @ts-ignore
global.recharts = require('recharts')

const _setImmediate = setImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
})
