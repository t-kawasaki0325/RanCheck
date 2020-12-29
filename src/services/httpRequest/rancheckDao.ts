import httpClient from './httpClient'
import { URL, RANCHECK } from './HttpService'
import { HTTP_AUTHENTICATION_FAILED } from '../../config/code'

export interface fetchType {
  title?: string
  url?: string
  result?: {
    date: string
    rank: string
  }[]
}[]

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
  },

  deleteKeyword: async (token: string, site: string, keywords: string[]): Promise<void> => {
    httpClient.post(
      `${URL.AWS_DOMAIN}${RANCHECK.DELETE_KEYWORD}`,
      { token, site, keywords }
    )
  },

  download: async (token: string, site: string): Promise<fetchType> => {
    const { data } = await httpClient.post(
      `${URL.AWS_DOMAIN}${RANCHECK.FETCH_RANK}`,
      { site, token }
    )
    return data.body
  }
}

export default rancheckDao
