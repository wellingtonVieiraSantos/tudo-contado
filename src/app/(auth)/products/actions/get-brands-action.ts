'use server'
import { getBrandsWhereContainsText } from '@/lib/dal/brands'

export const getBrandAction = async (query: string) => {
  try {
    const brands = await getBrandsWhereContainsText(query)

    return { success: true, data: brands }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao buscar as marcas dos produtos.' }
    }
  }
}
