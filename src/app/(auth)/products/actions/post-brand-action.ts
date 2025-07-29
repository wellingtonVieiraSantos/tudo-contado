'use server'
import { generateBrandWithAi } from '@/lib/ai/generateBrand'
import { postBrand } from '@/lib/dal/brands'

export const postBrandAction = async (rawText: string) => {
  try {
    const parsed = await generateBrandWithAi(rawText)

    const name = parsed.name.trim()

    const brand = await postBrand(name)

    return {
      success: true,
      data: brand
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao cadastrar a nova marca.' }
    }
  }
}
