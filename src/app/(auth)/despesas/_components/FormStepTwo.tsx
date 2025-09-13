'use client'
import { Button } from '@/components/ui/Button'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { paymentMethodFormatter } from '@/lib/paymentMethodFormatter'
import { expenseFormStepTwo, expenseType } from '@/types/expense-data-props'
import { step2Schema } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentMethodType } from '@prisma/client'
import { ArrowLeft, ArrowRight, CreditCard, Plus } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

type FormStepTwoProps = {
  formData: Partial<expenseType>
  onNext: (data: expenseFormStepTwo) => void
  setStep: (data: number) => void
}

export const FormStepTwo = ({
  formData,
  onNext,
  setStep
}: FormStepTwoProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<expenseFormStepTwo>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData
  })

  const paymentMethodWatch = watch('paymentMethod')

  useEffect(() => {
    if (paymentMethodWatch !== 'CREDIT_CARD') {
      setValue('creditCardId', undefined)
      setValue('installments', undefined)
    }
  }, [paymentMethodWatch])

  const paymentMethod = Object.keys(PaymentMethodType) as PaymentMethodType[]

  const onSubmit = (data: expenseFormStepTwo) => {
    onNext(data)
  }

  const creditCards = true

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField name='paymentMethod' className='w-fit'>
        <FormLabel>Forma de pagamento</FormLabel>
        <FormControl asChild>
          <Controller
            name='paymentMethod'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethod.map(value => (
                    <SelectItem value={value} key={value}>
                      {paymentMethodFormatter(value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormControl>
      </FormField>
      {watch('paymentMethod') === 'CREDIT_CARD' && creditCards && (
        <>
          <FormField name='creditCardId' className='w-fit'>
            <FormLabel>Número do Cartão</FormLabel>
            <FormControl asChild>
              <Controller
                name='creditCardId'
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={val =>
                      field.onChange(val === '' ? undefined : val)
                    }
                    value={field.value ?? ''}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Vincule a um cartão cadastrado' />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                  </Select>
                )}
              />
            </FormControl>
            {errors.creditCardId && (
              <FormMessage className='text-destructive'>
                {errors.creditCardId?.message}
              </FormMessage>
            )}
          </FormField>
          <FormField name='installments'>
            <FormLabel>Numero de parcelas</FormLabel>
            <FormControl asChild>
              <Input
                icon={CreditCard}
                id='installments'
                {...register('installments')}
                type='number'
                placeholder='Para compra à vista, digite 1'
              />
            </FormControl>
            {errors.installments && (
              <FormMessage className='text-destructive'>
                {errors.installments?.message}
              </FormMessage>
            )}
          </FormField>
        </>
      )}
      <Button
        className='my-3 justify-self-center'
        type='button'
        onClick={() => setStep(99)}
      >
        <Plus />
        Adicionar novo cartão
      </Button>
      <div className='flex gap-3 justify-between mt-3'>
        <Button variant='border' type='button' onClick={() => setStep(1)}>
          <ArrowLeft />
          Anterior
        </Button>
        <FormSubmit asChild type='submit'>
          <Button disabled={!creditCards}>
            Proximo
            <ArrowRight />
          </Button>
        </FormSubmit>
      </div>
    </Form>
  )
}
