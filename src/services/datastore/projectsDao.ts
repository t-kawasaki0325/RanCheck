import { ProjectsEntity, IProjectsEntity } from '../../usecase'
import { projects } from './db'

export interface saveType {
  site: string
  lastSearch: string
  groups: {
    id: string
    name: string
  }[]
}

export interface selectType extends saveType {
  _id: string
}

const projectsDao = {
  get: async (): Promise<IProjectsEntity[]> => {
    return new Promise(resolve => {
      projects.find({}, (err: Error, docs: selectType[]) => {
        resolve(
          docs.map((doc: selectType) => {
            const { _id, site, groups, lastSearch } = doc
            return new ProjectsEntity(_id, site, lastSearch, groups)
          }),
        )
      })
    })
  },

  add: async (doc: IProjectsEntity): Promise<IProjectsEntity> => {
    const { site, groups, lastSearch } = doc
    return new Promise(resolve => {
      projects.insert(
        { site, groups, lastSearch },
        (error: Error, newDoc: selectType) => {
          resolve(
            new ProjectsEntity(
              newDoc._id,
              newDoc.site,
              newDoc.lastSearch,
              newDoc.groups,
            ),
          )
        },
      )
    })
  },
}

export default projectsDao
