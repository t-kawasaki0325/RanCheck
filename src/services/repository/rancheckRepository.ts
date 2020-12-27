import { rancheckDao as rancheckDatastore } from '../datastore'
import { rancheckDao as rancheckApi } from '../httpRequest'
import { IRancheckEntity, RancheckEntity } from '../../usecase'

export type addRancheckType = {
  site: string
  keywords: string[]
}

const rancheckRepository = {
  get: async (site: string): Promise<IRancheckEntity[]> => {
    return await rancheckDatastore.get(site)
  },

  add: async ({
    site,
    keywords,
  }: addRancheckType): Promise<IRancheckEntity[]> => {
    return await rancheckDatastore.add(
      keywords.map(keyword => new RancheckEntity('', site, keyword)),
    )
  },

  update: (setting: IRancheckEntity) => {
    rancheckDatastore.update(setting)
  },

  delete: (id: string) => {
    rancheckDatastore.delete(id)
  },
  
  isValidLicense: async (token: string): Promise<boolean> => {
    return await rancheckApi.isValidLicense(token)
  }
}

export default rancheckRepository
