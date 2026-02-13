export const maskMoney = (value: number | string) => {
  const numeric =
    typeof value === 'number' ? value : Number(value.replace(/\D/g, '')) / 100

  return numeric.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export const unmaskMoney = (value: string) =>
  Number(value.replace(/\D/g, '')) / 100
