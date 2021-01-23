import { IState } from './store'
import { planValueType, PLAN } from '../config/plan'
import { usersRepository } from '../services'

export const usersGetters = (store: IState['users']) => ({
  hasToken: () => store.user.token !== '',
  currentPlan: (): planValueType => Object.values(PLAN).find(v => v.VALUE === store.user.plan) || PLAN.FREE
})

export default {
  get: () => usersRepository.get(),
  saveToken: (token: string) => usersRepository.saveToken(token)
}