import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const findIncomes = async (userId: string) => {
  return await prisma.income.findMany({
    where: {
      user: { id: userId }
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

export const findIncomeById = async (incomeId: string) => {
  return await prisma.income.findUnique({
    where: { id: incomeId },
    select: {
      id: true,
      value: true,
      description: true,
      date: true,
      type: true
    }
  })
}

export const sumIncomesValuesPerMonth = (
  userId: string,
  startDate: Date,
  endDate: Date
) => {
  return prisma.income.aggregate({
    _sum: { value: true },
    where: { userId, date: { gte: startDate, lte: endDate } }
  })
}

export const createIncome = async (data: Prisma.IncomeCreateInput) => {
  return await prisma.income.create({ data })
}

export const updateIncomeById = async (
  incomeId: string,
  data: Prisma.IncomeUpdateInput
) => {
  return await prisma.income.update({
    where: { id: incomeId },
    data
  })
}

export const deleteIncomeById = async (incomeId: string) => {
  return await prisma.income.delete({ where: { id: incomeId } })
}
