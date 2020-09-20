import { projecstDao } from '../datastore'
import { IProjectsEntity } from '../../usecase'

const projectsRepository = {
  get: async (): Promise<IProjectsEntity[]> => {
    return await projecstDao.get()
  }
}

export default projectsRepository