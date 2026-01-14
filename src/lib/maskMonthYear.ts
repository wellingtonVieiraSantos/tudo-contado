export const maskMonthYear = (value: string) => {
  const actualYear = new Date().getFullYear().toString().slice(-2)
  const numbers = value.replace(/\D/g, '').slice(0, 4)

  let month = numbers.slice(0, 2)
  let year = numbers.slice(2)

  if (month.length === 2) {
    if (+month === 0) month = '01'
    else if (+month > 12) month = '12'
  }

  if (+year > +actualYear) year = actualYear

  return year ? `${month}/${year}` : month
}
