interface IRancheckEntity {
  _id: string
  title: string
  site: string
  url: string
  keyword: string
  gRank: IRank[]
  groups: string[]
  createdAt: string
  equals: Function
  wordIncludes: Function
  matchKeywordNumber: Function
  addRank: Function
  latestRank: Function
  maxRank: Function
  path: Function
  lastSearch: Function
  rankTransition: Function
  isRankUp: Function
  isRankDown: Function
  rankTransitionByWeek: Function
  rankTransitionByMonth: Function
  rankTransitionByThreeMonth: Function
  rankTransitionBySixMonth: Function
  forSave: Function
}

export interface IRank {
  date: string
  rank: number
}

export default IRancheckEntity
