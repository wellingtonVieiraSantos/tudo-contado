import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const findExpenses = async (userId: string) => {
  return await prisma.expense.findMany({
    where: {
      user: { id: userId }
    },
    select: {
      id: true,
      value: true,
      description: true,
      category: true,
      expenseDate: true,
      dueDate: true,
      status: true,
      payments: {
        select: {
          id: true,
          amount: true,
          method: true,
          installments: true,
          paidAt: true,
          creditCard: {
            select: {
              id: true,
              lastNumber: true
            }
          }
        }
      }
    },
    orderBy: {
      expenseDate: 'desc'
    }
  })
}

export const findExpenseById = async (expenseId: string) => {
  return await prisma.expense.findUnique({
    where: { id: expenseId },
    select: {
      id: true,
      value: true,
      description: true,
      category: true,
      expenseDate: true,
      dueDate: true,
      status: true,
      payments: {
        select: {
          id: true,
          amount: true,
          method: true,
          installments: true,
          paidAt: true,
          creditCard: {
            select: {
              id: true,
              lastNumber: true
            }
          }
        }
      }
    }
  })
}

export const findActualMonthExpensesByCategory = async (
  userId: string,
  startOfMonth: Date,
  endOfMonth: Date
) => {
  return await prisma.expense.groupBy({
    by: ['category'],
    _sum: { value: true },
    where: {
      userId,
      expenseDate: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    }
  })
}

export const findExpensesByMonthRange = async (userId: string) => {
  return await prisma.$queryRaw<{ month: Date; total: number }[]>`
    SELECT gs.month,
           COALESCE(SUM(e.value), 0)::int AS total
    FROM generate_series(
      DATE_TRUNC('month', CURRENT_DATE) - interval '5 months',
      DATE_TRUNC('month', CURRENT_DATE),
      interval '1 month'
    ) AS gs(month)
    LEFT JOIN "Expense" e
      ON DATE_TRUNC('month', e."expenseDate") = gs.month
     AND e."userId" = ${userId}
    GROUP BY gs.month
    ORDER BY gs.month ASC;
  `
}

export const createExpense = async (data: Prisma.ExpenseCreateInput) => {
  return await prisma.expense.create({ data })
}

export const updateExpenseById = async (
  expenseId: string,
  data: Prisma.ExpenseUpdateInput
) => {
  return await prisma.expense.update({
    where: { id: expenseId },
    data
  })
}

export const deleteExpenseById = async (expenseId: string) => {
  return await prisma.expense.delete({ where: { id: expenseId } })
}
