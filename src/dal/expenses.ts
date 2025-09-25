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

export const createExpense = (data: Prisma.ExpenseCreateInput) =>
  prisma.expense.create({ data })

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
