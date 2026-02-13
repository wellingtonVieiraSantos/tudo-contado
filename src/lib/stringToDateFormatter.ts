export const stringToDateFormatter = (rawDate: String) => {
  const [year, month, day] = rawDate.split('-')
  return new Date(Number(year), Number(month) - 1, Number(day))
}
