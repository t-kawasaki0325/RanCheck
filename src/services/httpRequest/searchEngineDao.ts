import httpClient from './httpClient'
import { URL } from './HttpService'

const searchEngineDao = {
  google: async (keyword: string) => {
    const { data } = await httpClient.get(`${URL.GOOGLE}${keyword}`)

    return data
  }
}

export default searchEngineDao