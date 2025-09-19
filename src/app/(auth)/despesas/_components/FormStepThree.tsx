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
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

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
      <FormField name='date'>
        <FormLabel>Data de compra *</FormLabel>
        <Controller
          name='date'
          control={control}
          render={({ field }) => (
            <input
              type='date'
              className='text-foreground-secondary border p-1 px-2'
              {...field}
              value={format(field.value, 'yyyy-MM-dd')}
            />
          )}
        />
        {errors.date && (
          <FormMessage className='text-destructive'>
            {errors.date?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='dueDate'>
        <FormLabel>Data de vencimento</FormLabel>
        <Controller
          name='dueDate'
          control={control}
          render={({ field }) => (
            <input
              type='date'
              className='text-foreground-secondary border p-1 px-2'
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
      <div className='flex gap-3 justify-between mt-3'>
        <Button variant='border' type='button' onClick={() => setStep(2)}>
          <ArrowLeft />
          Anterior
        </Button>
        <FormSubmit asChild type='submit'>
          <Button type='submit'>
            Proximo
            <ArrowRight />
          </Button>
        </FormSubmit>
      </div>
    </Form>
  )
}
