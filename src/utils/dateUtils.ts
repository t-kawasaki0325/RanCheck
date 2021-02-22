import { zeroPadding } from '.'

export default {
  getYYYY_MM_DD: () => {
    const date = new Date()
    return `${date.getFullYear()}/${zeroPadding(
      date.getMonth() + 1,
      2,
    )}/${zeroPadding(date.getDate(), 2)}`
  },

  getIndefinitePeriod: () => '2099/01/01',

  aWeekAgo: () => {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return `${date.getFullYear()}/${zeroPadding(
      date.getMonth() + 1,
      2,
    )}/${zeroPadding(date.getDate(), 2)}`
  },

  aMonthAgo: () => {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    return `${date.getFullYear()}/${zeroPadding(
      date.getMonth() + 1,
      2,
    )}/${zeroPadding(date.getDate(), 2)}`
  },

  threeMonthAgo: () => {
    const date = new Date()
    date.setMonth(date.getMonth() - 3)
    return `${date.getFullYear()}/${zeroPadding(
      date.getMonth() + 1,
      2,
    )}/${zeroPadding(date.getDate(), 2)}`
  },

  sixMonthAgo: () => {
    const date = new Date()
    date.setMonth(date.getMonth() - 6)
    return `${date.getFullYear()}/${zeroPadding(
      date.getMonth() + 1,
      2,
    )}/${zeroPadding(date.getDate(), 2)}`
  },
}
