import { cheerio } from '../../localModules'
import { searchEngineDao } from '../httpRequest'
import { GoogleSearchResultEntity } from '../../usecase'

const SELECTOR = '.rc .r > a'

const googleRepository = {
  get: async (keyword: string) => {
    const data = await searchEngineDao.google(keyword)

    const $ = cheerio.load(data)
    const elements = $(SELECTOR)

    return Object.values(elements).map((element, index) => {
      const url = (element as any).attribs.href
      const rank = index + 1
      return new GoogleSearchResultEntity(rank, url)
    })
  }
}

export default googleRepository