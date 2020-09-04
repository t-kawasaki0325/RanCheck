interface IRancheckEntity {
  _id: string
  title: string
  site: string
  url: string
  keyword: string
  gRank: IRank[]
  addRank: Function
  forSave: Function
}

export interface IRank {
  date: string
  rank: number
}

export default IRancheckEntity