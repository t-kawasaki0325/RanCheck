import { HTTP_SERVER_ERROR } from './code'
import { ERROR_MESSAGE } from './message'

export const COMMON_ERROR = {
  data: {
    code: HTTP_SERVER_ERROR,
    message: ERROR_MESSAGE.SERVER,
    body: {},
  },
}
