import {
  expenseSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema
} from '@/validators/formExpense'
import { z } from 'zod'

/* post */
export type expenseType = z.infer<typeof expenseSchema>

export type expenseFormStepOne = z.infer<typeof step1Schema>
export type expenseFormStepTwo = z.infer<typeof step2Schema>
export type expenseFormStepThree = z.infer<typeof step3Schema>
export type expenseFormStepFour = z.infer<typeof step4Schema>

/* put */
export type ExpenseUpdateProps = expenseType & { id: string }
