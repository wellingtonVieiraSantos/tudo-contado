'use client'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit
} from '@/components/ui/Form'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/Select'
import { CreditCard, User, Send, DollarSign, Calendar } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardBrand } from '@prisma/client'
import { cardBrandFormatter } from '@/lib/cardBrandFormatter'
import { usePostCreditCard } from '../_hooks/use-post-creditcard'
import { usePutCreditCard } from '../_hooks/use-put-creditcard'
import { CreditCardProps } from '@/modules/creditCard/creditCard.types'
import { creditCardSchema } from '@/modules/creditCard/creditCard.schema'
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle
} from '@/components/ui/Modal'
import { useCreditCardModalStore } from '@/store/modalPostPutStore'
import Image from 'next/image'
import { maskOnlyNumbers } from '@/lib/maskOnlyNumbers'
import { maskMoney, unmaskMoney } from '@/lib/maskMoney'
import { useEffect, useState } from 'react'
import { cardBrand } from '../../painel/_components/CreditCard'

export const ModalCreditCard = () => {
  const [displayValue, setDisplayValue] = useState('')
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CreditCardProps>({
    resolver: zodResolver(creditCardSchema)
  })

  const { isPending: isPendingPost, handlePostCreditCard } = usePostCreditCard()
  const { isPending: isPendingPut, handlePutCreditCard } = usePutCreditCard()
  const { data: prevData, open, type, closeModal } = useCreditCardModalStore()

  const cardBrands = Object.keys(CardBrand) as CardBrand[]

  useEffect(() => {
    if (open && type === 'PUT' && prevData) {
      reset({
        holder: prevData.holder,
        lastNumber: prevData.lastNumber,
        cardBrand: prevData.cardBrand,
        creditLimit: prevData.creditLimit,
        expMonth: prevData.expMonth,
        expYear: prevData.expYear
      })
      setDisplayValue(
        `${prevData.expMonth < 10 ? `0${prevData.expMonth}` : prevData.expMonth}/${
          prevData.expYear - 2000
        }`
      )
    } else if (open && type === 'POST') {
      reset({
        holder: '',
        lastNumber: '',
        cardBrand: 'OTHER',
        creditLimit: 0,
        expMonth: undefined,
        expYear: undefined,
        paymentDay: '5'
      })
    }
  }, [open, type, prevData, reset])

  const onSubmit = (data: CreditCardProps) => {
    if (type === 'POST') {
      handlePostCreditCard(data)
      return
    }
    if (type === 'PUT') {
      handlePutCreditCard(data)
    }
  }
  return (
    <Modal
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) {
          reset()
          setDisplayValue('')
          closeModal()
        }
      }}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            {type === 'POST'
              ? 'Cadastro de Cartão de crédito'
              : 'Atualização de Cartão de crédito'}
          </ModalTitle>
          <ModalDescription className='text-sm text-foreground-secondary'>
            Formulário para cadastro/atualizações de cartão de crédito.
          </ModalDescription>
        </ModalHeader>
        <div
          className={`relative m-auto w-full max-w-max h-45 aspect-video rounded-xl bg-radial from-sky-800 border border-disabled`}
        >
          <Image
            src={'/chip.png'}
            alt='chip cartão de crédito'
            width={512}
            height={512}
            className='w-10 absolute top-9 left-8'
          />
          <Image
            src={
              cardBrand.find(b => b.title === watch('cardBrand'))?.url ??
              cardBrand.find(b => b.title === 'OTHER')!.url
            }
            alt='bandeira do cartão de crédito'
            width={512}
            height={512}
            className='w-16 absolute top-3 right-5'
          />
          <div className='text-xl xl:text-xl absolute bottom-16 left-9 font-mono tracking-wider'>
            **** **** **** {watch('lastNumber') || '****'}
          </div>
          <div className='absolute bottom-3 left-7 flex flex-col'>
            <span className='opacity-70 text-[12px]'>Titular</span>
            <span>
              {watch('holder')?.toUpperCase() || 'John Doe'.toUpperCase()}
            </span>
          </div>
          <div className='absolute bottom-3 right-7 flex flex-col'>
            <span className='opacity-70 text-[12px]'>Expira</span>
            <span>
              {watch('expMonth') < 10
                ? `0${watch('expMonth')}`
                : watch('expMonth') || 12}{' '}
              / {watch('expYear') || 2099}
            </span>
          </div>
        </div>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className='size-full m-auto grid gap-6'
        >
          <FormField name='holder'>
            <FormLabel>Nome *</FormLabel>
            <FormControl asChild>
              <Input
                icon={User}
                id='holder'
                {...register('holder')}
                placeholder='Nome no cartão'
              />
            </FormControl>
            {errors.holder && (
              <FormMessage className='text-destructive'>
                {errors.holder?.message}
              </FormMessage>
            )}
          </FormField>
          <div className='flex flex-col sm:flex-row gap-4'>
            <FormField name='lastNumber' className='flex-1'>
              <FormLabel>Ultimos números *</FormLabel>
              <Controller
                name='lastNumber'
                control={control}
                render={({ field }) => (
                  <Input
                    icon={CreditCard}
                    {...field}
                    placeholder='Últimos 4 dígitos do cartão'
                    className='border'
                    onChange={e =>
                      field.onChange(maskOnlyNumbers(e.target.value, 4))
                    }
                  />
                )}
              />
              {errors.lastNumber && (
                <FormMessage className='text-destructive'>
                  {errors.lastNumber?.message}
                </FormMessage>
              )}
            </FormField>
            <FormField name='cardBrand' className='flex-1'>
              <FormLabel>Bandeira *</FormLabel>
              <FormControl asChild>
                <Controller
                  name='cardBrand'
                  control={control}
                  defaultValue='OTHER'
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Escolha a bandeira do cartão' />
                      </SelectTrigger>
                      <SelectContent>
                        {cardBrands.map(brand => (
                          <SelectItem key={brand} value={brand}>
                            {cardBrandFormatter(brand)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              {errors.cardBrand && (
                <FormMessage className='text-destructive'>
                  {errors.cardBrand?.message}
                </FormMessage>
              )}
            </FormField>
          </div>
          <div className='flex flex-col sm:flex-row gap-4'>
            <FormField name='creditLimit' className='flex-1'>
              <FormLabel>Limite de crédito *</FormLabel>
              <Controller
                name='creditLimit'
                control={control}
                render={({ field }) => (
                  <Input
                    icon={DollarSign}
                    {...field}
                    placeholder='R$ 0000,00'
                    className=''
                    value={maskMoney(field.value ?? 0)}
                    onChange={e => field.onChange(unmaskMoney(e.target.value))}
                  />
                )}
              />
              {errors.creditLimit && (
                <FormMessage className='text-destructive'>
                  {errors.creditLimit?.message}
                </FormMessage>
              )}
            </FormField>

            <FormField name='expYear' className='flex-1'>
              <FormLabel>Validade *</FormLabel>
              <Controller
                control={control}
                name='expMonth'
                render={() => (
                  <Input
                    icon={Calendar}
                    placeholder='MM/YY'
                    maxLength={5}
                    value={displayValue}
                    onChange={e => {
                      const raw = e.target.value.replace(/\D/g, '').slice(0, 4)

                      const formatted =
                        raw.length > 2
                          ? `${raw.slice(0, 2)}/${raw.slice(2)}`
                          : raw

                      setDisplayValue(formatted)

                      if (raw.length >= 2) {
                        setValue('expMonth', Number(raw.slice(0, 2)))
                      } else {
                        setValue('expMonth', 0)
                      }

                      if (raw.length === 4) {
                        setValue('expYear', Number(`20${raw.slice(2)}`))
                      } else {
                        setValue('expYear', 0)
                      }
                    }}
                  />
                )}
              />
              {errors.expMonth && (
                <p className='text-red-500 text-sm'>
                  {errors.expMonth.message}
                </p>
              )}

              {errors.expYear && (
                <p className='text-red-500 text-sm'>{errors.expYear.message}</p>
              )}
            </FormField>
          </div>
          <FormSubmit asChild className='w-full mt-5'>
            <Button
              disabled={type === 'POST' ? isPendingPost : isPendingPut}
              variant={
                type === 'POST'
                  ? isPendingPost
                    ? 'loading'
                    : 'default'
                  : isPendingPut
                    ? 'loading'
                    : 'default'
              }
            >
              {type === 'POST'
                ? isPendingPost
                  ? 'Cadastrando...'
                  : 'Cadastrar'
                : isPendingPut
                  ? 'Atualizando...'
                  : 'Atualizar'}
              <Send />
            </Button>
          </FormSubmit>
        </Form>
      </ModalContent>
    </Modal>
  )
}
