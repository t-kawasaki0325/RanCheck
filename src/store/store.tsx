import React, { useState } from 'react';
import rancheck from './rancheck'
import projects, { projectsGetters } from './projects'
import { modalGetters } from './modal'
import { IRancheckEntity, IProjectsEntity } from '../usecase/';
import { addRancheckType } from '../services/repository/rancheckRepository';

export type IState = {
  rancheck: {
    selectedSetting: IRancheckEntity
    settings: IRancheckEntity[]
    addRancheck: Function
    setRancheck: Function
    deleteRancheck: Function,
    fetchRancheck: Function
    googleSearch: Function
  },
  projects: {
    projects: IProjectsEntity[]
    fetchProjects: Function
  },
  modal: {
    initialSettingModal: boolean
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
    deleteRancheck: () => {},
    fetchRancheck: async () => {},
    googleSearch: async () => {}
  },
  projects: {
    projects: [],
    fetchProjects: () => {}
  },
  modal: {
    initialSettingModal: false,
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
  deleteRancheck: 'rancheck/settings/delete',
  fetchRancheck: 'rancheck/settings/fetch',
  googleSearch: 'rancheck/settings/googleSearch',
  // projects
  fetchProjects: 'projects/projects/',
  // modal
  setInitialSettingModal: 'modal/initialSettingModal/',
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
      deleteRancheck: () => {
        const { _id } = store.rancheck.selectedSetting
        updateStore(actions.deleteRancheck, store, setStore, _id)
      },
      fetchRancheck: () => updateStore(actions.fetchRancheck, store, setStore),
      googleSearch: async () => {
        for (const [index, setting] of store.rancheck.settings.entries()) {
          await updateStore(actions.googleSearch, store, setStore, { setting, index })
        }
      }
    },
    projects: {
      ...store.projects,
      fetchProjects: () => updateMultipleStore(
        [actions.fetchProjects, actions.setInitialSettingModal],
        store,
        setStore
      )
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
  let value: any = null
  switch (action) {
    // rancheck
    case actions.addRancheck:
      value = rancheck.addRancheck(payload)
      break
    case actions.setRancheck:
      value = rancheck.setRancheck(payload)
      break
    case actions.deleteRancheck:
      rancheck.deleteRancheck(payload)
      value = store.rancheck.settings.filter(setting => setting._id !== payload)
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

const updateMultipleStore = async (
  actionList: string[],
  store: IState,
  setStore: Function,
) => {
  let value: any = []
  switch (actionList.toString()) {
    case [actions.fetchProjects, actions.setInitialSettingModal].toString():
      const result = await projects.fetchProjects()
      value = [result, !result.length]
      break
  }

  const keys = actionList.map(action => {
    const [key, updateKey] = action.split('/')
    return [key, updateKey]
  })
  const updateValue = {}
  keys.forEach(([key, updateKey], index) => {
    (updateValue as any)[key] = {
      ...(store as any)[key],
      [updateKey]: value[index]
    }
  })

  setStore({
    ...store,
    ...updateValue
  })
}

export {
  store,
  StateProvider,
  modalGetters,
  projectsGetters
}