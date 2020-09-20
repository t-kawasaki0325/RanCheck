import { projectsRepository } from '../services';
import IProjectsEntity from '../usecase/projects/IProjectsEntity';

export default {
  fetchProjects: async (): Promise<IProjectsEntity[]> => await projectsRepository.get()
}