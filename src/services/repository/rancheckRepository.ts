import { rancheckDao } from '../datastore'
import { IRancheckEntity, RancheckEntity } from '../../usecase'

export type addRancheckType = {
  site: string
  keywords: string[]
}

const rancheckRepository = {
  get: async (site: string): Promise<IRancheckEntity[]> => {
    return await rancheckDao.get(site)
  },

  add: async ({
    site,
    keywords,
  }: addRancheckType): Promise<IRancheckEntity[]> => {
    return await rancheckDao.add(
      keywords.map(keyword => new RancheckEntity('', site, keyword)),
    )
  },

  update: (setting: IRancheckEntity) => {
    rancheckDao.update(setting)
  },

  delete: (id: string) => {
    rancheckDao.delete(id)
  },
}

export default rancheckRepository
