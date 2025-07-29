'use client'
import { ProductsPriceType } from '@/types/products'
import { useEffect, useState } from 'react'
import { getPromotionsAction } from './actions/get-promotion-action'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/Card'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import valueFormatter from '@/lib/valueFormatter'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'

export default function Products() {
  const [promotions, setPromotions] = useState<ProductsPriceType[]>([])

  useEffect(() => {
    const handleProductsGet = async () => {
      const { data } = await getPromotionsAction()
      if (!data) return
      setPromotions(data)
    }

    handleProductsGet()
  }, [])

  return (
    <div className='flex flex-col gap-4 p-1 pt-5'>
      <Link href={'/products/register'}>
        <Button className='w-full'>
          <Plus />
          Cadastrar promoção
        </Button>
      </Link>
      <Card className='p-2 grid gap-2'>
        <CardDescription>Filtrar por:</CardDescription>
        <CardContent className='flex flex-row'>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Categoria' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem></SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Preço' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem></SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      {promotions.length === 0 && <span>Nenhum produto cadastrado.</span>}
      {promotions.length > 0 &&
        promotions.map(product => (
          <Card className='p-2' key={product.id}>
            <CardHeader>
              <CardTitle>
                {product.productVariant.product.name + ' '}
                {product.productVariant.brand?.name || ''}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className='text-xl font-montserrat'>
                  {valueFormatter(product.value / 100)}
                </p>
                <p>
                  {format(product.date, "dd 'de' MMMM", {
                    locale: ptBR
                  })}
                </p>
                <p>{product.location}</p>
                <p>criado por {product.user.name}</p>
              </div>
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

/* separar os produtos das marcas, um search para cada, criar usando ia igualmente separado e juntar no final no post do promotion */
