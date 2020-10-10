import IProjectsEntity, { IGroup } from './IProjectsEntity'

class ProjectsEntity implements IProjectsEntity {
  /**
   * id
   */
  __id: string

  /**
   * サイトドメイン
   */
  _site: string

  /**
   * 登録グループ
   */
  _groups: IGroup[]

  /**
   * 最終一括検索日
   */
  _lastSearch: string

  constructor(
    _id: string,
    site: string,
    lastSearch: string,
    groups: IGroup[] = []
  ) {
    this.__id = _id
    this._site = site
    this._lastSearch = lastSearch
    this._groups = groups
  }

  get _id() {
    return this.__id
  }

  get site() {
    return this._site
  }

  get groups() {
    return this._groups
  }

  get lastSearch() {
    return this._lastSearch
  }

  public equals(project: IProjectsEntity) {
    return this._id === project._id
  }
}
export default ProjectsEntity