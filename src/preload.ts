require('dotenv').config()
// @ts-ignore
global.cheerio = require('cheerio')
// @ts-ignore
global.datastore = require('nedb')
// @ts-ignore
global.recharts = require('recharts')
// @ts-ignore
global.path = require('path')
// @ts-ignore
global.crypt = require('crypto')
// @ts-ignore
global.pathToDb =
  process.env.NODE_ENV === 'development'
    ? __dirname
    : // @ts-ignore
      global.path.join(__dirname, '../datastore')

const _setImmediate = setImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
})
