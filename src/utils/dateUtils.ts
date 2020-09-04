export default {
  getYYYY_MM_DD: () => {
    const date = new Date()
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }
}
