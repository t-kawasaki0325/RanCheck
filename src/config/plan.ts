export type planValueType = {
  VALUE: number
  MAX_SITE: number
  MAX_KEYWORD: number
}

export const DEFAULT_TOKEN = '1778eec93fc3aa'

export const PLAN: { [key: string]: planValueType } = {
  FREE: {
    VALUE: 0,
    MAX_SITE: 1,
    MAX_KEYWORD: 10,
  },
  BETA: {
    VALUE: 10,
    MAX_SITE: 1,
    MAX_KEYWORD: 100,
  },
}
