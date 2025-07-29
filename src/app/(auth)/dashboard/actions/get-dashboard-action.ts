'use server'
import { getDataFromUserId } from '@/lib/dal/user'

export const getDataForDashboardAction = async () => {
  try {
    const dashboardInfo = await getDataFromUserId()

    return { success: true, data: dashboardInfo }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao carregar os dados do usuário.' }
    }
  }
}
