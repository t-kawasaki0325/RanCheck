export const sleep = () => {
  const waitSeconds = 2000 + Math.random() * 1000
  return new Promise(resolve => setTimeout(() => {
    resolve()
  }, waitSeconds))
}

export const includeString = (including: string, included: string): boolean => {
  return including.indexOf(included) !== -1
}

export const absVal = (number: number): number => Math.abs(number)

export const isObjEmpty = (obj: Object): boolean => Object.keys(obj).length === 0

export const range = (end: number): number[] => [...Array(end).keys()]