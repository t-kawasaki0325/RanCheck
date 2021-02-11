import { IState } from './store'
import { planValueType, PLAN } from '../config/plan'
import { usersRepository } from '../services'
import { dateUtils } from '../utils'

export const usersGetters = (store: IState['users']) => ({
  hasValidToken: () => {
    const hasToken = store.user.token !== undefined && store.user.token !== ''
    if (!hasToken) {
      return false
    }
    return (
      parseInt(store.user.expiredAt.replace(/\//g, ''), 10) >
      parseInt(dateUtils.getYYYY_MM_DD().replace(/\//g, ''), 10)
    )
  },
  currentPlan: (): planValueType => {
    if (!usersGetters(store).hasValidToken()) {
      return PLAN.FREE
    }
    return (
      Object.values(PLAN).find(v => v.VALUE === store.user.plan) || PLAN.FREE
    )
  },
  isTokenActivationDay: () =>
    store.user.activateAt === dateUtils.getYYYY_MM_DD(),
})

export default {
  get: () => usersRepository.get(),
  saveToken: (token: string) => usersRepository.saveToken(token),
}
