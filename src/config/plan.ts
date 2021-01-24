export type planValueType = {
  VALUE: number
  MAX_SITE: number
  MAX_KEYWORD: number
}

export const PLAN: { [key: string]: planValueType } = {
  FREE: {
    VALUE: 0,
    MAX_SITE: 1,
    MAX_KEYWORD: 5,
  },
  BETA: {
    VALUE: 10,
    MAX_SITE: 1,
    MAX_KEYWORD: 100,
  },
}
