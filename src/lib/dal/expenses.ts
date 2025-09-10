import { prisma } from '@/lib/prisma'
import { requireUser } from './user/require-user'
import { Prisma } from '@prisma/client'
import { ExpenseDataProps } from '@/types/expense-data-props'

export const getExpenses = async () => {
  const user = await requireUser()

  return await prisma.expense.findMany({
    where: {
      user: { id: user.id }
    },
    select: {
      id: true,
      value: true,
      description: true,
      category: true,
      date: true,
      dueDate: true,
      installments: true,
      paymentMethod: true,
      status: true,
      creditCard: {
        select: {
          lastNumber: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  })
}

export const postExpense = async (data: Omit<ExpenseDataProps, 'id'>) => {
  const user = await requireUser()

  return await prisma.expense.create({
    data: {
      paymentMethod: data.paymentMethod,
      value: data.value,
      date: data.date,
      dueDate: data.dueDate,
      installments: data.installments,
      description: data.description,
      category: data.category,
      status: data.status,
      user: {
        connect: { id: user.id }
      }
    }
  })
}

export const updateExpenseById = async (
  id: string,
  data: Prisma.ExpenseUpdateInput
) => {
  await requireUser()
  return await prisma.expense.update({
    where: { id },
    data
  })
}

export const deleteExpenseById = async (id: string) => {
  await requireUser()
  return await prisma.expense.delete({ where: { id } })
}
