import db from './db'
import { IRancheckEntity } from '../../usecase'

const rancheckDao = {
  get: async (): Promise<IRancheckEntity[]> => {
    return new Promise(resolve => {
      db.find({}, (err: any, docs: any) => {
        resolve(docs)
      })
    })
  }
}

export default rancheckDao