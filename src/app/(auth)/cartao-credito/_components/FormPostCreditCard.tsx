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
import { creditCardSchema } from '@/validators/formCreditCard'
import { creditCardType } from '@/types/creditcard-data-props'
import { CardBrand } from '@prisma/client'
import { cardBrandFormatter } from '@/lib/cardBrandFormatter'
import { usePostCreditCard } from '../_hooks/use-post-creditcard'
import { Dispatch, SetStateAction } from 'react'

export const FormPostCreditCard = ({
  setStep
}: {
  setStep: Dispatch<SetStateAction<number>>
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<creditCardType>({ resolver: zodResolver(creditCardSchema) })

  const { isPending, onSubmit } = usePostCreditCard(setStep)

  const cardBrands = Object.keys(CardBrand) as CardBrand[]

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField name='lastNumber'>
        <FormLabel>Número *</FormLabel>
        <FormControl asChild>
          <Input
            icon={CreditCard}
            id='lastNumber'
            {...register('lastNumber')}
            placeholder='Digite os últimos 4 números do cartão'
          />
        </FormControl>
        {errors.lastNumber && (
          <FormMessage className='text-destructive'>
            {errors.lastNumber?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='billingDay'>
        <FormLabel>Vencimento fatura *</FormLabel>
        <FormControl asChild className='w-12'>
          <Input
            id='billingDay'
            {...register('billingDay')}
            placeholder='dd'
            maxLength={2}
            className='p-0 text-center'
          />
        </FormControl>
        {errors.billingDay && (
          <FormMessage className='text-destructive'>
            {errors.billingDay?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='creditLimit'>
        <FormLabel>Limite de crédito *</FormLabel>
        <FormControl asChild>
          <Input
            icon={DollarSign}
            id='creditLimit'
            {...register('creditLimit')}
            type='number'
            step='0.01'
            placeholder='R$ 0000,00'
          />
        </FormControl>
        {errors.creditLimit && (
          <FormMessage className='text-destructive'>
            {errors.creditLimit?.message}
          </FormMessage>
        )}
      </FormField>

      <FormField name='holder'>
        <FormLabel>Nome *</FormLabel>
        <FormControl asChild>
          <Input
            icon={User}
            id='holder'
            {...register('holder')}
            placeholder='Digite o nome no cartão'
          />
        </FormControl>
        {errors.holder && (
          <FormMessage className='text-destructive'>
            {errors.holder?.message}
          </FormMessage>
        )}
      </FormField>
      <h2 className='font-poppins mt-3'>Vencimento do cartão *</h2>
      <div className='flex items-center gap-2 w-fit'>
        <FormField name='expMonth'>
          <FormControl asChild className='w-12'>
            <Input
              id='expMonth'
              {...register('expMonth')}
              className='px-0 text-center'
              placeholder='mm'
              maxLength={2}
            />
          </FormControl>
        </FormField>
        <span className='mt-3 text-xl text-foreground-secondary'>/</span>
        <FormField name='expYear'>
          <FormControl asChild className='w-20'>
            <Input
              id='expYear'
              {...register('expYear')}
              className=' px-0 text-center'
              placeholder='aaaa'
              maxLength={4}
            />
          </FormControl>
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
      <FormField name='cardBrand' className='w-fit'>
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
      <div className='my-3 flex flex-col sm:flex-row gap-2 justify-between'>
        <Button
          type='button'
          variant='border'
          className='w-full'
          onClick={() => setStep(2)}
        >
          <X />
          Cancelar
        </Button>
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
      </div>
    </Form>
  )
}
