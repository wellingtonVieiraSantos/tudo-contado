'use server'
import { deleteExpenseById } from '@/lib/dal/expenses'

export const deleteExpenseAction = async (id: string) => {
  try {
    const deletedExpense = await deleteExpenseById(id)

    return { success: true, data: deletedExpense }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao deletar a despesa.' }
    }
  }
}
