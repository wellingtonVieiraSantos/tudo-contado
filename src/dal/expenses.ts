import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const findExpenses = (userId: string) => {
  return prisma.expense.findMany({
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

export const findExpenseById = (expenseId: string) => {
  return prisma.expense.findUnique({
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

export const findExpensesByMonthRange = async (
  userId: string,
  monthRange: Date
) => {
  return await prisma.$queryRaw<{ month: string; total: number }[]>`
  SELECT DATE_TRUNC('month', "expenseDate") AS month,
        SUM(value)::int as total
  FROM "Expense"
  WHERE "userId" = ${userId}
    AND "expenseDate" >= ${monthRange}
  GROUP BY month
  ORDER BY month DESC;
  `
}

export const createExpense = (data: Prisma.ExpenseCreateInput) => {
  return prisma.expense.create({ data })
}

export const updateExpenseById = (
  expenseId: string,
  data: Prisma.ExpenseUpdateInput
) => {
  return prisma.expense.update({
    where: { id: expenseId },
    data
  })
}

export const deleteExpenseById = (expenseId: string) => {
  return prisma.expense.delete({ where: { id: expenseId } })
}
