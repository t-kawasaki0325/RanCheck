import { rancheckRepository, googleRepository } from '../services'
import { IRancheckEntity } from '../usecase'
import { addRancheckType } from '../services/repository/rancheckRepository';

export default {
  addRancheck: async (payload: addRancheckType) => await rancheckRepository.add(payload),
  setRancheck: (payload: IRancheckEntity) => payload,
  fetchRancheck: async () => await rancheckRepository.get(),
  googleSearch: async (setting: IRancheckEntity, site: string) => {
    const { rank } = await googleRepository.getSearchResult(setting.keyword, site)
    setting.addRank(rank)
    rancheckRepository.update(setting)
    return setting
  }
}