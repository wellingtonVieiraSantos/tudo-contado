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
import { step3Schema } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  CreditCardIcon,
  DollarSign,
  Plus
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Stepper } from './Stepper'
import { Divider } from '@/components/ui/Divider'
import { PaymentMethodType } from '@prisma/client'
import { ExpenseFormStepThree, ExpenseProps } from '@/types/expense-data-props'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToogleGroup'
import { useEffect } from 'react'
import { useGetCreditCard } from '../../cartao-credito/_hooks/use-get-creditcards'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'

type FormStepThreeProps = {
  formData: Partial<ExpenseProps>
  onNext: (data: ExpenseFormStepThree) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const paymentMethodIcon = ['/card.svg', '/debit.svg']
export const paymentMethod = Object.keys(PaymentMethodType).map((key, i) => ({
  type: key as PaymentMethodType,
  icon: paymentMethodIcon[i]
}))

export const FormStepThree = ({
  formData,
  onNext,
  setStep
}: FormStepThreeProps) => {
  const { data: creditCards } = useGetCreditCard()
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    register,
    formState: { errors }
  } = useForm<ExpenseFormStepThree>({
    resolver: zodResolver(step3Schema),
    defaultValues: formData
  })

  const paymentMethodWatch = watch('method')

  useEffect(() => {
    if (paymentMethodWatch !== 'CREDIT') {
      setValue('creditCardId', undefined)
      setValue('installments', undefined)
    }
  }, [paymentMethodWatch, setValue])

  /* Na atualização nao esta começando com os dados de credito, mesmo sendo credito, verificar... */

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h2 className='py-3 text-center font-poppins'>
        Informações de pagamento
      </h2>
      <Divider />
      <FormField name='method' className='pt-10'>
        <FormLabel>Forma de pagamento*</FormLabel>
        <FormControl asChild>
          <Controller
            name='method'
            control={control}
            defaultValue='DEBIT'
            render={({ field }) => (
              <ToggleGroup
                type='single'
                onValueChange={field.onChange}
                value={field.value}
              >
                <ToggleGroupItem value='DEBIT' className='flex flex-col'>
                  <div className='flex gap-3'>
                    <DollarSign strokeWidth={1.5} />
                    Débito
                  </div>
                  <span className='text-sm text-foreground-secondary'>
                    Pix, dinheiro ou cartão de débito
                  </span>
                </ToggleGroupItem>
                <ToggleGroupItem value='CREDIT' className='flex flex-col'>
                  <div className='flex gap-3'>
                    <CreditCardIcon strokeWidth={1.5} />
                    Crédito
                  </div>
                  <span className='text-sm text-foreground-secondary'>
                    Cartão de crédito
                  </span>
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          />
        </FormControl>
        {errors.method && (
          <FormMessage className='text-destructive'>
            {errors.method?.message}
          </FormMessage>
        )}
      </FormField>
      {watch('method') === 'CREDIT' && creditCards && (
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
        Adicionar cartão de crédito
      </Button>
      <Stepper step={4} />
      <div className='flex gap-3 justify-between mt-3'>
        <Button variant='border' type='button' onClick={() => setStep(3)}>
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
