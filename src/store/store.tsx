import React, { useState } from 'react'
import rancheck, { rancheckGetters } from './rancheck'
import projects, { projectsGetters } from './projects'
import users, { usersGetters } from './users'
import { modalGetters } from './modal'
import { IRancheckEntity, IProjectsEntity, IUsersEntity } from '../usecase/'
import { addRancheckType } from '../services/repository/rancheckRepository'
import { dateUtils, validationUtils } from '../utils'
import { MESSAGE } from '../config/message'

export type IState = {
  rancheck: {
    selectedSetting: IRancheckEntity
    settings: IRancheckEntity[]
    addRancheck: Function
    setRancheck: Function
    deleteRancheck: Function
    fetchRancheck: Function
    googleSearch: Function
  }
  projects: {
    selectedProject: IProjectsEntity
    projects: IProjectsEntity[]
    initProject: Function
    fetchProjects: Function
    switchProjects: Function
  }
  users: {
    user: IUsersEntity
    addToken: Function
  }
  modal: {
    initialSettingModal: boolean
    addSettingModal: boolean
    addTokenModal: boolean
    openInitialSettingModal: Function
    closeInitialSettingModal: Function
    openAddSettingModal: Function
    closeAddSettingModal: Function
    openAddTokenModal: Function
    closeAddTokenModal: Function
  }
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
    googleSearch: async () => {},
  },
  projects: {
    selectedProject: {} as IProjectsEntity,
    projects: [],
    initProject: () => {},
    fetchProjects: () => {},
    switchProjects: () => {},
  },
  users: {
    user: {} as IUsersEntity,
    addToken: () => {}
  },
  modal: {
    initialSettingModal: false,
    addSettingModal: false,
    addTokenModal: false,
    openInitialSettingModal: () => {},
    closeInitialSettingModal: () => {},
    openAddSettingModal: () => {},
    closeAddSettingModal: () => {},
    openAddTokenModal: () => {},
    closeAddTokenModal: () => {}
  },
  searchStatus: {
    isSearching: false,
    count: 0,
    totalNum: 0,
  },
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
  // users
  fetchUser: 'users/user',
  addToken: 'users/user/add',
  // modal
  setInitialSettingModal: 'modal/initialSettingModal/',
  setAddSettingModal: 'modal/addSettingModal/',
  setAddTokenModal: 'modal/addTokenModal/',
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
      addRancheck: (payload: addRancheckType) =>
        updateMultipleStore(
          [actions.addRancheck, actions.setAddSettingModal],
          store,
          setStore,
          payload,
        ),
      setRancheck: (payload: IRancheckEntity) =>
        updateStore(actions.setRancheck, store, setStore, payload),
      deleteRancheck: () => {
        const { _id, site, keyword } = store.rancheck.selectedSetting
        updateStore(actions.deleteRancheck, store, setStore, {  _id, site, keyword })
      },
      fetchRancheck: () =>
        updateMultipleStore(
          [actions.fetchRancheck, actions.setRancheck],
          store,
          setStore,
        ),
      googleSearch: async () => {
        const searchTarget = store.rancheck.settings.filter(
          setting => setting.lastSearch() !== dateUtils.getYYYY_MM_DD(),
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
          const isError = await updateMultipleStore(
            [
              actions.googleSearch,
              actions.setIsSearching,
              actions.setCount,
              actions.setTotalNum,
            ],
            store,
            setStore,
            {
              setting,
              index,
              isSearching: searchTarget.length > index + 1,
              totalNum: searchTarget.length,
            },
          ).catch(() => {
            return true
          })
          if (isError) {
            updateStore(actions.setIsSearching, store, setStore, false)
            alert(MESSAGE.SEARCH_ERROR)
            break
          }
        }
      },
    },
    projects: {
      ...store.projects,
      initProject: (payload: addRancheckType) =>
        updateMultipleStore(
          [
            actions.addProject,
            actions.addRancheck,
            actions.setProject,
            actions.setInitialSettingModal,
          ],
          store,
          setStore,
          payload,
        ),
      fetchProjects: () =>
        updateMultipleStore(
          [
            actions.fetchProjects,
            actions.fetchUser,
            actions.setProject,
            actions.setInitialSettingModal,
          ],
          store,
          setStore,
        ),
      switchProjects: (payload: string) =>
        updateMultipleStore(
          [actions.setProject, actions.fetchRancheck, actions.setRancheck],
          store,
          setStore,
          payload,
        ),
    },
    users: {
      ...store.users,
      addToken: (payload: string) =>
        updateMultipleStore([actions.addToken, actions.setAddTokenModal], store, setStore, payload)
    },
    modal: {
      ...store.modal,
      openInitialSettingModal: () => {
        store.searchStatus.isSearching
          ? validationUtils.search('SEARCHING')
          : updateStore(actions.setInitialSettingModal, store, setStore, true)
      },
      closeInitialSettingModal: () =>
        updateStore(actions.setInitialSettingModal, store, setStore, false),
      openAddSettingModal: () => {
        store.searchStatus.isSearching
          ? validationUtils.search('SEARCHING')
          : updateStore(actions.setAddSettingModal, store, setStore, true)
      },
      closeAddSettingModal: () =>
        updateStore(actions.setAddSettingModal, store, setStore, false),
      openAddTokenModal: () =>
        updateStore(actions.setAddTokenModal, store, setStore, true),
      closeAddTokenModal: () =>
        updateStore(actions.setAddTokenModal, store, setStore, false)
    },
    searchStatus: {
      ...store.searchStatus,
    },
  }
  return <Provider value={{ ...value }}>{children}</Provider>
}

