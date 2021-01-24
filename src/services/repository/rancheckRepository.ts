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
    return rancheckDatastore.get(site)
  },

  getAll: async (): Promise<IRancheckEntity[]> => {
    return rancheckDatastore.all()
  },

  add: async ({
    token,
    hasToken,
    site,
    keywords,
  }: addRancheckType): Promise<IRancheckEntity[]> => {
    let isSucceed = true
    if (hasToken) {
      isSucceed = await rancheckApi.register(token, site, keywords)
    }
    // トークンを保持かつAPIの処理に失敗したときにはローカルのDBに保存処理を行わない
    return isSucceed
      ? rancheckDatastore.add(
          keywords.map(keyword => new RancheckEntity('', site, keyword)),
        )
      : []
  },

  register: async ({
    token,
    site,
    keywords,
  }: registerRancheckType): Promise<boolean> => {
    return rancheckApi.register(token, site, keywords)
  },

  update: (setting: IRancheckEntity) => {
    rancheckDatastore.update(setting)
  },

  delete: async (
    id: string,
    site: string,
    keyword: string,
    token: string,
    hasToken: boolean,
  ): Promise<boolean> => {
    let isSucceed = true
    if (hasToken) {
      isSucceed = await rancheckApi.deleteKeyword(token, site, [keyword])
    }
    if (isSucceed) {
      rancheckDatastore.delete(id)
    }
    return isSucceed
  },

  download: async (token: string, site: string) => {
    return rancheckApi.download(token, site)
  },

  isValidLicense: async (token: string): Promise<boolean> => {
    return rancheckApi.isValidLicense(token)
  },
}

export default rancheckRepository
