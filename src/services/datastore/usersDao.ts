import { users } from './db'
import { PLAN, DEFAULT_TOKEN } from '../../config/plan'
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
          token: DEFAULT_TOKEN,
          plan: PLAN.FREE.VALUE,
          activateAt: dateUtils.getYYYY_MM_DD(),
          expiredAt: dateUtils.getIndefinitePeriod(),
        }
        resolve(new UsersEntity(_id, token, plan, activateAt, expiredAt))
      })
    })
  },

  saveToken: async (
    userId: string,
    token: string,
    plan: number,
    expiredAt: string,
  ): Promise<selectType> => {
    const activateAt = dateUtils.getYYYY_MM_DD()

    return new Promise(resolve => {
      users.update(
        { _id: userId },
        { token, plan, activateAt, expiredAt },
        { upsert: true },
        (error: Error, replaceNum: number, newDoc: selectType | undefined) => {
          if (newDoc !== undefined) {
            resolve(
              new UsersEntity(
                newDoc._id,
                newDoc.token,
                newDoc.plan,
                newDoc.activateAt,
                newDoc.expiredAt,
              ),
            )
          } else {
            resolve(new UsersEntity(userId, token, plan, activateAt, expiredAt))
          }
        },
      )
    })
  },
}

export default usersDao
