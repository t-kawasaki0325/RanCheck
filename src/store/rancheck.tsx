import { IState } from './store'
import { rancheckRepository, googleRepository } from '../services'
import { IRancheckEntity } from '../usecase'
import { addRancheckType, registerRancheckType } from '../services/repository/rancheckRepository';

export type SortType = '' | 'rank' | 'transition'

export const rancheckGetters = (store: IState['rancheck']) => ({
  exists: (keywords: string[]) => {
    const filterd =
      store.settings.filter(setting => !keywords.includes(setting.keyword)) ||
      []
    return filterd.length !== store.settings.length
  },

  sorted: (
    type: SortType,
    rank: boolean,
    transition: boolean,
  ): IRancheckEntity[] => {
    const [settings, outrangeSettings] = store.settings.reduce<
      [IRancheckEntity[], IRancheckEntity[]]
    >(
      (
        prev: [IRancheckEntity[], IRancheckEntity[]],
        current: IRancheckEntity,
      ) => {
        return current.latestRank() !== 0
          ? [prev[0].concat(current), prev[1]]
          : [prev[0], prev[1].concat(current)]
      },
      [[], []],
    )
    if (type === 'rank') {
      rank
        ? settings.sort((a, b) => (a.latestRank() > b.latestRank() ? 1 : -1))
        : settings.sort((a, b) => (a.latestRank() < b.latestRank() ? 1 : -1))
    }
    if (type === 'transition') {
      transition
        ? settings.sort((a, b) =>
            a.rankTransition() > b.rankTransition() ? 1 : -1,
          )
        : settings.sort((a, b) =>
            a.rankTransition() < b.rankTransition() ? 1 : -1,
          )
    }
    return settings.concat(outrangeSettings)
  }
})

export default {
  addRancheck: async (payload: addRancheckType) =>
    await rancheckRepository.add(payload),
  registerRancheck: async (payload: registerRancheckType) =>
    await rancheckRepository.register(payload),
  setRancheck: (payload: IRancheckEntity) => payload,
  deleteRancheck: (id: string, site: string, keyword: string, token: string, hasToken: boolean) =>
    rancheckRepository.delete(id, site, keyword, token, hasToken),
  fetchRancheck: async (site: string) => await rancheckRepository.get(site),
  fetchAllRancheck: async () => await rancheckRepository.getAll(),
  googleSearch: async (setting: IRancheckEntity, site: string) => {
    const { rank, title, url } = await googleRepository.getSearchResult(
      setting.keyword,
      site,
    )
    // TODO: 本来編集するべきでないので直す
    setting.addRank(title, url, rank)
    rancheckRepository.update(setting)
    return setting
  },
  download: async (settings: IRancheckEntity[], site: string, token: string) => {
    const ranks = await rancheckRepository.download(token, site)
    const copiedSettings = [...settings]
    Object.entries(ranks).map(([key, value]) => {
      const index = settings.findIndex(setting => setting.keyword === key)
      const { title, url, result } = value

      const rank = result.pop()
      // TODO: 本来編集するべきでないので直す
      copiedSettings[index]!.addRank(title, url, rank.rank)
      rancheckRepository.update(copiedSettings[index])
    })
    return copiedSettings
  },
  isValidLicense: async (token: string) =>
    await rancheckRepository.isValidLicense(token)
}
