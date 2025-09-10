import { expenseSchema } from '@/validators/formExpense'
import { z } from 'zod'

/* post */
export type expenseType = z.infer<typeof expenseSchema>

/* get */
export type ExpenseDataProps = Omit<
  expenseType & {
    id: string
    date: Date
    dueDate: Date
  },
  'dateString' | 'dueDateString'
>

/* put */
export type ExpenseUpdateProps = expenseType & { id: string }
