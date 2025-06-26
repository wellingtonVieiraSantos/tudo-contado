'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '../../../../auth'

export default async function expensesGetAction() {
  const session = await auth()

  try {
    if (!session?.user?.email) {
      return { success: false, error: { message: 'Usuário não autorizado.' } }
    }
    const rawExpense = await prisma.expense.findMany({
      where: {
        user: { email: session.user.email }
      },
      select: {
        id: true,
        value: true,
        description: true,
        date: true,
        type: true,
        paid: true
      },
      orderBy: {
        date: 'desc'
      }
    })
    //normalize value and type to show in component, get in centavos, return in reais
    const expenses = rawExpense.map(expense => ({
      ...expense,
      type: expense.type === 'FIXED' ? 'Fixo' : 'Variável',
      value: expense.value / 100
    }))
    return { success: true, data: expenses }
  } catch (e) {
    console.log(e)

    return {
      success: false,
      error: { message: 'Ops, algo inesperado aconteceu.' }
    }
  }
}
