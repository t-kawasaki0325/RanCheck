export const sleep = () => {
  const waitSeconds = 2000 + Math.random() * 1000
  return new Promise(resolve => setTimeout(() => {
    resolve()
  }, waitSeconds))
}

export const includeString = (including: string, included: string): boolean => {
  return including.indexOf(included) !== -1
}