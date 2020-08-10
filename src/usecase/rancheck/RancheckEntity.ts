import IRancheckEntity, { IRank } from './IRancheckEntity'

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

  constructor(_id: string, title: string, site: string, url: string, keyword: string, gRank: IRank[]) {
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
}

export default RancheckEntity