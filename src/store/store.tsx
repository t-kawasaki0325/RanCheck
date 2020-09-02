import React, { useState } from 'react';
import rancheck from './rancheck'
import { IRancheckEntity } from '../usecase/';

type IState = {
  rancheck: {
    selectedSetting: IRancheckEntity
    settings: IRancheckEntity[],
    setRancheck: Function,
    fetchRancheck: Function
  }
}
const initialState: IState = {
  rancheck: {
    selectedSetting: {} as IRancheckEntity,
    settings: [],
    setRancheck: () => {},
    fetchRancheck: async () => {}
  }
}
const actions = {
  setRancheck: 'rancheck/selectedSetting/update',
  fetchRancheck: 'rancheck/settings/fetch'
}

const store = React.createContext(initialState)
const { Provider } = store
const StateProvider = ({ children }: { children: any }) => {
  const [store, setStore] = useState(initialState)

  const value: IState = {
    rancheck: {
      ...store.rancheck,
      setRancheck: (payload: IRancheckEntity) => updateStore(actions.setRancheck, store, setStore, payload),
      fetchRancheck: () => updateStore(actions.fetchRancheck, store, setStore)
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