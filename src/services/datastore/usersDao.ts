import { users } from './db'
import { PLAN } from '../../config/plan'
import { dateUtils } from '../../utils'
import { UsersEntity, IUsersEntity } from '../../usecase'

export interface selectType {
  _id: string
  token: string
  plan: number
  activateAt: string
  expiredAt: string
}

const usersDao = {
  get: async (): Promise<IUsersEntity> => {
    return new Promise(resolve => {
      users.find({}, (err: Error, docs: selectType[]) => {
        const doc = docs.pop()
        const { _id, token, plan, activateAt, expiredAt } = doc || {
          _id: '',
          token: '',
          plan: PLAN.FREE.VALUE,
          activateAt: '',
          expiredAt: '',
        }
        resolve(new UsersEntity(_id, token, plan, activateAt, expiredAt))
      })
    })
  },

  saveToken: async (
    token: string,
    plan: number,
    expiredAt: string,
  ): Promise<selectType> => {
    const activateAt = dateUtils.getYYYY_MM_DD()
    return new Promise(resolve => {
      users.insert(
        { token, plan, activateAt, expiredAt },
        (error: Error, newDoc: selectType) => {
          resolve(
            new UsersEntity(
              newDoc._id,
              newDoc.token,
              newDoc.plan,
              newDoc.activateAt,
              newDoc.expiredAt,
            ),
          )
        },
      )
    })
  },
}

export default usersDao
