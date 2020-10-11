import React, { useState } from 'react';
import rancheck, { rancheckGetters } from './rancheck'
import projects, { projectsGetters } from './projects'
import { modalGetters } from './modal'
import { IRancheckEntity, IProjectsEntity } from '../usecase/';
import { addRancheckType } from '../services/repository/rancheckRepository';
import { dateUtils, validationUtils } from '../utils'

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
    switchProjects: Function
  },
  modal: {
    initialSettingModal: boolean
    addSettingModal: boolean
    openInitialSettingModal: Function
    closeInitialSettingModal: Function
    openAddSettingModal: Function
    closeAddSettingModal: Function
  },
  searchStatus: {
    isSearching: boolean
    count: number
    totalNum: number
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
    fetchProjects: () => {},
    switchProjects: () => {}
  },
  modal: {
    initialSettingModal: false,
    addSettingModal: false,
    openInitialSettingModal: () => {},
    closeInitialSettingModal: () => {},
    openAddSettingModal: () => {},
    closeAddSettingModal: () => {}
  },
  searchStatus: {
    isSearching: false,
    count: 0,
    totalNum: 0
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
  // searchStatus
  setIsSearching: 'searchStatus/isSearching',
  setCount: 'searchStatus/count',
  setTotalNum: 'searchStatus/totalNum',
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
        const searchTarget = store.rancheck.settings.filter(
          setting => setting.lastSearch() !== dateUtils.getYYYY_MM_DD()
        )
        if (store.searchStatus.isSearching) {
          validationUtils.search('SEARCHING')
          return
        }
        if (searchTarget.length === 0) {
          validationUtils.search('ALL_SEARCHED')
          return
        }

        for (const [index, setting] of searchTarget.entries()) {
          await updateMultipleStore(
            [actions.googleSearch, actions.setIsSearching, actions.setCount, actions.setTotalNum],
            store,
            setStore,
            { setting, index, isSearching: searchTarget.length > index + 1, totalNum: searchTarget.length }
          )
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
      ),
      switchProjects: (payload: string) => updateMultipleStore(
        [actions.setProject, actions.fetchRancheck],
        store,
        setStore,
        payload
      )
    },
    modal: {
      ...store.modal,
      openInitialSettingModal: () => {
        store.searchStatus.isSearching
          ? validationUtils.search('SEARCHING')
          : updateStore(actions.setInitialSettingModal, store, setStore, true)
      },
      closeInitialSettingModal: () => updateStore(actions.setInitialSettingModal, store, setStore, false),
      openAddSettingModal: () => {
        store.searchStatus.isSearching
          ? validationUtils.search('SEARCHING')
          : updateStore(actions.setAddSettingModal, store, setStore, true)
      },
      closeAddSettingModal: () => updateStore(actions.setAddSettingModal, store, setStore, false)
    },
    searchStatus: {
      ...store.searchStatus,
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
      const project = store.projects.selectedProject
      value = await rancheck.fetchRancheck(project.site)
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
      const addedSetting = await rancheck.addRancheck(payload)
      value = [[...store.rancheck.settings, ...addedSetting], false]
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
      value = [[...store.projects.projects, ...project], settings, project[0], false]
      break
    case [actions.setProject, actions.fetchRancheck].toString():
      const changeProject = store.projects.projects.find(project => project._id === payload)
      const changedSettings = await rancheck.fetchRancheck(changeProject!.site)
      value = [changeProject, changedSettings]
      break
    case [actions.googleSearch, actions.setIsSearching, actions.setCount, actions.setTotalNum].toString():
      const { setting, index, isSearching, totalNum } = payload
      const copiedSettings = [...store.rancheck.settings]
      const settingIndex = copiedSettings.findIndex((v: IRancheckEntity) => v.equals(setting))
      copiedSettings[settingIndex] = await rancheck.googleSearch(setting, store.projects.selectedProject.site)
      // indexは現在検索している次の検索数を表すので+2とする
      value = [copiedSettings, isSearching, index + 2, totalNum]
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