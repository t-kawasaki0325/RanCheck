import { datastore, path, pathToDb } from '../../localModules'

export const rancheck = new datastore({
  filename: path.join(pathToDb, 'rancheck.db'),
  autoload: true
})

export const projects = new datastore({
  filename: path.join(pathToDb, 'projects.db'),
  autoload: true
})

export const users = new datastore({
  filename: path.join(pathToDb, 'users.db'),
  autoload: true
})
