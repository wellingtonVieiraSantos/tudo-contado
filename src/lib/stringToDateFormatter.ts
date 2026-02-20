export const stringToDateFormatter = (rawDate: string) => {
  const [year, month, day] = rawDate.split('-')
  return new Date(Number(year), Number(month) - 1, Number(day))
}
