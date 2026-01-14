import { prisma } from '@/lib/prisma'
import { CategoryType, PaymentMethodType, Prisma } from '@prisma/client'

const expenseSelect = {
  id: true,
  value: true,
  description: true,
  category: true,
  date: true,
  method: true,
  installments: true
}

export class ExpensesRepository {
  async getAll(
    where: {
      user: {
        id: string
      }
      date?: {
        gte: Date
        lt: Date
      }
      method?: PaymentMethodType
      category?: CategoryType
    },
    page: number
  ) {
    const limit = 10
    const [total_items, data] = await Promise.all([
      prisma.expense.count({
        where
      }),
      prisma.expense.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          value: true,
          description: true,
          category: true,
          date: true,
          method: true,
          installments: true
        },
        orderBy: {
          date: 'desc'
        }
      })
    ])

    return {
      meta: {
        total_items,
        page,
        limit,
        total_pages: Math.ceil(total_items / limit)
      },
      data
    }
  }
  async getById(expenseId: string) {
    return await prisma.expense.findUnique({
      where: { id: expenseId },
      select: expenseSelect
    })
  }
  async getByActualMonthCreditCardExpenseSum(
    userId: string,
    startOfMonth: Date,
    endOfMonth: Date
  ) {
    return await prisma.expense.groupBy({
      by: ['creditCardId'],
      _sum: { value: true },
      where: {
        userId,
        creditCardId: { not: null },
        date: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      }
    })
  }
  async getByActualMonthExpensesByCategory(
    userId: string,
    startOfMonth: Date,
    endOfMonth: Date
  ) {
    return await prisma.expense.groupBy({
      by: ['category'],
      _sum: { value: true },
      where: {
        userId,
        date: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      }
    })
  }
  async getByMonthRange(userId: string) {
    return await prisma.$queryRaw<{ month: Date; total: number }[]>`
    SELECT gs.month,
           COALESCE(SUM(e.value), 0)::int AS total
    FROM generate_series(
      DATE_TRUNC('month', CURRENT_DATE) - interval '5 months',
      DATE_TRUNC('month', CURRENT_DATE),
      interval '1 month'
    ) AS gs(month)
    LEFT JOIN "Expense" e
      ON DATE_TRUNC('month', e."date") = gs.month
     AND e."userId" = ${userId}
    GROUP BY gs.month
    ORDER BY gs.month ASC;
  `
  }
  async create(data: Prisma.ExpenseCreateInput) {
    return await prisma.expense.create({ data })
  }
  async update(expenseId: string, data: Prisma.ExpenseUpdateInput) {
    return await prisma.expense.update({
      where: { id: expenseId },
      data
    })
  }
  async delete(expenseId: string) {
    return await prisma.expense.delete({ where: { id: expenseId } })
  }
}
