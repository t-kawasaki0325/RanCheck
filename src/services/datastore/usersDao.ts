import { users } from './db'
import { PLAN } from '../../config/plan'
import { UsersEntity, IUsersEntity } from '../../usecase'

export interface selectType {
  _id: string
  token: string
  plan: number
  expiredAt: string
}

const usersDao = {
  get: async (): Promise<IUsersEntity> => {
    return new Promise(resolve => {
      users.find({}, (err: Error, docs: selectType[]) => {
        const doc = docs.pop()
        const { _id, token, plan, expiredAt } = doc || {
          _id: '',
          token: '',
          plan: PLAN.FREE.VALUE,
          expiredAt: '',
        }
        resolve(new UsersEntity(_id, token, plan, expiredAt))
      })
    })
  },

  saveToken: async (
    token: string,
    plan: number,
    expiredAt: string,
  ): Promise<selectType> => {
    return new Promise(resolve => {
      users.insert(
        { token, plan, expiredAt },
        (error: Error, newDoc: selectType) => {
          resolve(
            new UsersEntity(
              newDoc._id,
              newDoc.token,
              newDoc.plan,
              newDoc.expiredAt,
            ),
          )
        },
      )
    })
  },
}

export default usersDao