const updateStore = async (
  action: string,
  store: IState,
  setStore: Function,
  payload: any = null,
) => {
  const token = store.users.user.token
  const hasToken = usersGetters(store.users).hasToken()

  let value: any = null
  switch (action) {
    // rancheck
    case actions.addRancheck:
      value = rancheck.addRancheck({
        token,
          hasToken,
        ...payload
      })
      break
    case actions.setRancheck:
      value = rancheck.setRancheck(payload)
      break
    case actions.deleteRancheck:
      const { _id, site, keyword } = payload
      rancheck.deleteRancheck(_id, site, keyword, token, hasToken)
      value = store.rancheck.settings.filter(setting => setting._id !== _id)
      break
    case actions.googleSearch:
      const { setting, index } = payload
      value = [...store.rancheck.settings]
      value[index] = await rancheck.googleSearch(
        setting,
        store.projects.selectedProject.site,
      )
      break
    // projects
    case actions.addProject:
      value = [await projects.addProject(payload)]
      break
    // modal
    case actions.setAddSettingModal:
    case actions.setInitialSettingModal:
    case actions.setAddTokenModal:
      value = payload
      break
    // searchStatus
    case actions.setIsSearching:
      value = payload
      break
  }

  const [key, updateKey] = action.split('/')
  setStore({
    ...store,
    [key]: {
      ...(store as any)[key],
      [updateKey]: value,
    },
  })
}

const updateMultipleStore = async (
  actionList: string[],
  store: IState,
  setStore: Function,
  payload: any = null,
) => {
  const token = store.users.user.token
  const hasToken = usersGetters(store.users).hasToken()

  let value: any = []
  switch (actionList.toString()) {
    case [actions.addRancheck, actions.setAddSettingModal].toString():
      const addedSetting = await rancheck.addRancheck({
        token,
          hasToken,
        ...payload
      })
      value = [[...store.rancheck.settings, ...addedSetting], false]
      break
    case [
      actions.fetchProjects,
      actions.fetchUser,
      actions.setProject,
      actions.setInitialSettingModal,
    ].toString():
      const [projectList, user] = await Promise.all([
        projects.fetchProjects(),
        users.get()
      ])
      value = [projectList, user, projectList[0], !projectList.length]
      break
    case [
      actions.addProject,
      actions.addRancheck,
      actions.setProject,
      actions.setInitialSettingModal,
    ].toString():
      const [project, settings] = await Promise.all([
        projects.addProject({ site: payload.site }),
        rancheck.addRancheck({
          token,
          hasToken,
          ...payload
        }),
      ])
      value = [
        [...store.projects.projects, ...project],
        settings,
        project[0],
        false,
      ]
      break
    case [actions.fetchRancheck, actions.setRancheck].toString():
      const selectedProject = store.projects.selectedProject
      const rancheckSettings = await rancheck.fetchRancheck(
        selectedProject.site,
      )
      value = [rancheckSettings, rancheckSettings[0]]
      break
    case [
      actions.setProject,
      actions.fetchRancheck,
      actions.setRancheck,
    ].toString():
      const changeProject = store.projects.projects.find(
        project => project._id === payload,
      )
      const changedSettings = await rancheck.fetchRancheck(changeProject!.site)
      value = [changeProject, changedSettings, changedSettings[0]]
      break
    case [
      actions.googleSearch,
      actions.setIsSearching,
      actions.setCount,
      actions.setTotalNum,
    ].toString():
      const { setting, index, isSearching, totalNum } = payload
      const copiedSettings = [...store.rancheck.settings]
      const settingIndex = copiedSettings.findIndex((v: IRancheckEntity) =>
        v.equals(setting),
      )
      copiedSettings[settingIndex] = await rancheck.googleSearch(
        setting,
        store.projects.selectedProject.site,
      )
      // indexは現在検索している次の検索数を表すので+2とする
      value = [copiedSettings, isSearching, index + 2, totalNum]
      break
    case [actions.addToken, actions.setAddTokenModal].toString():
      const savedUser = await users.saveToken(payload)
      const allSettings = await rancheck.fetchAllRancheck()
      Promise.all(store.projects.projects.map(project =>
        rancheck.registerRancheck({
          token: savedUser.token,
          site: project.site,
          keywords: allSettings.reduce((prev: string[], current) => {
            return current.site !== project.site ? prev : prev.concat(current.keyword)
          }, [])
        })
      ))
      value = [savedUser, false]
      break
  }

  const keys = actionList.map(action => {
    const [key, updateKey] = action.split('/')
    return [key, updateKey]
  })
  const updateValue = {}
  keys.forEach(([key, updateKey], index) => {
    const baseObj = key in updateValue ? updateValue : store
    ;(updateValue as any)[key] = {
      ...(baseObj as any)[key],
      [updateKey]: value[index],
    }
  })

  setStore({
    ...store,
    ...updateValue,
  })
}

export { store, StateProvider, modalGetters, rancheckGetters, projectsGetters, usersGetters }
