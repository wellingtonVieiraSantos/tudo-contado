import { z } from 'zod'
import { incomeSchema, filterIncomeSchema } from './incomes.schema'

export type ListIncomeQuery = z.infer<typeof filterIncomeSchema>
export type ListIncomeQueryDTO = Omit<ListIncomeQuery, 'date'> &
  Partial<{
    month: number
    year: number
    page: number
  }>

/* post */
export type IncomeProps = z.infer<typeof incomeSchema>

/* get */
export type IncomeWithIdProps = IncomeProps & { id: string }
