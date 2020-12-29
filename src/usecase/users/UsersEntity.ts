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

  constructor(_id: string, token: string) {
    this.__id = _id
    this._token = token
  }

  get _id() {
    return this.__id
  }

  get token() {
    return this._token
  }
}

export default UsersEntity