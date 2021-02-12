import { IState } from './store'
import { planValueType, PLAN, DEFAULT_TOKEN } from '../config/plan'
import { usersRepository } from '../services'
import { dateUtils } from '../utils'

export const usersGetters = (store: IState['users']) => ({
  hasPaidToken: () => {
    const hasToken = store.user.token !== undefined && store.user.token !== ''
    if (!hasToken) {
      return false
    }
    if (store.user.token === DEFAULT_TOKEN) {
      return false
    }
    return (
      parseInt(store.user.expiredAt.replace(/\//g, ''), 10) >
      parseInt(dateUtils.getYYYY_MM_DD().replace(/\//g, ''), 10)
    )
  },
  currentPlan: (): planValueType => {
    if (!usersGetters(store).hasPaidToken()) {
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
  saveToken: (userId: string, token: string) =>
    usersRepository.saveToken(userId, token),
}
