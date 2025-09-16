'use client'
import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormSubmit
} from '@/components/ui/Form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { expenseFormStepFour, expenseType } from '@/types/expense-data-props'
import { step4Schema } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Send } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

type FormStepFourProps = {
  isPending: boolean
  formData: Partial<expenseType>
  onNext: (data: Partial<expenseType>) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export const FormStepFour = ({
  isPending,
  formData,
  onNext,
  setStep
}: FormStepFourProps) => {
  const { handleSubmit, control } = useForm<expenseFormStepFour>({
    resolver: zodResolver(step4Schema),
    defaultValues: formData
  })

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <FormField name='status' className='w-fit'>
        <FormLabel>Situação</FormLabel>
        <FormControl asChild>
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='PAID'>Pago</SelectItem>
                  <SelectItem value='PENDING'>Pendente</SelectItem>
                  <SelectItem value='OVERDUE'>Atrasado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormControl>
      </FormField>
      <div className='flex gap-3 justify-between mt-3'>
        <Button variant='border' type='button' onClick={() => setStep(3)}>
          <ArrowLeft />
          Anterior
        </Button>
        <FormSubmit asChild>
          <Button
            type='submit'
            disabled={isPending}
            variant={isPending ? 'loading' : 'default'}
          >
            {isPending ? 'Cadastrando...' : 'Cadastrar'}
            <Send />
          </Button>
        </FormSubmit>
      </div>
    </Form>
  )
}
