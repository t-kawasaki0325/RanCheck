import { projecstDao } from '../datastore'
import { ProjectsEntity, IProjectsEntity } from '../../usecase'

export type addProjectType = {
  site: string
}

const projectsRepository = {
  get: async (): Promise<IProjectsEntity[]> => {
    return await projecstDao.get()
  },

  add: async ({ site }: addProjectType): Promise<IProjectsEntity> => {
    return await projecstDao.add(new ProjectsEntity('', site, ''))
  },
}

export default projectsRepository
