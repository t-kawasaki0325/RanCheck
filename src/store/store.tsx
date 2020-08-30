import React, { useState } from 'react';
import rancheck from './rancheck'
import { IRancheckEntity } from '../usecase/';

type IState = {
  rancheck: {
    settings: IRancheckEntity[],
    fetchRancheck: Function
  }
}
const initialState: IState = {
  rancheck: {
    settings: [],
    fetchRancheck: async () => {}
  }
}
const actions = {
  fetchRancheck: 'rancheck/settings/fetch'
}

const store = React.createContext(initialState)
const { Provider } = store
const StateProvider = ({ children }: { children: any }) => {
  const [store, setStore] = useState(initialState)

  const value: IState = {
    rancheck: {
      ...store.rancheck,
      fetchRancheck: () => updateStore(actions.fetchRancheck, store, setStore)
    }
  }
  return <Provider value={{ ...value }}>{children}</Provider>
}

const updateStore = async (action: string, store: IState, setStore: Function) => {
  let value = null
  switch (action) {
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