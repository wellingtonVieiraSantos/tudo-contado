'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '../../../../auth'

export default async function incomesGetAction() {
  const session = await auth()

  try {
    if (!session?.user?.email) {
      return { success: false, error: { message: 'Usuário não autorizado.' } }
    }
    const rawIncomes = await prisma.income.findMany({
      where: {
        user: { email: session.user.email }
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
    //normalize value and type to show in component, get in centavos, return in reais
    const incomes = rawIncomes.map(income => ({
      ...income,
      type: income.type === 'FIXED' ? 'Fixo' : 'Variável',
      value: income.value / 100
    }))
    return { success: true, data: incomes }
  } catch (e) {
    console.log(e)

    return {
      success: false,
      error: { message: 'Ops, algo inesperado aconteceu.' }
    }
  }
}
