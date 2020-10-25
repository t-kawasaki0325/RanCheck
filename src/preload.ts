// @ts-ignore
global.cheerio = require('cheerio')
// @ts-ignore
global.datastore = require('nedb')
// @ts-ignore
global.recharts = require('recharts')
// @ts-ignore
global.path = require('path')
// @ts-ignore
global.pathToDb = process.env.NODE_ENV ? path.join(__dirname, '../') : __dirname

const _setImmediate = setImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
})
