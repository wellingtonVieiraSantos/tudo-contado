import { PaymentMethodType } from '@prisma/client'

export const PaymentMethodTypeRenamed = {
  CREDIT: 'Crédito',
  DEBIT: 'Débito'
}

export const paymentMethodFormatter = (
  method: keyof typeof PaymentMethodType
) => {
  return PaymentMethodTypeRenamed[method] ?? method
}
