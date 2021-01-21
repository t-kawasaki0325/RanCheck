import axios from 'axios'
import { ERROR_MESSAGE } from '../../config/message'

const client = axios.create({
  withCredentials: true,
})

client.interceptors.response.use(
  res => res,
  error => {
    if (!error.response) {
      alert(ERROR_MESSAGE.NETWORK)
    }
    return Promise.reject(error)
  }
)

const httpClient = {
  get: (url: string) => {
    return client.get(url)
  },

  post: (url: string, params: {}) => {
    return client.post(url, params)
  }
}

export default httpClient
