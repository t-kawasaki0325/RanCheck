import { usersRepository } from '../services'

export default {
  saveToken: (token: string) => usersRepository.saveToken(token)
}