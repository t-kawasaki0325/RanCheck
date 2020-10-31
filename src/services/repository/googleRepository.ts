import { cheerio } from '../../localModules'
import { sleep, includeString } from '../../utils'
import { searchEngineDao } from '../httpRequest'
import {
  IGoogleSearchResultEntity,
  GoogleSearchResultEntity,
} from '../../usecase'

const SELECTOR = '.rc > div > a:not([class])'

const MAX_SEARCH_NUM = 100

const googleRepository = {
  getSearchResult: async (
    keyword: string,
    site: string,
  ): Promise<IGoogleSearchResultEntity> => {
    let page = 0
    let totalSearchNum = 0
    while (1) {
      const results = await googleRepository.get(keyword, page, totalSearchNum)

      // 検索結果が見つかったとき
      const matchSearchResult = results.find(result =>
        includeString(result.url, site),
      )
      if (!!matchSearchResult) {
        return matchSearchResult
      }

      page++
      totalSearchNum += results.length
      // 検索結果が見つからず100位まで検索したとき
      if (totalSearchNum >= MAX_SEARCH_NUM) {
        break
      }

      await sleep()
    }

    // 検索結果が100位より下の場合は一律で110位に設定する
    return new GoogleSearchResultEntity(MAX_SEARCH_NUM + 10)
  },

  get: async (
    keyword: string,
    page: number,
    baseRank: number,
  ): Promise<IGoogleSearchResultEntity[]> => {
    const data = await searchEngineDao.google(keyword, page)

    const $ = cheerio.load(data)
    const elements = $(SELECTOR)

    return elements
      .map((index: number, element: Node) => {
        const title = $(element).find('h3 span').text()
        const url = $(element).attr('href')
        const rank = baseRank + index + 1
        return new GoogleSearchResultEntity(rank, url, title)
      })
      .get()
  },
}

export default googleRepository
