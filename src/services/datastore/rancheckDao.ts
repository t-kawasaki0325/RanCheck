import { rancheck } from './db'
import { IRancheckEntity, RancheckEntity } from '../../usecase'

export interface saveType {
  title: string
  site: string
  url: string
  keyword: string
  gRank: {
    date: string
    rank: number
  }[]
  groups: string[]
  createdAt: string
}

export interface selectType extends saveType {
  _id: string
}

const rancheckDao = {
  get: async (site: string): Promise<IRancheckEntity[]> => {
    return new Promise(resolve => {
      rancheck.find({ site: site }, (err: Error, docs: selectType[]) => {
        resolve(
          docs.map((doc: selectType) => {
            const {
              _id,
              title,
              site,
              url,
              keyword,
              gRank,
              groups,
              createdAt,
            } = doc
            return new RancheckEntity(
              _id,
              site,
              keyword,
              title,
              url,
              gRank,
              groups,
              createdAt,
            )
          }),
        )
      })
    })
  },

  add: async (docs: IRancheckEntity[]): Promise<IRancheckEntity[]> => {
    const site = docs[0].site

    return new Promise(resolve => {
      rancheck.insert(
        docs.map((doc: IRancheckEntity) => doc.forSave()),
        (error: Error, newDocs: selectType[]) => {
          resolve(
            newDocs
              .filter(doc => doc.site === site)
              .map((doc: selectType) => {
                const {
                  _id,
                  title,
                  site,
                  url,
                  keyword,
                  gRank,
                  groups,
                  createdAt,
                } = doc
                return new RancheckEntity(
                  _id,
                  title,
                  site,
                  keyword,
                  url,
                  gRank,
                  groups,
                  createdAt,
                )
              }),
          )
        },
      )
    })
  },

  update: (doc: IRancheckEntity) => {
    const { _id, title, site, url, keyword, gRank, groups, createdAt } = doc
    rancheck.update(
      { _id },
      { _id, title, site, url, keyword, gRank, groups, createdAt },
      {},
    )
  },

  delete: (id: string) => {
    rancheck.remove({ _id: id }, {})
  },
}

export default rancheckDao
