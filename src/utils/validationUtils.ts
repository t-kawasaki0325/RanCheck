import message from '../config/message'
import { projectsGetters, rancheckGetters, IState } from '../store/store'

const { INVALID_TYPE, ALREADY_EXISTS } = message

const validationUtils = {
  projects: (url: string, projects: IState['projects']): string => {
    const params = url.match(/^(http:\/\/|https:\/\/)?(.*?)(?:\/|\?|#|$)/);
    const domain = params ? params[2] : ''
    const isValid = domain !== '' && domain.indexOf('.') !== -1
    if (!isValid) {
      return INVALID_TYPE
    }
    if (projectsGetters(projects).exists(domain)) {
      return ALREADY_EXISTS
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