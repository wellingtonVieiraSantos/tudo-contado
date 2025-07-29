'use server'
import { ProductCategory } from '@prisma/client'
import { generateProductWithAi } from '@/lib/ai/generateProduct'
import { postProduct } from '@/lib/dal/products'

export const postProductAction = async (rawText: string) => {
  try {
    const parsed = await generateProductWithAi(rawText)

    const name = parsed.name.trim()
    const category = parsed.category.trim() as ProductCategory

    const product = await postProduct(name, category)

    return {
      success: true,
      data: product
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao cadastrar o novo produto.' }
    }
  }
}
