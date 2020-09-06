import { rancheckDao } from '../datastore'
import { IRancheckEntity, RancheckEntity } from '../../usecase'

export type addRancheckType = {
  title: string
  site: string
  keywords: string[]
}

const rancheckRepository = {
  get: async (): Promise<IRancheckEntity[]> => {
    return await rancheckDao.get()
  },

  add: async ({ title, site, keywords }: addRancheckType): Promise<IRancheckEntity[]> => {
    return await rancheckDao.add(keywords.map(
      keyword => new RancheckEntity('', title, site, keyword)
    ))
  },

  update: (setting: IRancheckEntity) => {
    rancheckDao.update(setting)
  },

  delete: (id: string) => {
    rancheckDao.delete(id)
  }
}

export default rancheckRepository