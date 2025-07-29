'use server'
import { getProductsWhereContainsText } from '@/lib/dal/products'

export const getProductAction = async (query: string) => {
  try {
    const products = await getProductsWhereContainsText(query)

    return { success: true, data: products }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao buscar os produtos.' }
    }
  }
}
