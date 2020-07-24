import { cheerio } from '../../localModules'
import { sleep, includeString } from '../../utils'
import { searchEngineDao } from '../httpRequest'
import { IGoogleSearchResultEntity, GoogleSearchResultEntity } from '../../usecase'

const SELECTOR = '.rc .r > a'

const LOOP_NUM = 10
const LENGTH_PER_PAGE = 10

const googleRepository = {
  getSearchResult: async (keyword: string, site: string): Promise<IGoogleSearchResultEntity> => {
    for (let count = 0; count < LOOP_NUM; count++) {
      const results = await googleRepository.get(keyword, count)

      const matchSearchResult = results.find(result => includeString(result.url, site))
      if (!!matchSearchResult) {
        return matchSearchResult
      }

      await sleep()
    }

    return new GoogleSearchResultEntity;
  },

  get: async (keyword: string, page: number): Promise<IGoogleSearchResultEntity[]> => {
    const data = await searchEngineDao.google(keyword, page)

    const $ = cheerio.load(data)
    const elements = $(SELECTOR)

    return Object.values(elements)
      .slice(0, LENGTH_PER_PAGE)
      .map((element, index) => {
        const url = (element as any).attribs.href
        const rank = page * 10 + index + 1
        return new GoogleSearchResultEntity(rank, url)
      })
  }
}

export default googleRepository