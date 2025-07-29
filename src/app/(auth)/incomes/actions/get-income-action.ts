'use server'
import { getIncomes } from '@/lib/dal/incomes'

export const getIncomeAction = async () => {
  try {
    const rawIncomes = await getIncomes()

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
      error: { message: 'Erro ao buscar dados da renda.' }
    }
  }
}
