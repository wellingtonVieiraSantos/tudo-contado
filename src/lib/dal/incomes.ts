import { prisma } from '@/lib/prisma'
import { requireUser } from './user/require-user'

export const getIncomes = async () => {
  const user = await requireUser()

  return await prisma.income.findMany({
    where: {
      user: { id: user.id }
    },
    select: {
      id: true,
      value: true,
      description: true,
      date: true,
      type: true
    },
    orderBy: {
      date: 'desc'
    }
  })
}

export const postIncome = async (
  type: 'FIXED' | 'VARIABLE',
  value: number,
  date: Date,
  description: string
) => {
  const user = await requireUser()

  return await prisma.income.create({
    data: {
      type,
      value,
      date,
      description,
      user: {
        connect: { id: user.id }
      }
    }
  })
}
export const deleteIncomeById = async (id: string) => {
  await requireUser()
  return await prisma.income.delete({ where: { id } })
}
