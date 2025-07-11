'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '../../../../auth'
import { expenseType } from './page'

export default async function expensesPostAction(data: expenseType) {
  const session = await auth()

  try {
    //normalize value for db, get in reais, return in centavos
    const { type, value: rawValue, date, description, paid, category } = data
    const value = rawValue * 100

    if (!session?.user?.email) {
      return { success: false, error: { message: 'Usuário não autorizado.' } }
    }
    await prisma.expense.create({
      data: {
        type,
        value,
        date,
        category,
        description,
        paid,
        user: {
          connect: { email: session.user.email }
        }
      }
    })
    return { success: true }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Ops, algo inesperado aconteceu.' }
    }
  }
}
