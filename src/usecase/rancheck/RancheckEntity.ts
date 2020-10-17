import IRancheckEntity, { IRank } from './IRancheckEntity'
import { dateUtils } from '../../utils'

class RancheckEntity implements IRancheckEntity {

  /**
   * id
   */
  __id: string

  /**
   * サイトタイトル
   */
  _title: string

  /**
   * サイトurl
   */
  _site: string

  /**
   * 検索結果のurl
   */
  _url: string

  /**
   * 検索のキーワード
   */
  _keyword: string

  /**
   * googleのランク結果
   */
  _gRank: IRank[]

  /**
   * 所属グループ
   */
  _groups: string[]

  /**
   * 作成日
   */
  _createdAt: string

  constructor(
    _id: string,
    site: string,
    keyword: string,
    title: string = '',
    url: string = '',
    gRank: IRank[] = [],
    groups: string[] = [],
    createdAt: string = ''
  ) {
    this.__id = _id
    this._title = title
    this._site = site
    this._url = url
    this._keyword = keyword
    this._gRank = gRank
    this._groups = groups
    this._createdAt = createdAt || dateUtils.getYYYY_MM_DD()
  }

  get _id() {
    return this.__id
  }

  get title() {
    return this._title
  }

  get site() {
    return this._site
  }

  get url() {
    return this._url
  }

  get keyword() {
    return this._keyword
  }

  get gRank() {
    return this._gRank
  }

  get groups() {
    return this._groups
  }

  get createdAt() {
    return this._createdAt
  }

  public equals(rancheck: IRancheckEntity): boolean {
    return this._id === rancheck._id
  }

  public wordIncludes(word: string): boolean {
    return !!this.keyword.match(word)
  }

  public matchKeywordNumber(number: number): boolean {
    return this.keyword.split(' ').length === number
  }

  public addRank(title: string, url: string, rank: number) {
    this._title = title
    this._url = url
    this._gRank.push({
      date: dateUtils.getYYYY_MM_DD(),
      rank
    })
  }

  latestRank(): number {
    const length = this._gRank.length
    return length > 0 ? this._gRank[length - 1].rank : 0
  }

  path(): string {
    const params = this.url.match(/^https?:\/{2,}.*?(\/.*)/)
    return params ? params[1] : ''
  }

  lastSearch(): string {
    const length = this._gRank.length
    return length > 0 ? `${this._gRank[length - 1].date}` : ''
  }

  public rankTransition(): number {
    const length = this._gRank.length
    return length > 1
      ? this._gRank[length - 1].rank - this._gRank[length - 2].rank
      : 0
  }

  public isRankUp(): boolean {
    const length = this._gRank.length
    return length > 1
      ? this.rankTransition() < 0
      : false
  }

  public isRankDown(): boolean {
    const length = this._gRank.length
    return length > 1
      ? this.rankTransition() > 0
      : false
  }

  public rankTransitionByWeek(): string {
    const aWeekAgo = dateUtils.aWeekAgo()
    const target = this._gRank.find(rank => rank.date === aWeekAgo)
    return target ? `${Number(this.latestRank()) - target.rank}` : '-'
  }

  public rankTransitionByMonth() {
    const aMonthAgo = dateUtils.aMonthAgo()
    const target = this._gRank.find(rank => rank.date === aMonthAgo)
    return target ? `${Number(this.latestRank()) - target.rank}` : '-'
  }

  public rankTransitionByThreeMonth() {
    const threeMonthAgo = dateUtils.threeMonthAgo()
    const target = this._gRank.find(rank => rank.date === threeMonthAgo)
    return target ? `${Number(this.latestRank()) - target.rank}` : '-'
  }

  public rankTransitionBySixMonth() {
    const sixMonthAgo = dateUtils.sixMonthAgo()
    const target = this._gRank.find(rank => rank.date === sixMonthAgo)
    return target ? `${Number(this.latestRank()) - target.rank}` : '-'
  }

  public forSave() {
    return {
      title: this._title,
      site: this._site,
      url: this._url,
      keyword: this._keyword,
      gRank: this._gRank,
      groups: this._groups,
      createdAt: this._createdAt
    }
  }
}

export default RancheckEntity