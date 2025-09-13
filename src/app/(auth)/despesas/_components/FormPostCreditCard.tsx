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
import { CreditCard, User, Send, DollarSign, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { creditCardSchema } from '@/validators/formCreditCard'
import { creditCardType } from '@/types/creditcard-data-props'
import { CardBrand } from '@prisma/client'
import { cardBrandFormatter } from '@/lib/cardBrandFormatter'

export const FormPostCreditCard = ({
  setStep
}: {
  setStep: (data: number) => void
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<creditCardType>({ resolver: zodResolver(creditCardSchema) })

  const onSubmit = (data: creditCardType) => {
    console.log(data)
  }

  const cardBrands = Object.keys(CardBrand) as CardBrand[]

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField name='lastNumber'>
        <FormLabel>Número</FormLabel>
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
      <FormField name='creditLimit'>
        <FormLabel>Limite</FormLabel>
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
        <FormLabel>Nome</FormLabel>
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
      <FormField name='validity'>
        <FormLabel>Validade</FormLabel>
        <FormControl asChild>
          <input
            type='date'
            id='date'
            {...register('validity')}
            className='text-foreground-secondary border p-1 px-2'
          />
        </FormControl>
        {errors.validity && (
          <FormMessage className='text-destructive'>
            {errors.validity?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='cardBrand' className='w-fit'>
        <FormLabel>Bandeira</FormLabel>
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
      <div className='my-3 flex justify-between'>
        <Button type='button' variant='border' onClick={() => setStep(2)}>
          <X />
          Cancelar
        </Button>
        <FormSubmit asChild>
          <Button>
            Cadastrar cartão
            <Send />
          </Button>
        </FormSubmit>
      </div>
    </Form>
  )
}
