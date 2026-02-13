'use client'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
  FormSubmitError
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
import { CreditCard, User, Send, DollarSign, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardBrand } from '@prisma/client'
import { cardBrandFormatter } from '@/lib/cardBrandFormatter'
import { usePostCreditCard } from '../_hooks/use-post-creditcard'
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

export const ModalCreditCard = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm<CreditCardProps>({ resolver: zodResolver(creditCardSchema) })

  const { isPending } = usePostCreditCard()
  const { open, type, closeModal } = useCreditCardModalStore()

  const cardBrands = Object.keys(CardBrand) as CardBrand[]

  const onSubmit = (data: CreditCardProps) => {
    console.log(data)
  }
  return (
    <Modal
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) {
          reset()
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

          <div className='text-xl lg:text-base xl:text-xl absolute bottom-16 left-9 font-mono tracking-wider'>
            **** **** **** {watch('lastNumber') || 1234}
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
              {watch('expMonth') || 12} / {watch('expYear') || 2099}
            </span>
          </div>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} className='grid gap-2'>
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
            <div className='flex gap-4'>
              <FormField name='lastNumber' className='flex-auto'>
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
            <FormField name='creditLimit'>
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
          </FormField>
          <h2 className='font-poppins mt-1'>Validade *</h2>
          <div className='flex items-center gap-2 w-fit'>
            <FormField name='expMonth'>
              <Controller
                name='expMonth'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder='mm'
                    className='w-20'
                    onChange={e =>
                      field.onChange(maskOnlyNumbers(e.target.value, 2))
                    }
                  />
                )}
              />
            </FormField>
            <span className='text-xl text-foreground-secondary'>/</span>
            <FormField name='expYear'>
              <Controller
                name='expYear'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder='yyyy'
                    className='w-20'
                    onChange={e =>
                      field.onChange(maskOnlyNumbers(e.target.value, 4))
                    }
                  />
                )}
              />
            </FormField>
          </div>
          <div className='flex flex-col items-start'>
            {errors.expMonth && (
              <FormSubmitError className='text-destructive'>
                {errors.expMonth?.message}
              </FormSubmitError>
            )}
            {errors.expYear && (
              <FormSubmitError className='text-destructive'>
                {errors.expYear?.message}
              </FormSubmitError>
            )}
          </div>

          <FormSubmit asChild>
            <Button
              disabled={isPending}
              className='w-full'
              variant={`${isPending ? 'loading' : 'default'}`}
            >
              {isPending ? 'Cadastrando...' : 'Cadastrar cartão'}
              <Send className={`${isPending && 'hidden'}`} />
            </Button>
          </FormSubmit>
        </Form>
      </ModalContent>
    </Modal>
  )
}
