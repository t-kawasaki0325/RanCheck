import { rancheckDao } from '../datastore'
import { IRancheckEntity, RancheckEntity } from '../../usecase'

const rancheckRepository = {
  get: async () => {
    const data = await rancheckDao.get()
    return data.map((row: IRancheckEntity) => {
      const { title, site, url, keyword, gRank } = row
      return new RancheckEntity(title, site, url, keyword, gRank)
    })
  }
}

export default rancheckRepository