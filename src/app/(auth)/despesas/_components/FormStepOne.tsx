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
import { Textarea } from '@/components/ui/Textarea'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Wallet } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Stepper } from './Stepper'
import { Divider } from '@/components/ui/Divider'
import { useEffect } from 'react'
import { step1Schema } from '@/modules/expenses/expenses.schema'
import {
  ExpenseFormStepOne,
  ExpenseProps
} from '@/modules/expenses/expenses.types'

type FormStepOneProps = {
  formData: Partial<ExpenseProps>
  onNext: (data: ExpenseFormStepOne) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export const FormStepOne = ({
  formData,
  onNext,
  setStep
}: FormStepOneProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<ExpenseFormStepOne>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData
  })

  useEffect(() => {
    reset(formData)
  }, [formData, reset])

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h2 className='py-3 text-center font-poppins'>Informações gerais</h2>
      <Divider />
      <FormField name='value'>
        <FormLabel>Valor *</FormLabel>
        <FormControl asChild>
          <Input
            icon={Wallet}
            id='value'
            {...register('value')}
            type='number'
            step='0.01'
            placeholder='R$ 0000,00'
          />
        </FormControl>
        {errors.value && (
          <FormMessage className='text-destructive'>
            {errors.value?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='description'>
        <FormLabel>Descrição *</FormLabel>
        <FormControl asChild>
          <Textarea
            id='description'
            {...register('description')}
            placeholder='Descreva, em poucas palavras, o gasto'
          />
        </FormControl>
        {errors.description && (
          <FormMessage className='text-destructive'>
            {errors.description?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='date'>
        <FormLabel>Data de compra *</FormLabel>
        <Controller
          name='date'
          control={control}
          render={({ field }) => (
            <input
              type='date'
              className='text-foreground-secondary border p-1 px-2 w-fit'
              {...field}
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
            />
          )}
        />
        {errors.date && (
          <FormMessage className='text-destructive'>
            {errors.date?.message}
          </FormMessage>
        )}
      </FormField>
      <Stepper step={2} />
      <div className='flex gap-3 justify-between mt-3'>
        <Button variant='border' type='button' onClick={() => setStep(1)}>
          <ArrowLeft />
          Voltar
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
