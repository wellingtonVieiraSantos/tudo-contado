'use client'
import { ProductsType } from '@/types/products'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import productsGetAction from './productsGetAction'
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent
} from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'
import valueFormatter from '@/lib/valueFormatter'

export const productsSchema = z.object({
  name: z.string().trim().min(1, { message: 'Campo obrigatório.' }),
  brand: z.string().trim(),
  price: z.coerce
    .number({ message: 'Campo obrigatório' })
    .positive({ message: 'Apenas valores positivos' })
    .refine(val => Math.round(val * 100) / 100 === val, {
      message: 'Máximo 2 casas decimais'
    }),
  category: z.enum([
    'HOUSE',
    'FOOD',
    'TRANSPORT',
    'EDUCATION',
    'HEALTH',
    'CLOTHING',
    'TECH',
    'PERSONAL_CARE',
    'ENTERTAINMENT',
    'PETS',
    'FINANCIAL',
    'OTHER'
  ]),
  quantity: z.coerce
    .number({ message: 'Campo obrigatório' })
    .positive({ message: 'Apenas valores positivos' })
    .refine(val => Math.round(val * 1000) / 1000 === val, {
      message: 'Máximo 3 casas decimais'
    }),
  unit: z.enum(['UNIT', 'G', 'ML', 'MM']),
  purchaseDate: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError
    })
  }),
  /* fazer a validação de que a endDate seja sempre depois da purchaseDate */
  endDate: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError
    })
  }),
  rating: z.enum([
    'ONE_STAR',
    'TWO_STAR',
    'THREE_STAR',
    'FOUR_STAR',
    'FIVE_STAR'
  ]),
  review: z.string().trim()
})

export type productsPostType = z.infer<typeof productsSchema>

export default function Products() {
  const [products, setProducts] = useState<ProductsType[]>([])

  useEffect(() => {
    const handleProductsGet = async () => {
      const { data } = await productsGetAction()
      if (!data) return
      setProducts(data)
    }

    handleProductsGet()
  }, [])
  return (
    <div className='flex gap-4 pt-20'>
      {products.length === 0 && <span>Nenhum produto cadastrado.</span>}
      {products.length > 0 &&
        products.map(product => (
          <Card className='w-[300px] h-[200px]' key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                {product.brand || 'não informada'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>{product.category}</Badge>
              <p>
                Quantidade: {product.quantity} / {product.unit}
              </p>
              <p>
                Data de compra:{' '}
                {format(product.purchaseDate, 'dd/MM/yyyy', {
                  locale: ptBR
                })}
              </p>
              <p>Preço: {valueFormatter(product.price / 100)}</p>
              <p>{product.review}</p>
              {!product.endDate && <Badge variant='outline'>Em uso</Badge>}
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
/* criar uma tabela preço-produto, com preço, data, local === tipo um waze de mercado,
as pessoas vao vendo as promoçoes dos produtos e cadastrando os valores com data e local
e outras pessoas vao tendo acesso aos preços, talvez um sistema de notas para usuarios para evitar fraude
ou entao um sistema de termometro, parecido com o pelando*/
