'use server'
import { postExpense } from '@/lib/dal/expenses'
import { expenseType } from '@/validators/formExpense'

export const postExpenseAction = async (data: expenseType) => {
  try {
    //normalize value for db, get in reais, return in centavos
    const { type, value: rawValue, date, description, paid, category } = data
    const value = rawValue * 100

    const postedExpense = await postExpense(
      type,
      value,
      date,
      category,
      description,
      paid
    )
    return { success: true, data: postedExpense }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao cadastrar nova despesa.' }
    }
  }
}
