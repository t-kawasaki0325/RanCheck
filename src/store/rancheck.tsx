import { IState } from './store';
import { rancheckRepository, googleRepository } from '../services'
import { IRancheckEntity } from '../usecase'
import { addRancheckType } from '../services/repository/rancheckRepository';

export const rancheckGetters = (store: IState['rancheck']) => ({
  exists: (keywords: string[]) => {
    const filterd = store.settings.filter(
      setting => !keywords.includes(setting.keyword)
    ) || []
    return filterd.length !== store.settings.length
  }
})

export default {
  addRancheck: async (payload: addRancheckType) => await rancheckRepository.add(payload),
  setRancheck: (payload: IRancheckEntity) => payload,
  deleteRancheck: (id: string) => rancheckRepository.delete(id),
  fetchRancheck: async () => await rancheckRepository.get(),
  googleSearch: async (setting: IRancheckEntity, site: string) => {
    const { rank } = await googleRepository.getSearchResult(setting.keyword, site)
    // TODO: 本来編集するべきでないので直す
    setting.addRank(rank)
    rancheckRepository.update(setting)
    return setting
  }
}