import { users } from './db';
import { UsersEntity, IUsersEntity } from '../../usecase'

export interface selectType {
  _id: string
  token: string
}

const usersDao = {
  get: async (): Promise<IUsersEntity> => {
    return new Promise(resolve => {
      users.find({}, (err: Error, docs: selectType[]) => {
        const doc = docs.pop()
        const { _id, token } = doc || { _id: '', token: '' }
        resolve(new UsersEntity(_id, token))
      })
    })
  },

  saveToken: async (token: string): Promise<selectType> => {
    return new Promise(resolve => {
      users.insert(
        { token },
        (error: Error, newDoc: selectType) => {
          const { _id, token } = newDoc
          resolve(new UsersEntity(_id, token))
        },
      )
    })
  }
}

export default usersDao
