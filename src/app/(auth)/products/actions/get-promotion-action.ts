'use server'
import { getPromotions } from '@/lib/dal/promotions'

export const getPromotionsAction = async () => {
  try {
    const promotions = await getPromotions()

    return { success: true, data: promotions }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao buscar as promoções.' }
    }
  }
}
