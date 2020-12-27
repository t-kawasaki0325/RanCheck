import axios from 'axios'

const client = axios.create({
  withCredentials: true,
})

const httpClient = {
  get: (url: string) => {
    return client.get(url)
  },

  post: (url: string, params: {}) => {
    return client.post(url, params)
  }
}

export default httpClient
