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

export const findIncomesByMonthRange = async (userId: string) => {
  return await prisma.$queryRaw<{ month: Date; total: number }[]>`
    SELECT gs.month,
           COALESCE(SUM(i.value), 0)::int AS total
    FROM generate_series(
      DATE_TRUNC('month', CURRENT_DATE) - interval '5 months',
      DATE_TRUNC('month', CURRENT_DATE),
      interval '1 month'
    ) AS gs(month)
    LEFT JOIN "Income" i
      ON DATE_TRUNC('month', i."date") = gs.month
     AND i."userId" = ${userId}
    GROUP BY gs.month
    ORDER BY gs.month ASC;
  `
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
