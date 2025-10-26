import { prisma } from '@/lib/prisma'
import { CategoryType } from '@prisma/client'

export const findLastTransactions = async (userId: string) => {
  return await prisma.$queryRaw<
    {
      id: string
      value: number
      description: string
      date: Date
      category: CategoryType
      type: 'income' | 'expense'
    }[]
  >`
    SELECT id, value, description, date, NULL AS category, NULL as method, 'income' AS type
    FROM "Income"
    WHERE "userId" = ${userId}

    UNION ALL

    SELECT id, value, description, date, category, method, 'expense' AS type
    FROM "Expense"
    WHERE "userId" = ${userId}

    ORDER BY "date" DESC
    LIMIT 10;
  `
}
