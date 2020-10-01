import React, { useState } from 'react';
import rancheck, { rancheckGetters } from './rancheck'
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
    selectedProject: IProjectsEntity,
    projects: IProjectsEntity[]
    initProject: Function
    fetchProjects: Function
  },
  modal: {
    initialSettingModal: boolean
    addSettingModal: boolean
    openInitialSettingModal: Function
    closeInitialSettingModal: Function
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
    selectedProject: {} as IProjectsEntity,
    projects: [],
    initProject: () => {},
    fetchProjects: () => {}
  },
  modal: {
    initialSettingModal: false,
    addSettingModal: false,
    openInitialSettingModal: () => {},
    closeInitialSettingModal: () => {},
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
  addProject: 'projects/projects/add',
  setProject: 'projects/selectedProject/update',
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
      addRancheck: (payload: addRancheckType) => updateMultipleStore(
        [actions.addRancheck, actions.setAddSettingModal],
        store,
        setStore,
        payload
      ),
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
      initProject: (payload: addRancheckType) => updateMultipleStore(
        [actions.addProject, actions.addRancheck, actions.setProject, actions.setInitialSettingModal],
        store,
        setStore,
        payload
      ),
      fetchProjects: () => updateMultipleStore(
        [actions.fetchProjects, actions.setProject, actions.setInitialSettingModal],
        store,
        setStore
      )
    },
    modal: {
      ...store.modal,
      openInitialSettingModal: () => updateStore(actions.setInitialSettingModal, store, setStore, true),
      closeInitialSettingModal: () => updateStore(actions.setInitialSettingModal, store, setStore, false),
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
      value[index] = await rancheck.googleSearch(setting, store.projects.selectedProject.site)
      break
    // projects
    case actions.addProject:
      value = [await projects.addProject(payload)]
      break
    // modal
    case actions.setAddSettingModal:
    case actions.setInitialSettingModal:
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
  payload: any = null
) => {
  let value: any = []
  switch (actionList.toString()) {
    case [actions.addRancheck, actions.setAddSettingModal].toString():
      const setting = await rancheck.addRancheck(payload)
      value = [[...store.rancheck.settings, ...setting], false]
      break
    case [actions.fetchProjects, actions.setProject, actions.setInitialSettingModal].toString():
      const result = await projects.fetchProjects()
      value = [result, result[0], !result.length]
      break
    case [actions.addProject, actions.addRancheck, actions.setProject, actions.setInitialSettingModal].toString():
      const [project, settings] = await Promise.all([
        projects.addProject({ site: payload.site }),
        rancheck.addRancheck(payload)
      ])
      value = [project, settings, project[0], false]
      break
  }

  const keys = actionList.map(action => {
    const [key, updateKey] = action.split('/')
    return [key, updateKey]
  })
  const updateValue = {}
  keys.forEach(([key, updateKey], index) => {
    const baseObj = key in updateValue ? updateValue : store;
    (updateValue as any)[key] = {
      ...(baseObj as any)[key],
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
  rancheckGetters,
  projectsGetters
}