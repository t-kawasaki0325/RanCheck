import { usersDao } from '../datastore'
import { rancheckDao } from '../httpRequest'
import { IUsersEntity } from '../../usecase'

const usersRepositoy = {
  get: async (): Promise<IUsersEntity> => {
    return usersDao.get()
  },

  saveToken: async (token: string): Promise<IUsersEntity> => {
    const { plan, expiredAt } = await rancheckDao.fetchPlan(token)
    return usersDao.saveToken(token, plan, expiredAt)
  },
}

export default usersRepositoy
