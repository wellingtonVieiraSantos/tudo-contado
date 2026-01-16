import { IncomesRepository } from './incomes.repository'
import { requireUser } from '@/lib/require-user'
import {
  IncomeProps,
  ListIncomeQuery,
  ListIncomeQueryDTO
} from './incomes.types'
import { Prisma } from '@prisma/client'

const incomesRepository = new IncomesRepository()

/* GET */
export const getAllIncomesService = async (params: ListIncomeQueryDTO) => {
  const { id } = await requireUser()

  const where: {
    date?: { gte: Date; lt: Date }
    type?: ListIncomeQuery['type']
    user: { id: string }
  } = {
    user: { id: id! }
  }

  const { month, year, type, page } = params

  if (month && year) {
    const completeYear = 2000 + year
    const start = new Date(Date.UTC(completeYear, month - 1, 1))
    const end = new Date(Date.UTC(completeYear, month, 1))

    where.date = { gte: start, lt: end }
  }

  if (type) where.type = type

  const rawIncomes = await incomesRepository.getAll(where, page!)

  //normalize value and amount to show in component, get in centavos, return in reais
  const incomes = rawIncomes.data.map(income => ({
    ...income,
    value: income.value / 100,
    date: income.date.toISOString().split('T')[0]
  }))
  return { meta: rawIncomes.meta, incomes }
}

export const getIncomeByIdService = async (incomeId: string) => {
  await requireUser()
  const rawIncome = await incomesRepository.getById(incomeId)

  if (!rawIncome) return

  //normalize value  to show in component, get in centavos, return in reais
  const income = {
    ...rawIncome,
    value: rawIncome.value / 100,
    date: rawIncome.date.toISOString().split('T')[0]
  }
  return income
}

export const getSumIncomesValuesByMonthRangeService = async () => {
  const { id } = await requireUser()

  const incomes = await incomesRepository.getByMonthRange(id!)

  const normalizedIncome = incomes.map(inc => ({
    ...inc,
    total: inc.total ? inc.total / 100 : 0
  }))

  return normalizedIncome
}

/* POST */
export const postIncomeService = async (rawData: IncomeProps) => {
  const user = await requireUser()

  const data = {
    ...rawData,
    value: rawData.value * 100,
    date: new Date(`${rawData.date}T00:00:00.000Z`)
  }

  const incomeData: Prisma.IncomeCreateInput = {
    ...data,
    user: {
      connect: { id: user.id }
    }
  }

  const income = await incomesRepository.create(incomeData)

  return income
}

/* UPDATE */
export const updateIncomeByIdService = async (rawData: IncomeProps) => {
  await requireUser()

  const data = {
    ...rawData,
    value: rawData.value * 100,
    date: new Date(`${rawData.date}T00:00:00.000Z`)
  }

  const income = await incomesRepository.update(data.id!, data)

  return income
}

/* DELETE */
export const deleteIncomeByIdService = async (expenseId: string) => {
  await requireUser()

  return await incomesRepository.delete(expenseId)
}
