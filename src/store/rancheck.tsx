import { IState } from './store';
import { rancheckRepository, googleRepository } from '../services'
import { IRancheckEntity } from '../usecase'
import { addRancheckType } from '../services/repository/rancheckRepository';

export type SortType = '' | 'rank' | 'transition'

export const rancheckGetters = (store: IState['rancheck']) => ({
  exists: (keywords: string[]) => {
    const filterd = store.settings.filter(
      setting => !keywords.includes(setting.keyword)
    ) || []
    return filterd.length !== store.settings.length
  },

  sorted: (
    type: SortType,
    rank: boolean,
    transition: boolean
  ): IRancheckEntity[] => {
    const settings = store.settings.slice()
    if (type === 'rank') {
      rank
        ? settings.sort((a, b) => a.latestRank() > b.latestRank() ? 1 : -1)
        : settings.sort((a, b) => a.latestRank() < b.latestRank() ? 1 : -1)
    }
    if (type === 'transition') {
      transition
        ? settings.sort((a, b) => a.rankTransition() > b.rankTransition() ? 1 : -1)
        : settings.sort((a, b) => a.rankTransition() < b.rankTransition() ? 1 : -1)
    }
    return settings
  }
})

export default {
  addRancheck: async (payload: addRancheckType) => await rancheckRepository.add(payload),
  setRancheck: (payload: IRancheckEntity) => payload,
  deleteRancheck: (id: string) => rancheckRepository.delete(id),
  fetchRancheck: async (site: string) => await rancheckRepository.get(site),
  googleSearch: async (setting: IRancheckEntity, site: string) => {
    const { rank } = await googleRepository.getSearchResult(setting.keyword, site)
    // TODO: 本来編集するべきでないので直す
    setting.addRank(rank)
    rancheckRepository.update(setting)
    return setting
  }
}