import { rancheckRepository, googleRepository } from '../services'
import { IRancheckEntity } from '../usecase'

export default {
  setRancheck: (payload: IRancheckEntity) => payload,
  fetchRancheck: async () => await rancheckRepository.get(),
  googleSearch: async (setting: IRancheckEntity, site: string) => {
    const { rank } = await googleRepository.getSearchResult(setting.keyword, site)
    setting.addRank(rank)
    rancheckRepository.update(setting)
    return setting
  }
}