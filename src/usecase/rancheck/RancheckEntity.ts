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