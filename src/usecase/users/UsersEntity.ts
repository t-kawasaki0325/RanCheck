import IUsersEntity from './IUsersEntity'

class UsersEntity implements IUsersEntity {
  /**
   * id
   */
  __id: string

  /**
   * token
   */
  _token: string

  /**
   * 契約プラン
   */
  _plan: number

  /**
   * トークン有効化日
   */
  _activateAt: string

  /**
   * 契約期限日：契約が切れるとFREEプランへ移行
   */
  _expiredAt: string

  constructor(
    _id: string,
    token: string,
    plan: number,
    activateAt: string,
    expiredAt: string,
  ) {
    this.__id = _id
    this._token = token
    this._plan = plan
    this._activateAt = activateAt
    this._expiredAt = expiredAt
  }

  get _id() {
    return this.__id
  }

  get token() {
    return this._token
  }

  get plan() {
    return this._plan
  }

  get activateAt() {
    return this._activateAt
  }

  get expiredAt() {
    return this._expiredAt
  }
}

export default UsersEntity
