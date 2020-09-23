import httpClient from './httpClient'
import { HTTP_SUCCESS } from '../../config/code'

const testDao = {
  testRequest: async (domain: string) => {
    const responses = await Promise.all([
      httpClient.get(`http://${domain}/`),
      httpClient.get(`https://${domain}/`)
    ]).catch(() => {
      // テストリクエストに失敗したときにはfailするように
      return [{ status: 500 }]
    })
    return responses.some(response => response.status !== HTTP_SUCCESS)
  }
}

export default testDao