import axios from 'axios'

const client = axios.create({
  withCredentials: true
})

const httpClient = {
  get: (url: string) => {
    return client.get(url)
  }
}

export default httpClient