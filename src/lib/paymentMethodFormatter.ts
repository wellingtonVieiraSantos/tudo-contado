import { PaymentMethodType } from '@prisma/client'

export const PaymentMethodTypeRenamed = {
  PIX: 'Pix',
  MONEY: 'Dinheiro',
  CREDIT_CARD: 'Crédito',
  DEBIT_CARD: 'Débito'
}

export const paymentMethodFormatter = (
  method: keyof typeof PaymentMethodType
) => {
  return PaymentMethodTypeRenamed[method] ?? method
}
