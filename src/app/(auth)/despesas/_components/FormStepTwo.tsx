'use client'
import { Button } from '@/components/ui/Button'
import { Form, FormField, FormLabel, FormSubmit } from '@/components/ui/Form'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Bus,
  Cpu,
  Cross,
  Drama,
  Ellipsis,
  GraduationCap,
  Heart,
  House,
  PawPrint,
  Refrigerator,
  Shirt
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useGetCreditCard } from '../../cartao-credito/_hooks/use-get-creditcards'
import { Stepper } from './Stepper'
import { Divider } from '@/components/ui/Divider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToogleGroup'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { CategoryType } from '@prisma/client'
import {
  ExpenseFormStepTwo,
  ExpenseProps
} from '@/modules/expenses/expenses.types'
import { step2Schema } from '@/modules/expenses/expenses.schema'

type FormStepTwoProps = {
  formData: Partial<ExpenseProps>
  onNext: (data: ExpenseFormStepTwo) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const categoryICon = [
  House,
  Refrigerator,
  Bus,
  GraduationCap,
  Cross,
  Shirt,
  Cpu,
  Heart,
  Drama,
  PawPrint,
  BadgeDollarSign,
  Ellipsis
]

export const categories = Object.keys(CategoryType).map((key, i) => ({
  type: key as CategoryType,
  icon: categoryICon[i]
}))

export const FormStepTwo = ({
  formData,
  onNext,
  setStep
}: FormStepTwoProps) => {
  const { handleSubmit, control } = useForm<ExpenseFormStepTwo>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData
  })

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h2 className='py-3 text-center font-poppins'>
        Informações de categoria
      </h2>
      <Divider />
      <FormField name='category'>
        <FormLabel>Categoria *</FormLabel>
        <Controller
          name='category'
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type='single'
              onValueChange={field.onChange}
              value={field.value}
              className='grid-cols-2 sm:grid-cols-4'
            >
              {categories.map(category => (
                <ToggleGroupItem
                  key={category.type}
                  value={category.type}
                  className='text-sm flex-col py-5'
                >
                  <category.icon strokeWidth={1.3} className='size-5' />
                  {categoryFormatter(category.type)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
        />
      </FormField>
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
