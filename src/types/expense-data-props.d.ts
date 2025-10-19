import {
  expenseSchema,
  step1Schema,
  step0Schema,
  step2Schema,
  step3Schema
} from '@/validators/formExpense'
import { PaymentMethodType, StatusType, CategoryType } from '@prisma/client'
import { z } from 'zod'

/* post */
export type expenseType = z.infer<typeof expenseSchema>

export type expenseFormStepZero = z.infer<typeof step0Schema>
export type expenseFormStepOne = z.infer<typeof step1Schema>
export type expenseFormStepTwo = z.infer<typeof step2Schema>
export type expenseFormStepThree = z.infer<typeof step3Schema>

/* put */
export type ExpenseUpdateProps = expenseType & { id: string }

export type expensesWithPaymentType = expenseType & {
  payments:
    | {
        amount: number
        id: string
        installments: number | null
        paidAt: string | null
        creditCard: {
          id: string
          lastNumber: string
        } | null
        method: PaymentMethodType
      }[]
    | null
}
