import { prisma } from '@/lib/prisma'
import { CategoryType, IncomeType, PaymentMethodType } from '@prisma/client'

export class DashboardRepository {
  async getTransactions(userId: string) {
    return await prisma.$queryRaw<
      {
        id: string
        value: number
        description: string
        date: Date
        category: CategoryType
        method: PaymentMethodType
        type: IncomeType
        transationKind: 'income' | 'expense'
      }[]
    >`
    SELECT id, value, description, date, NULL AS category, NULL as method, type, 'income' AS "transationKind"
    FROM "Income"
    WHERE "userId" = ${userId}

    UNION ALL

    SELECT id, value, description, date, category, method, NULL as type, 'expense' AS "transationKind"
    FROM "Expense"
    WHERE "userId" = ${userId}

    ORDER BY "date" DESC
    LIMIT 10;
  `
  }
}
