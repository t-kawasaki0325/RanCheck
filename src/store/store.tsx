import React, { useState } from 'react';
import rancheck from './rancheck'
import { modalGetters } from './modal'
import { IRancheckEntity } from '../usecase/';
import { addRancheckType } from '../services/repository/rancheckRepository';

export type IState = {
  rancheck: {
    selectedSetting: IRancheckEntity
    settings: IRancheckEntity[]
    addRancheck: Function
    setRancheck: Function
    fetchRancheck: Function
    googleSearch: Function
  },
  modal: {
    addSettingModal: boolean
    initModalStatus: Function
    openAddSettingModal: Function
    closeAddSettingModal: Function
  }
}
const initialState: IState = {
  rancheck: {
    selectedSetting: {} as IRancheckEntity,
    settings: [],
    addRancheck: () => {},
    setRancheck: () => {},
    fetchRancheck: async () => {},
    googleSearch: async () => {}
  },
  modal: {
    addSettingModal: false,
    initModalStatus: () => {},
    openAddSettingModal: () => {},
    closeAddSettingModal: () => {}
  }
}
const actions = {
  // rancheck
  addRancheck: 'rancheck/settings/add',
  setRancheck: 'rancheck/selectedSetting/update',
  fetchRancheck: 'rancheck/settings/fetch',
  googleSearch: 'rancheck/settings/googleSearch',
  // modal
  setAddSettingModal: 'modal/addSettingModal/',
}

const store = React.createContext(initialState)
const { Provider } = store
const StateProvider = ({ children }: { children: any }) => {
  const [store, setStore] = useState(initialState)

  const value: IState = {
    rancheck: {
      ...store.rancheck,
      addRancheck: (payload: addRancheckType) => updateStore(actions.addRancheck, store, setStore, payload),
      setRancheck: (payload: IRancheckEntity) => updateStore(actions.setRancheck, store, setStore, payload),
      fetchRancheck: () => updateStore(actions.fetchRancheck, store, setStore),
      googleSearch: async () => {
        for (const [index, setting] of store.rancheck.settings.entries()) {
          await updateStore(actions.googleSearch, store, setStore, { setting, index })
        }
      }
    },
    modal: {
      ...store.modal,
      openAddSettingModal: () => updateStore(actions.setAddSettingModal, store, setStore, true),
      closeAddSettingModal: () => updateStore(actions.setAddSettingModal, store, setStore, false)
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
    // rancheck
    case actions.addRancheck:
      value = rancheck.addRancheck(payload)
      break
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
    // modal
    case actions.setAddSettingModal:
      value = payload
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

export {
  store,
  StateProvider,
  modalGetters
}