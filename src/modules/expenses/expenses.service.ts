import { ExpensesRepository } from './expenses.repository'
import { requireUser } from '@/lib/require-user'
import { endOfMonth, startOfMonth } from 'date-fns'
import {
  ExpenseProps,
  ListExpensesQuery,
  ListExpensesQueryDTO
} from './expenses.types'
import { stringToDateFormatter } from '@/lib/stringToDateFormatter'

const expensesRepository = new ExpensesRepository()

/* GET */
export const getAllExpensesService = async (params: ListExpensesQueryDTO) => {
  const { id } = await requireUser()

  const where: {
    date?: { gte: Date; lt: Date }
    category?: ListExpensesQuery['category']
    method?: ListExpensesQuery['method']
    user: { id: string }
  } = {
    user: { id: id! }
  }

  const { month, year, category, method, page } = params

  if (month && year) {
    const completeYear = 2000 + year
    const start = new Date(Date.UTC(completeYear, month - 1, 1))
    const end = new Date(Date.UTC(completeYear, month, 1))

    where.date = { gte: start, lt: end }
  }

  if (category) where.category = category

  if (method) where.method = method

  /*   console.log(JSON.stringify(where, null, 2)) */

  const rawExpenses = await expensesRepository.getAll(where, page!)

  //normalize value and amount to show in component, get in centavos, return in reais
  const expenses = rawExpenses.data.map(expense => ({
    ...expense,
    value: expense.value / 100,
    date: expense.date.toISOString().split('T')[0]
  }))
  return { meta: rawExpenses.meta, expenses }
}

export const getExpenseByIdService = async (expenseId: string) => {
  await requireUser()
  const rawExpenses = await expensesRepository.getById(expenseId)

  if (!rawExpenses) return

  //normalize value  to show in component, get in centavos, return in reais
  const expenses = {
    ...rawExpenses,
    value: rawExpenses.value / 100,
    date: rawExpenses.date.toISOString().split('T')[0]
  }
  return expenses
}

export const getSumExpensesValuesByMonthRangeService = async () => {
  const { id } = await requireUser()

  const expense = await expensesRepository.getByMonthRange(id!)

  const normalizedExpense = expense.map(exp => ({
    ...exp,
    total: exp.total ? exp.total / 100 : 0,
    month: exp.month.toISOString().split('T')[0]
  }))

  return normalizedExpense
}

export const getActualMonthExpensesByCategoryService = async () => {
  const { id } = await requireUser()

  const today = new Date()

  const start = startOfMonth(today)
  const end = endOfMonth(today)

  const expense = await expensesRepository.getByActualMonthExpensesByCategory(
    id!,
    start,
    end
  )

  const normalizedExpense = expense.map(exp => ({
    ...exp,
    _sum: exp._sum.value ? exp._sum.value / 100 : 0
  }))

  return normalizedExpense
}

export const getActualMonthCreditCardExpenseSumService = async () => {
  const { id } = await requireUser()

  const today = new Date()

  const start = startOfMonth(today)
  const end = endOfMonth(today)

  const creditCard =
    await expensesRepository.getByActualMonthCreditCardExpenseSum(
      id!,
      start,
      end
    )

  const normalizedExpense = creditCard.map(exp => ({
    ...exp,
    _sum: exp._sum.value ? exp._sum.value / 100 : 0
  }))

  return normalizedExpense
}

/* POST */
export const postExpenseService = async (rawData: ExpenseProps) => {
  const { id } = await requireUser()

  const data = {
    value: rawData.value * 100,
    description: rawData.description,
    category: rawData.category,
    method: rawData.method,
    installments: rawData.installments,
    date: stringToDateFormatter(rawData.date),

    user: { connect: { id: id! } },

    creditCard:
      rawData.method === 'CREDIT' && rawData.creditCardId
        ? { connect: { id: rawData.creditCardId } }
        : undefined
  }

  const expense = await expensesRepository.create(data)

  return expense
}

/* UPDATE */
export const updateExpenseByIdService = async (rawData: ExpenseProps) => {
  await requireUser()

  const data = {
    id: rawData.id!,
    value: rawData.value * 100,
    description: rawData.description,
    category: rawData.category,
    method: rawData.method,
    installments: rawData.installments,
    date: stringToDateFormatter(rawData.date),

    creditCard: rawData.creditCardId
      ? { connect: { id: rawData.creditCardId } }
      : undefined
  }

  const expense = await expensesRepository.update(data.id, data)

  return expense
}

/* DELETE */
export const deleteExpenseByIdService = async (expenseId: string) => {
  await requireUser()

  return await expensesRepository.delete(expenseId)
}
