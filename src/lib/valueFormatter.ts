const currencyFormater = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export default function valueFormatter(value: number | null) {
  return currencyFormater.format(value || 0)
}
