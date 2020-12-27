import { IState } from './store'
import { usersRepository } from '../services'

export const usersGetters = (store: IState['users']) => ({
  hasToken: () => store.user.token !== ''
})

export default {
  get: () => usersRepository.get(),
  saveToken: (token: string) => usersRepository.saveToken(token)
}