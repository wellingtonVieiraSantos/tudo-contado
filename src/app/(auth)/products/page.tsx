'use client'
import { ProductsPriceType } from '@/types/products'
import { ChangeEvent, useEffect, useState } from 'react'
import { z } from 'zod'
import productsGetAction from './get-promotion-action'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import valueFormatter from '@/lib/valueFormatter'
import { Button } from '@/components/ui/Button'
import { MapPin, Plus, Search, Send, Wallet } from 'lucide-react'
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from '@/components/ui/Modal'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import productsNameGetAction from './get-name-action'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import brandNameGetAction from './get-brand-action'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/Popover'
import { Divider } from '@/components/ui/Divider'
import promotionPostAction from './post-promotion-action'

export const productsSchema = z.object({
  name: z.string().trim().min(1, { message: 'Campo obrigatório.' }),
  brand: z.string().trim().min(1, { message: 'Campo obrigatório.' }),
  location: z.string().trim().min(1, { message: 'Campo obrigatório.' }),
  value: z.coerce
    .number({ message: 'Campo obrigatório' })
    .positive({ message: 'Apenas valores positivos' })
    .refine(val => Math.round(val * 100) / 100 === val, {
      message: 'Máximo 2 casas decimais'
    }),
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError
    })
  })
})

export type productsPostType = z.infer<typeof productsSchema>

export default function Products() {
  const [promotions, setPromotions] = useState<ProductsPriceType[]>([])
  const [products, setProducts] = useState<
    { id: string; name: string }[] | null
  >(null)
  const [brands, setBrands] = useState<{ id: string; name: string }[] | null>(
    null
  )
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState<productsPostType | null>(null)

  useEffect(() => {
    const handleProductsGet = async () => {
      const { data } = await productsGetAction()
      if (!data) return
      setPromotions(data)
    }

    handleProductsGet()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: '',
      brand: '',
      value: undefined,
      location: '',
      date: undefined
    }
  })

  const onSubmit = async (data: productsPostType) => {
    await promotionPostAction(data)
    reset()
    setFormStep(0)
    console.log(data)
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setProducts(null)
      setIsOpen(false)
      return
    }
    const { data } = await productsNameGetAction(query)

    setProducts(data)
    setIsOpen(true)
  }

  const handleSearchBrand = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const value = e.currentTarget.textContent
    if (!value?.trim()) {
      return
    }
    const { data } = await brandNameGetAction(value)

    setValue('name', value)
    setFormData(prev => ({ ...prev!, name: value }))
    setFormStep(1)
    setBrands(data)
    setIsOpen(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (timer) clearTimeout(timer)
    const newTimer = setTimeout(() => {
      handleSearch(value)
    }, 500)

    setTimer(newTimer)
  }

  return (
    <div className='flex flex-col gap-4 pt-20'>
      <Modal>
        <ModalTrigger asChild>
          <Button>
            <Plus />
            Cadastrar promoção
          </Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Cadastro de Promoções</ModalTitle>
            <ModalDescription className='text-sm text-foreground-secondary'>
              Viu alguma promoção boa? Compartilhe para que outros aproveitem
              também.
            </ModalDescription>
            {formStep === 2 && (
              <div className='flex gap-2'>
                {formData?.name && (
                  <Badge variant='info'>{formData.name}</Badge>
                )}
                {formData?.brand && (
                  <Badge variant='info'>
                    {brands?.find(brand => brand.id === formData.brand)?.name}
                  </Badge>
                )}
              </div>
            )}
          </ModalHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {formStep === 0 && (
              <FormField name='name'>
                <FormLabel>Qual o produto?</FormLabel>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <FormControl asChild>
                    <Input
                      type='search'
                      icon={Search}
                      {...register('name')}
                      onChange={handleChange}
                      autoComplete='off'
                      placeholder='Digite o nome do produto. Ex: Arroz'
                    />
                  </FormControl>
                  {errors.name && (
                    <FormMessage className='text-destructive'>
                      {errors.name?.message}
                    </FormMessage>
                  )}
                  <PopoverTrigger />
                  <PopoverContent sideOffset={2}>
                    {isOpen && (
                      <div>
                        {products?.length !== 0 && (
                          <div className='text-sm text-foreground-secondary grid gap-2'>
                            <p>Você quis dizer?</p>
                            <Divider />
                          </div>
                        )}
                        {products?.length === 0 && (
                          <div className='py-3 text-center grid gap-4'>
                            <span className='text-foreground-secondary'>
                              Nenhum produto encontrado.
                            </span>
                            <Button variant='border' className='w-full'>
                              <Plus />
                              Cadastrar novo produto
                            </Button>
                          </div>
                        )}
                        {products?.map(p => (
                          <span
                            className='block p-1 cursor-pointer'
                            key={p.id}
                            onClick={handleSearchBrand}
                          >
                            {p.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </FormField>
            )}
            {formStep === 1 && (
              <FormField name='brand'>
                <FormLabel>Qual a marca do produto?</FormLabel>
                <Controller
                  name='brand'
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={value => {
                        field.onChange(value)
                        setFormStep(2)
                        setFormData(prev => ({
                          ...prev!,
                          brand: value
                        }))
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Escolha entre as marcas cadastradas' />
                      </SelectTrigger>
                      <SelectContent>
                        {brands?.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                        <SelectItem value='outro'>Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
            )}
            {formStep === 2 && (
              <div className='flex flex-col gap-1'>
                <FormField name='value'>
                  <FormLabel>Preço</FormLabel>
                  <FormControl asChild>
                    <Input
                      icon={Wallet}
                      id='value'
                      {...register('value')}
                      type='number'
                      step='0.01'
                      placeholder='R$ 0000,00'
                    />
                  </FormControl>
                </FormField>
                <FormField name='location'>
                  <FormLabel>Local</FormLabel>
                  <FormControl asChild>
                    <Input
                      icon={MapPin}
                      id='location'
                      {...register('location')}
                      placeholder='Escreva o local da promoção'
                    />
                  </FormControl>
                </FormField>
                <FormField name='date'>
                  <FormLabel>Data</FormLabel>
                  <FormControl asChild>
                    <input
                      type='date'
                      id='date'
                      {...register('date')}
                      className='text-foreground-secondary border p-1 px-2'
                    />
                  </FormControl>
                </FormField>
                <div className='flex gap-2 mt-4'>
                  <ModalClose asChild>
                    <Button
                      variant='border'
                      onClick={() => {
                        reset()
                        setFormStep(0)
                      }}
                      className='flex-1'
                    >
                      Cancelar
                    </Button>
                  </ModalClose>
                  <Button type='submit' className='flex-1'>
                    Cadastrar Promoção
                    <Send />
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </ModalContent>
      </Modal>
      {promotions.length === 0 && <span>Nenhum produto cadastrado.</span>}
      {promotions.length > 0 &&
        promotions.map(product => (
          <Card className='p-2' key={product.id}>
            <CardHeader>
              <CardTitle>
                {product.productVariant.product.name +
                  ' ' +
                  product.productVariant.brand}
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
