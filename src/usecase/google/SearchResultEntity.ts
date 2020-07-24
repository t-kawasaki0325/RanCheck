class SearchResultEntity {

  /**
   * 順位
   */
  private rank: number

  /**
   * url
   */
  private url: string

  constructor(rank: number, url: string) {
    this.rank = rank
    this.url = url
  }
}

export default SearchResultEntity