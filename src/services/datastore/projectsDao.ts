import { ProjectsEntity, IProjectsEntity } from '../../usecase';
import { projects } from './db';

const projectsDao = {
  get: async (): Promise<IProjectsEntity[]> => {
    return new Promise(resolve => {
      projects.find({}, (err: any, docs: any) => {
        resolve(docs.map((doc: any) => {
          const { _id, site, groups, lastSearch } = doc
          return new ProjectsEntity(_id, site, lastSearch, groups)
        }))
      })
    })
  }
}

export default projectsDao