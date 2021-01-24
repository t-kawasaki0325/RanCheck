import { datastore as Datastore, path, pathToDb } from '../../localModules'

export const rancheck = new Datastore({
  filename: path.join(pathToDb, 'rancheck.db'),
  autoload: true,
})

export const projects = new Datastore({
  filename: path.join(pathToDb, 'projects.db'),
  autoload: true,
})

export const users = new Datastore({
  filename: path.join(pathToDb, 'users.db'),
  autoload: true,
})
