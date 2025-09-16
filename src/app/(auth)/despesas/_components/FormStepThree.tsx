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
import { expenseFormStepThree, expenseType } from '@/types/expense-data-props'
import { step3Schema } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'

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
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<expenseFormStepThree>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      ...formData,
      date: format(
        formData.date || new Date(),
        'yyyy-MM-dd'
      ) as unknown as Date,
      dueDate: format(
        formData.dueDate || new Date(),
        'yyyy-MM-dd'
      ) as unknown as Date
    }
  })

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <FormField name='date'>
        <FormLabel>Data de compra</FormLabel>
        <FormControl asChild>
          <input
            type='date'
            id='date'
            {...register('date')}
            className='text-foreground-secondary border p-1 px-2'
          />
        </FormControl>
        {errors.date && (
          <FormMessage className='text-destructive'>
            {errors.date?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='dueDate'>
        <FormLabel>Data de vencimento</FormLabel>
        <FormControl asChild>
          <input
            type='date'
            id='dueDate'
            {...register('dueDate')}
            className='text-foreground-secondary border p-1 px-2'
          />
        </FormControl>
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
