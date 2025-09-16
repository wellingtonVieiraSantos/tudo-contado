import {
  CardBrand,
  CategoryType,
  PaymentMethodType,
  StatusType
} from '@prisma/client'

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
        creditCardId: String | undefined
        installments: number | undefined
        status: StatusType
      }[]
  creditCard:
    | {
        id: string
        lastNumber: string
        creditLimit: number
        expMonth: string
        expYear: string
        holder: string
        cardBrand: CardBrand
        expense: {
          value: number
          status: StatusType
          date: Date
        }[]
      }[]
} | null
