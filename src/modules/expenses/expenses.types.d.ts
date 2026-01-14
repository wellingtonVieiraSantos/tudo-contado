import {
  expenseSchema,
  listExpensesSchema,
  step1Schema,
  step2Schema,
  step3Schema
} from './expenses.schema'
import { PaymentMethodType, StatusType, CategoryType } from '@prisma/client'
import { z } from 'zod'

export type ListExpensesQuery = z.infer<typeof listExpensesSchema>
export type ListExpensesQueryDTO = Omit<ListExpensesQuery, 'date'> &
  Partial<{
    month: number
    year: number
    page: number
  }>

/* post */
export type ExpenseProps = z.infer<typeof expenseSchema>

export type ExpenseFormStepOne = z.infer<typeof step1Schema>
export type ExpenseFormStepTwo = z.infer<typeof step2Schema>
export type ExpenseFormStepThree = z.infer<typeof step3Schema>

/* put */
export type ExpenseWithIdProps = ExpenseProps & { id: string }
