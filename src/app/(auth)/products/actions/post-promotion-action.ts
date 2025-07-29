'use server'
import { productsPostType } from '@/validators/formPromotion'
import { getBrandByName } from '@/lib/dal/brands'
import { getProductByName } from '@/lib/dal/products'
import { upsertProductVariant } from '@/lib/dal/productVariant'
import { postPromotion } from '@/lib/dal/promotions'

export const postPromotionAction = async (data: productsPostType) => {
  try {
    //normalize value for db, get in reais, return in centavos
    const { name, brand: brandName, value: rawValue, date, location } = data
    const value = rawValue * 100

    const brand = await getBrandByName(brandName)

    const product = await getProductByName(name)

    if (!product)
      return { success: false, error: { message: 'Produto não encontrado.' } }

    const productVariant = await upsertProductVariant(
      product.id,
      brand.id,
      !!brandName
    )

    const promotion = await postPromotion(
      value,
      date,
      location,
      productVariant.id
    )
    return { success: true, data: promotion }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Erro ao cadastrar promoção.' }
    }
  }
}
