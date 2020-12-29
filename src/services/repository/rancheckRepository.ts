import { rancheckDao as rancheckDatastore } from '../datastore'
import { rancheckDao as rancheckApi } from '../httpRequest'
import { IRancheckEntity, RancheckEntity } from '../../usecase'

export type registerRancheckType = {
  token: string
  site: string
  keywords: string[]
}

export type addRancheckType = registerRancheckType & {
  hasToken: boolean
}

const rancheckRepository = {
  get: async (site: string): Promise<IRancheckEntity[]> => {
    return await rancheckDatastore.get(site)
  },

  getAll: async (): Promise<IRancheckEntity[]> => {
    return await rancheckDatastore.all()
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

  register: async ({
    token,
    site,
    keywords,
  }: registerRancheckType): Promise<void> => {
    await rancheckApi.register(token, site, keywords)
  },

  update: (setting: IRancheckEntity) => {
    rancheckDatastore.update(setting)
  },

  delete: (id: string, site: string, keyword: string, token: string, hasToken: boolean) => {
    rancheckDatastore.delete(id)
    if (hasToken) {
      rancheckApi.deleteKeyword(token, site, [keyword])
    }
  },

  download: async (token: string, site: string) => {
    return await rancheckApi.download(token, site)
  },
  
  isValidLicense: async (token: string): Promise<boolean> => {
    return await rancheckApi.isValidLicense(token)
  }
}

export default rancheckRepository
