import { expenseSchema } from '@/validators/formExpense'
import { z } from 'zod'

/* post */
export type expenseType = z.infer<typeof expenseSchema>

/* get */
export type ExpenseDataProps = expenseType & { id: string; date: Date }

/* put */
export type dataExpenseUpdateProps = Omit<ExpenseDataProps, 'date'>
