import message from '../config/message'
import { projectsGetters, rancheckGetters, IState } from '../store/store'
import { testDao } from '../services/httpRequest'

const { INVALID_TYPE, NOT_EXISTS_URL, ALREADY_EXISTS } = message

const validationUtils = {
  projects: async (url: string, projects: IState['projects']): Promise<string> => {
    const params = url.match(/^(http:\/\/|https:\/\/)?(.*?)(?:\/|\?|#|$)/);
    const domain = params ? params[2] : ''
    const isValid = domain !== '' && domain.indexOf('.') !== -1
    if (!isValid) {
      return INVALID_TYPE
    }
    if (projectsGetters(projects).exists(domain)) {
      return ALREADY_EXISTS
    }
    if (await testDao.testRequest(domain)) {
      return NOT_EXISTS_URL
    }

    return ''
  },

  rancheck: (keywords: string[], rancheck: IState['rancheck']): string => {
    if (rancheckGetters(rancheck).exists(keywords)) {
      return ALREADY_EXISTS
    }
    return ''
  }
}

export default validationUtils