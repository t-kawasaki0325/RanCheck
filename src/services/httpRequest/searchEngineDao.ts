import httpClient from './httpClient'
import { URL } from './HttpService'

const searchEngineDao = {
  google: async (keyword: string, page: number) => {
    const { data } = await httpClient.get(
      `${URL.GOOGLE}${keyword}&start=${page * 10}`,
    )

    return data
  },
}

export default searchEngineDao
