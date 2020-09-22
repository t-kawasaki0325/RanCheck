import { IState } from './store'
import { projectsRepository } from '../services';
import { IProjectsEntity } from '../usecase';
import { addProjectType } from '../services/repository/projectsRepository';

export const projectsGetters = (store: IState['projects']) => ({
  exists: (project: string) => !!store.projects.find(v => v.site === project)
})

export default {
  addProject: async (payload: addProjectType): Promise<IProjectsEntity[]> => [await projectsRepository.add(payload)],
  fetchProjects: async (): Promise<IProjectsEntity[]> => await projectsRepository.get()
}