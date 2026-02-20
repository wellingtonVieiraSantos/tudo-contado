export const dateStringFormatter = (rawDate: string) => {
  const [year, month, day] = rawDate.split('T')[0].split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  console.log(year, month, day)

  return date.toLocaleDateString('pt-BR').replaceAll('/', '-')
}
