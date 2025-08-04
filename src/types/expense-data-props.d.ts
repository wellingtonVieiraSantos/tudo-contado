import { CateroryType } from '@prisma/client'

export type ExpenseDataProps = {
  type: string
  value: number
  paid: boolean
  id: string
  date: Date
  description: string
  category: CateroryType
}
