import { CategoryType, PaymentMethodType, StatusType } from '@prisma/client'

export type dashboardDataProps = {
  name: string | null
  image: string | null
  income:
    | {
        id: string
        value: number
        date: Date
        description: string
      }[]

  expense:
    | {
        id: string
        value: number
        category: CategoryType
        date: Date
        dueDate: Date
        description: string
        paymentMethod: PaymentMethodType
        installments: number
        status: StatusType
      }[]

  creditCard:
    | {
        lastNumber: number
        creditLimit: number
        validity: Date
        holder: string
        brand: string
      }[]
} | null
