// @ts-ignore
global.cheerio = require('cheerio')
// @ts-ignore
global.datastore = require('nedb')

const _setImmediate = setImmediate
process.once('loaded', (() => {
  global.setImmediate = _setImmediate
}))
