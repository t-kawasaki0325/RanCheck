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

  constructor(
    _id: string,
    title: string,
    site: string,
    keyword: string,
    url: string = '',
    gRank: IRank[] = []
  ) {
    this.__id = _id
    this._title = title
    this._site = site
    this._url = url
    this._keyword = keyword
    this._gRank = gRank
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

  public addRank(rank: number) {
    this._gRank.push({
      date: dateUtils.getYYYY_MM_DD(),
      rank
    })
  }

  latestRank(): string {
    const length = this._gRank.length
    return length > 0 ? `${this._gRank[length - 1].rank}` : '-'
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
      gRank: this._gRank
    }
  }
}

export default RancheckEntity