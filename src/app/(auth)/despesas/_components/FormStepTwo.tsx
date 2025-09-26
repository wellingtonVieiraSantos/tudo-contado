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
import { ArrowLeft, ArrowRight, CreditCard, Plus } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useGetCreditCard } from '../../cartao-credito/_hooks/use-get-creditcards'
import { Stepper } from './Stepper'
import { TabList, Tabs, TabTrigger } from '@/components/ui/Tab'
import { PaymentMethodType } from '@prisma/client'
import Image from 'next/image'
import { Divider } from '@/components/ui/Divider'

type FormStepTwoProps = {
  formData: Partial<expenseType>
  onNext: (data: expenseFormStepTwo) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
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

  const paymentMethodIcon = [
    '/pix.svg',
    '/dinheiro.svg',
    '/card.svg',
    '/debit.svg'
  ]
  const paymentMethod = Object.keys(PaymentMethodType).map((key, i) => ({
    type: key as PaymentMethodType,
    icon: paymentMethodIcon[i]
  }))

  const { data: creditCards } = useGetCreditCard()

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h2 className='py-3 text-center font-poppins'>
        Informações de pagamento
      </h2>
      <Divider />
      <FormField name='paymentMethod' className=''>
        <FormLabel>Forma de pagamento</FormLabel>
        <FormControl asChild>
          <Controller
            name='paymentMethod'
            control={control}
            render={({ field }) => (
              <Tabs value={field.value} onValueChange={field.onChange}>
                <TabList className='w-full flex'>
                  {paymentMethod.map((pay, i) => (
                    <TabTrigger
                      key={i}
                      value={pay.type}
                      className='flex-col sm:flex-row gap-2 sm:gap-3 pt-2 pb-1'
                    >
                      <Image
                        src={pay.icon}
                        alt={pay.type}
                        width={20}
                        height={20}
                        className='invert-80'
                      />
                      {paymentMethodFormatter(pay.type)}
                    </TabTrigger>
                  ))}
                </TabList>
              </Tabs>
            )}
          />
        </FormControl>
      </FormField>
      {watch('paymentMethod') === 'CREDIT_CARD' && creditCards && (
        <>
          <FormField name='creditCardId' className='w-fit'>
            <FormLabel>Número do Cartão *</FormLabel>
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
                    <SelectContent>
                      {creditCards.data.map(creditCard => (
                        <SelectItem key={creditCard.id} value={creditCard.id!}>
                          {'**** **** **** ' + creditCard.lastNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
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
            <FormLabel>Numero de parcelas *</FormLabel>
            <FormControl asChild>
              <Input
                icon={CreditCard}
                id='installments'
                {...register('installments')}
                type='number'
                placeholder='À vista, digite 1'
                className='w-fit'
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
        className='my-8 justify-self-center'
        type='button'
        onClick={() => setStep(99)}
      >
        <Plus />
        Adicionar novo cartão
      </Button>
      <Stepper step={3} />
      <div className='flex gap-3 justify-between mt-3'>
        <Button variant='border' type='button' onClick={() => setStep(2)}>
          <ArrowLeft />
          Anterior
        </Button>
        <FormSubmit asChild type='submit'>
          <Button>
            Proximo
            <ArrowRight />
          </Button>
        </FormSubmit>
      </div>
    </Form>
  )
}
