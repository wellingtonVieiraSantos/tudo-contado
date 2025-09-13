import { CardBrand } from '@prisma/client'

export const CardBrandTypeRenamed = {
  VISA: 'Visa',
  MASTERCARD: 'Mastercard',
  ELO: 'Elo',
  HIPERCARD: 'Hipercard',
  AMEX: 'American Express',
  OTHER: 'Outros'
}

export const cardBrandFormatter = (cardBrand: keyof typeof CardBrand) => {
  return CardBrandTypeRenamed[cardBrand] ?? cardBrand
}
