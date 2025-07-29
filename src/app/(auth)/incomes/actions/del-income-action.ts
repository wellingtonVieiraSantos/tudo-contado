'use server'
import { deleteIncomeById } from '@/lib/dal/incomes'

export const deleteIncomeAction = async (id: string) => {
  try {
    const deletedIncome = await deleteIncomeById(id)

    return { success: true, data: deletedIncome }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao deletar essa renda. ' }
    }
  }
}
