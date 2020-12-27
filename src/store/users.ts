import { usersRepository } from '../services'

export default {
  get: () => usersRepository.get(),
  saveToken: (token: string) => usersRepository.saveToken(token)
}