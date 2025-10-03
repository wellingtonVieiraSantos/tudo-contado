import { prisma } from '@/lib/prisma'
import { CategoryType, StatusType } from '@prisma/client'

export const findLastTransactions = async (userId: string) => {
  return prisma.$queryRaw<
    {
      id: String
      value: Number
      description: String
      date: Date
      category: CategoryType
      status: StatusType
      type: 'income' | 'expense'
    }[]
  >`
    SELECT id, value, description, "date", NULL AS category, NULL AS status, 'income' AS type
    FROM "Income"
    WHERE "userId" = ${userId}

    UNION ALL

    SELECT id, value, description, "expenseDate" AS date, category, status, 'expense' AS type
    FROM "Expense"
    WHERE "userId" = ${userId}

    ORDER BY "date" DESC
    LIMIT 10;
  `
}
