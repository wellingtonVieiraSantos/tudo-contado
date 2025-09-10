import { StatusType } from '@prisma/client'

export const PaymentStatusTypeRenamed = {
  PAID: 'Pago',
  PENDING: 'Pendente',
  OVERDUE: 'Atrasado'
}

export const paymentStatusFormatter = (status: keyof typeof StatusType) => {
  return PaymentStatusTypeRenamed[status] ?? status
}
