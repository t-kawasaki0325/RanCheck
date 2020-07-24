import { datastore } from '../../localModules'

const db = new datastore({
  filename: 'rancheck.db',
  autoload: true
})

export default db