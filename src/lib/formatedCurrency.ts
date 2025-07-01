const currencyFormater = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export default function formatedCurrency(amount: number) {
  return currencyFormater.format(amount)
}
