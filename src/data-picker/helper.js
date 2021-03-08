export default {
  firstDayOfMonth (date) {
    let [year, month, day] = getYearMonthDay(date)
    return new Date(year, month, 1)
  },
  lastDayOfMonth (date) {
    let [year, month, day] = getYearMonthDay(date)
    return new Date(year, month + 1, 0)
  },
  range (begin, end) {
    let array = []
    for (let i = begin; i < end; i++) {
      array.push(i)
    }
    return array
  },
  getYearMonthDay
}

function getYearMonthDay (date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return [year, month, day]
}