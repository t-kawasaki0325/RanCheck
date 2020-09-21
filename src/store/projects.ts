import { IState } from './store'
import { projectsRepository } from '../services';
import IProjectsEntity from '../usecase/projects/IProjectsEntity';

export const projectsGetters = (store: IState['projects']) => ({
  exists: (project: string) => !!store.projects.find(v => v.site === project)
})

export default {
  fetchProjects: async (): Promise<IProjectsEntity[]> => await projectsRepository.get()
}