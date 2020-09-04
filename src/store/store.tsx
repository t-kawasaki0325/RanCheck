import React, { useState } from 'react';
import rancheck from './rancheck'
import { IRancheckEntity } from '../usecase/';

type IState = {
  rancheck: {
    selectedSetting: IRancheckEntity
    settings: IRancheckEntity[],
    setRancheck: Function,
    fetchRancheck: Function,
    googleSearch: Function
  }
}
const initialState: IState = {
  rancheck: {
    selectedSetting: {} as IRancheckEntity,
    settings: [],
    setRancheck: () => {},
    fetchRancheck: async () => {},
    googleSearch: async () => {}
  }
}
const actions = {
  // rancheck
  setRancheck: 'rancheck/selectedSetting/update',
  fetchRancheck: 'rancheck/settings/fetch',
  googleSearch: 'rancheck/settings/googleSearch'
}

const store = React.createContext(initialState)
const { Provider } = store
const StateProvider = ({ children }: { children: any }) => {
  const [store, setStore] = useState(initialState)

  const value: IState = {
    rancheck: {
      ...store.rancheck,
      setRancheck: (payload: IRancheckEntity) => updateStore(actions.setRancheck, store, setStore, payload),
      fetchRancheck: () => updateStore(actions.fetchRancheck, store, setStore),
      googleSearch: async () => {
        for (const [index, setting] of store.rancheck.settings.entries()) {
          await updateStore(actions.googleSearch, store, setStore, { setting, index })
        }
      }
    }
  }
  return <Provider value={{ ...value }}>{children}</Provider>
}

const updateStore = async (
  action: string,
  store: IState,
  setStore: Function,
  payload: any = null
) => {
  let value = null
  switch (action) {
    case actions.setRancheck:
      value = rancheck.setRancheck(payload)
      break
    case actions.fetchRancheck:
      value = await rancheck.fetchRancheck()
      break
    case actions.googleSearch:
      const { setting, index } = payload
      value = [...store.rancheck.settings]
      // TODO: siteをDBからデータ取得するように
      value[index] = await rancheck.googleSearch(setting, 'memorandumrail.com')
      break
  }

  const [key, updateKey] = action.split('/')
  setStore({
    ...store,
    [key]: {
      ...(store as any)[key],
      [updateKey]: value
    }
  })
}

export { store, StateProvider }