import { prisma } from '@/lib/prisma'
import { requireUser } from './user/require-user'
import { CateroryType } from '@prisma/client'

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
      type: true,
      paid: true
    },
    orderBy: {
      date: 'desc'
    }
  })
}

export const postExpense = async (
  type: 'FIXED' | 'VARIABLE',
  value: number,
  date: Date,
  category: CateroryType,
  description: string,
  paid: boolean
) => {
  const user = await requireUser()

  return await prisma.expense.create({
    data: {
      type,
      value,
      date,
      category,
      description,
      paid,
      user: {
        connect: { id: user.id }
      }
    }
  })
}

export const deleteExpenseById = async (id: string) => {
  await requireUser()
  return await prisma.expense.delete({ where: { id } })
}
