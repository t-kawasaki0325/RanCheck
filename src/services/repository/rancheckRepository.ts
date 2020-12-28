import { rancheckDao as rancheckDatastore } from '../datastore'
import { rancheckDao as rancheckApi } from '../httpRequest'
import { IRancheckEntity, RancheckEntity } from '../../usecase'

export type addRancheckType = {
  token: string
  hasToken: boolean
  site: string
  keywords: string[]
}

const rancheckRepository = {
  get: async (site: string): Promise<IRancheckEntity[]> => {
    return await rancheckDatastore.get(site)
  },

  add: async ({
    token,
    hasToken,
    site,
    keywords,
  }: addRancheckType): Promise<IRancheckEntity[]> => {
    const execList = [
      rancheckDatastore.add(
        keywords.map(keyword => new RancheckEntity('', site, keyword)),
      )
    ]
    // @ts-ignore
    hasToken && execList.push(rancheckApi.register(token, site, keywords))
    const [data] = await Promise.all(execList)
    return data
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
