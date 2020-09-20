import { datastore } from '../../localModules'

export const rancheck = new datastore({
  filename: 'rancheck.db',
  autoload: true
})

export const projects = new datastore({
  filename: 'projects.db',
  autoload: true
})