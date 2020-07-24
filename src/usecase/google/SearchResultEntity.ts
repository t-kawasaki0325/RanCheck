import ISearchResultEntity from './ISearchResultEntity'

class SearchResultEntity implements ISearchResultEntity {

  /**
   * 順位
   */
  private _rank: number

  /**
   * url
   */
  private _url: string

  constructor(rank: number = 0, url: string = '') {
    this._rank = rank
    this._url = url
  }

  get rank(): number {
    return this._rank
  }

  get url(): string {
    return this._url
  }

  get isEmpty(): boolean {
    return this._rank === 0 && this._url === ''
  }
}

export default SearchResultEntity