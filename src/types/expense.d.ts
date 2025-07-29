import { CateroryType } from '@prisma/client'

export type ExpenseType = {
  id: string
  type: string
  value: number
  date: Date
  description: string
  category: CateroryType
  paid: boolean
}
