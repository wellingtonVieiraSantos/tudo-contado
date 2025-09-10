import { PaymentMethodType } from '@prisma/client'

export const PaymentMethodTypeRenamed = {
  PIX: 'Pix',
  MONEY: 'Dinheiro',
  CREDIT_CARD: 'Cartão de crédito',
  DEBIT_CARD: 'Cartão de débito'
}

export const paymentMethodFormatter = (
  method: keyof typeof PaymentMethodType
) => {
  return PaymentMethodTypeRenamed[method] ?? method
}
