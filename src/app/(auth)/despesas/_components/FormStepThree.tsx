'use client'
import { Button } from '@/components/ui/Button'
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit
} from '@/components/ui/Form'
import { expenseFormStepThree, expenseType } from '@/types/expense-data-props'
import { step3Schema } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Stepper } from './Stepper'
import { Divider } from '@/components/ui/Divider'

type FormStepThreeProps = {
  formData: Partial<expenseType>
  onNext: (data: expenseFormStepThree) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export const FormStepThree = ({
  formData,
  onNext,
  setStep
}: FormStepThreeProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<expenseFormStepThree>({
    resolver: zodResolver(step3Schema),
    defaultValues: formData
  })

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h2 className='py-3 text-center font-poppins'>Informações de data</h2>
      <Divider />
      <FormField name='expenseDate' className='pt-10'>
        <FormLabel>Data de compra *</FormLabel>
        <Controller
          name='expenseDate'
          control={control}
          render={({ field }) => (
            <input
              type='date'
              className='text-foreground-secondary border p-1 px-2 w-fit'
              {...field}
              value={format(field.value, 'yyyy-MM-dd')}
            />
          )}
        />
        {errors.expenseDate && (
          <FormMessage className='text-destructive'>
            {errors.expenseDate?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='dueDate' className='pb-10'>
        <FormLabel>Data de vencimento</FormLabel>
        <Controller
          name='dueDate'
          control={control}
          render={({ field }) => (
            <input
              type='date'
              className='text-foreground-secondary border p-1 px-2 w-fit'
              {...field}
              value={format(field.value!, 'yyyy-MM-dd')}
            />
          )}
        />
        {errors.dueDate && (
          <FormMessage className='text-destructive'>
            {errors.dueDate?.message}
          </FormMessage>
        )}
      </FormField>
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
