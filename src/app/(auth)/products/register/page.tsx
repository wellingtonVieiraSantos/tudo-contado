'use client'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/Popover'

import { zodResolver } from '@hookform/resolvers/zod'
import { BadgeCheck, MapPin, Package, Plus, Send, Wallet } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import promotionPostAction from '../post-promotion-action'
import productsNameGetAction from '../get-name-action'
import brandNameGetAction from '../get-brand-action'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from '@/components/ui/Modal'

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

export default function RegisterPromotion() {
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState<productsPostType | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [products, setProducts] = useState<
    { id: string; name: string }[] | null
  >(null)
  const [brands, setBrands] = useState<{ id: string; name: string }[] | null>(
    null
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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

  const handleSearchProduct = async (query: string) => {
    if (!query.trim()) {
      setProducts(null)
      setIsOpen(false)
      return
    }
    const { data } = await productsNameGetAction(query)

    setProducts(data)
    setIsOpen(true)
  }

  const handleSearchBrand = async (query: string) => {
    if (!query?.trim()) {
      setBrands(null)
      setIsOpen(false)
      return
    }
    const { data } = await brandNameGetAction(query)

    setBrands(data)
    setIsOpen(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const value = e.target.value

    if (timer) clearTimeout(timer)
    const newTimer = setTimeout(() => {
      if (type === 'product') handleSearchProduct(value)
      if (type === 'brand') handleSearchBrand(value)
    }, 500)

    setTimer(newTimer)
  }

  return (
    <div className='size-full grid place-content-center gap-4 pt-20'>
      <Card className='max-w-5xl px-2 py-6'>
        <CardHeader>
          <CardTitle>Cadastro de Promoções</CardTitle>
          <CardDescription>
            Viu alguma promoção boa? Compartilhe para que outros aproveitem
            também.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formStep === 2 && (
            <div className='flex gap-2'>
              {formData?.name && <Badge variant='info'>{formData.name}</Badge>}
              {formData?.brand && (
                <Badge variant='info'>{formData.brand}</Badge>
              )}
            </div>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            {formStep === 0 && (
              <FormField name='name'>
                <FormLabel>Qual o produto?</FormLabel>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <FormControl asChild>
                    <Input
                      type='search'
                      icon={Package}
                      {...register('name')}
                      onChange={e => handleChange(e, 'product')}
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
                            <Modal>
                              <ModalTrigger asChild>
                                <Button variant='border' className='w-full'>
                                  <Plus />
                                  Cadastrar novo produto
                                </Button>
                              </ModalTrigger>
                              <ModalContent>
                                <ModalHeader>
                                  <ModalTitle className='text-lg'>
                                    Novo produto e marca
                                  </ModalTitle>
                                  <ModalDescription className='text-sm text-foreground-secondary'>
                                    Não encontrou produto cadastrado ainda,
                                    cadastre e continue.
                                  </ModalDescription>
                                </ModalHeader>
                                <Form className='grid gap-2'>
                                  <FormField name='name'>
                                    <FormLabel className='text-sm'>
                                      Qual o nome do PRODUTO?
                                    </FormLabel>
                                    <FormControl asChild>
                                      <Input
                                        {...register('name')}
                                        icon={Package}
                                        placeholder='Digite o nome do produto de maneira clara'
                                      />
                                    </FormControl>
                                    {errors.name && (
                                      <FormMessage className='text-destructive'>
                                        {errors.name?.message}
                                      </FormMessage>
                                    )}
                                  </FormField>
                                  <FormField name='brand'>
                                    <FormLabel className='text-sm'>
                                      Qual o nome da MARCA?
                                    </FormLabel>
                                    <FormControl asChild>
                                      <Input
                                        {...register('brand')}
                                        icon={BadgeCheck}
                                        placeholder='Digite a marca, caso não tenha digite "outra"'
                                      />
                                    </FormControl>
                                    {errors.brand && (
                                      <FormMessage className='text-destructive'>
                                        {errors.brand?.message}
                                      </FormMessage>
                                    )}
                                  </FormField>
                                  <FormSubmit asChild className='w-full mt-4'>
                                    <Button
                                      onClick={() => {
                                        setFormStep(2)
                                      }}
                                    >
                                      Cadastrar produto
                                      <Send />
                                    </Button>
                                  </FormSubmit>
                                </Form>
                              </ModalContent>
                            </Modal>
                          </div>
                        )}
                        {products?.map(product => (
                          <Button
                            className='w-full'
                            variant='ghost'
                            key={product.id}
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev!,
                                name: product.name
                              }))
                              setFormStep(1)
                              setIsOpen(false)
                            }}
                          >
                            {product.name}
                          </Button>
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
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <FormControl asChild>
                    <Input
                      type='search'
                      icon={BadgeCheck}
                      {...register('brand')}
                      onChange={e => handleChange(e, 'brand')}
                      autoComplete='off'
                      placeholder='Digite a marca, caso não tenha digite "outra"'
                    />
                  </FormControl>
                  <PopoverTrigger />
                  <PopoverContent sideOffset={2}>
                    {isOpen && (
                      <div>
                        {brands?.length !== 0 && (
                          <div className='text-sm text-foreground-secondary grid gap-2'>
                            <p>Você quis dizer?</p>
                            <Divider />
                          </div>
                        )}
                        {brands?.length === 0 && (
                          <div className='py-3 text-center grid gap-4'>
                            <span className='text-foreground-secondary'>
                              Nenhuma marca encontrada.
                            </span>
                            <Button variant='border' className='w-full'>
                              <Plus />
                              Cadastrar nova marca
                            </Button>
                          </div>
                        )}
                        {brands?.map(brand => (
                          <Button
                            className='w-full'
                            variant='ghost'
                            key={brand.id}
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev!,
                                brand: brand.name
                              }))
                              setFormStep(2)
                              setIsOpen(false)
                            }}
                          >
                            {brand.name}
                          </Button>
                        ))}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
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
                  <Button type='submit' className='flex-1'>
                    Cadastrar Promoção
                    <Send />
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
