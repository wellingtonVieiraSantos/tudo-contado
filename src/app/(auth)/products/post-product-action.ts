'use server'

import { prisma } from '@/lib/prisma'
import { groq } from '@/lib/groq'

export async function registerProductWithIA(rawText: string) {
  const prompt = `
Dado o nome de um produto digitado por um usuário, identifique:
1. O nome completo do produto de forma padronizada.
2. A marca do produto.

Retorne em JSON com os campos "product" e "brand".

Entrada: "${rawText}"
Saída:
`

  const completion = await groq.chat.completions.create({
    model: 'mixtral-8x7b-32768',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3
  })

  const resposta = completion.choices[0].message.content?.trim()

  let parsed: { product: string; brand: string }

  try {
    parsed = JSON.parse(resposta!)
  } catch (e) {
    console.log(e)
    throw new Error('Erro ao parsear resposta da IA')
  }

  const productName = parsed.product.trim()
  const brandName = parsed.brand.trim()

  const existingProduct = await prisma.product.findFirst({
    where: { name: { equals: productName, mode: 'insensitive' } }
  })

  const existingBrand = await prisma.brand.findFirst({
    where: { name: { equals: brandName, mode: 'insensitive' } }
  })

  const brand =
    existingBrand ||
    (await prisma.brand.create({
      data: {
        name: brandName
      }
    }))

  // Busca produto (ignora marca nesse momento)

  if (existingProduct) {
    // Verifica se marca é diferente
    if (existingProduct.id !== brand.id) {
      // Opcional: atualizar marca
      await prisma.product.update({
        where: { id: existingProduct.id },
        data: { brandId: brand.id }
      })
    }

    return {
      success: true,
      product: {
        id: existingProduct.id,
        name: existingProduct.name,
        brand: brand.name
      }
    }
  }

  // Produto não existe, cria
  const product = await prisma.product.create({
    data: {
      name: productName,
      brandId: brand.id
    }
  })

  return {
    success: true,
    product: {
      id: product.id,
      name: product.name,
      brand: brand.name
    }
  }
}
