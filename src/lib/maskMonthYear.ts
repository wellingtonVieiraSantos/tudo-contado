export const maskMonthYear = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 6)

  const month = numbers.slice(0, 2)
  const year = numbers.slice(2)
  let m = month
  if (month.length === 2) {
    const n = Number(month)

    if (n === 0) m = '01'
    else if (n > 12) m = '12'
  }
  return year ? `${m}/${year}` : m
}
