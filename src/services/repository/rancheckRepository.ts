import { rancheckDao } from '../datastore'
import { IRancheckEntity, RancheckEntity } from '../../usecase'

const rancheckRepository = {
  get: async (): Promise<IRancheckEntity[]> => {
    return await rancheckDao.get()
  },

  add: async (title: string, site: string, keywords: string[]): Promise<IRancheckEntity[]> => {
    return await rancheckDao.add(keywords.map(
      keyword => new RancheckEntity('', title, site, keyword)
    ))
  },

  delete: (id: string) => {
    rancheckDao.delete(id)
  }
}

export default rancheckRepository