import {
  expenseSchema,
  step1Schema,
  step2Schema,
  step3Schema
} from '@/validators/formExpense'
import { PaymentMethodType, StatusType, CategoryType } from '@prisma/client'
import { z } from 'zod'

/* post */
export type ExpenseProps = z.infer<typeof expenseSchema>

export type ExpenseFormStepOne = z.infer<typeof step1Schema>
export type ExpenseFormStepTwo = z.infer<typeof step2Schema>
export type ExpenseFormStepThree = z.infer<typeof step3Schema>

/* put */
export type ExpenseWithIdProps = ExpenseProps & { id: string }
