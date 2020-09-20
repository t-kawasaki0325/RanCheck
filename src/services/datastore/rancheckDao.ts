import { rancheck } from './db'
import { IRancheckEntity, RancheckEntity } from '../../usecase';

export interface saveType {
  title: string
  site: string
  url: string
  keyword: string
  gRank: {
    date: string
    rank: number
  }[]
}

export interface selectType extends saveType {
  _id: string
}

const rancheckDao = {
  get: async (): Promise<IRancheckEntity[]> => {
    return new Promise(resolve => {
      rancheck.find({}, (err: Error, docs: selectType[]) => {
        resolve(docs.map((doc: selectType) => {
          const { _id, title, site, url, keyword, gRank } = doc
          return new RancheckEntity(_id, title, site, keyword, url, gRank)
        }))
      })
    })
  },

  add: async (docs: IRancheckEntity[]): Promise<IRancheckEntity[]> => {
    return new Promise(resolve => {
      rancheck.insert(
        docs.map((doc: IRancheckEntity) => doc.forSave()),
        (error: Error, newDocs: selectType[]) => {
          resolve(newDocs.map((doc: selectType) => {
            const { _id, title, site, url, keyword, gRank } = doc
            return new RancheckEntity(_id, title, site, keyword, url, gRank)
          }))
        })
    })
  },

  update: (doc: IRancheckEntity) => {
    const { _id, title, site, url ,keyword, gRank } = doc
    rancheck.update({ _id }, { _id, title, site, url ,keyword, gRank }, {})
  },

  delete: (id: string) => {
    rancheck.remove({ _id: id }, {})
  }
}

export default rancheckDao