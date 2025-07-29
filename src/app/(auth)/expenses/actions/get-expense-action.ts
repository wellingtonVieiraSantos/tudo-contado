'use server'
import { getExpenses } from '@/lib/dal/expenses'

export const getExpenseAction = async () => {
  try {
    const rawExpense = await getExpenses()

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
      error: { message: 'Erro ao buscar dados das despesas.' }
    }
  }
}
