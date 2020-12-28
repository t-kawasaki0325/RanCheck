import httpClient from './httpClient'
import { URL, RANCHECK } from './HttpService'
import { HTTP_AUTHENTICATION_FAILED } from '../../config/code'

const rancheckDao = {
  isValidLicense: async (token: string): Promise<boolean> => {
    const params = {
      site: 'example.com',
      token
    }
    // TODO: ts-ignoreを外す
    // @ts-ignore
    const { data } = await httpClient.post(
      `${URL.AWS_DOMAIN}${RANCHECK.FETCH_RANK}`,
      params
    )
    return data.code !== HTTP_AUTHENTICATION_FAILED
  },

  register: async (token: string, site: string, keywords: string[]): Promise<void> => {
    await httpClient.post(
      `${URL.AWS_DOMAIN}${RANCHECK.REGISTER_KEYWORD}`,
      { token, site, keywords }
    )
  }
}

export default rancheckDao
