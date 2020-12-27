import { usersDao } from '../datastore'
import { IUsersEntity } from '../../usecase'

const usersRepositoy = {
  get: async (): Promise<IUsersEntity> => {
    return await usersDao.get()
  },

  saveToken: async (token: string): Promise<IUsersEntity> => {
    return await usersDao.saveToken(token)
  }
}

export default usersRepositoy