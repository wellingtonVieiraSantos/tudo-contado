'use server'
import { postIncome } from '@/lib/dal/incomes'
import { incomeType } from '@/validators/formIncome'

export const postIncomeAction = async (data: incomeType) => {
  try {
    //normalize value for db, get in reais, return in centavos
    const { type, value: rawValue, date, description } = data
    const value = rawValue * 100

    const postedIncome = await postIncome(type, value, date, description)
    return { success: true, data: postedIncome }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao cadastrar nova renda.' }
    }
  }
}
