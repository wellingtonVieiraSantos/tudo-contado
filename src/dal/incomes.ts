import { prisma } from '@/lib/prisma'
import { requireUser } from '../lib/require-user'
import { Prisma } from '@prisma/client'

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

export const updateIncomeById = async (
  id: string,
  data: Prisma.IncomeUpdateInput
) => {
  await requireUser()
  return await prisma.income.update({
    where: { id },
    data
  })
}

export const deleteIncomeById = async (id: string) => {
  await requireUser()
  return await prisma.income.delete({ where: { id } })
}
