import { usersDao } from '../datastore'

const usersRepositoy = {
  saveToken: async (token: string): Promise<string> => {
    return await usersDao.saveToken(token)
  }
}

export default usersRepositoy