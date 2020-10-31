export default {
  getYYYY_MM_DD: () => {
    const date = new Date()
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  },

  aWeekAgo: () => {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  },

  aMonthAgo: () => {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  },

  threeMonthAgo: () => {
    const date = new Date()
    date.setMonth(date.getMonth() - 3)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  },

  sixMonthAgo: () => {
    const date = new Date()
    date.setMonth(date.getMonth() - 6)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  },
}
