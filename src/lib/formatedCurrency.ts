export default function formatedCurrency(amount: number) {
  const formatedAmount = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  return formatedAmount
}
