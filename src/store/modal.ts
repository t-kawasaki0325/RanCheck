import { IState } from './store'

export const modalGetters = (store: IState["modal"]) => ({
  allModalClosed: Object.values(store).every(v => typeof v !== 'boolean' || !v)
})
