import { users } from './db';

const usersDao = {
  saveToken: async (token: string): Promise<string> => {
    return new Promise(resolve => {
      users.insert(
        { token },
        (error: Error, newDoc: any) => {
          resolve(newDoc.token)
        },
      )
    })
  }
}

export default usersDao
