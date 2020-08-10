import { rancheckDao } from '../datastore'
import { IRancheckEntity, RancheckEntity } from '../../usecase'

const rancheckRepository = {
  get: async () => {
    const data = await rancheckDao.get()
    return data.map((row: IRancheckEntity) => {
      const { _id, title, site, url, keyword, gRank } = row
      return new RancheckEntity(_id, title, site, url, keyword, gRank)
    })
  }
}

export default rancheckRepository