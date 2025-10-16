'use client'
import { Textarea } from '@/components/ui/Textarea'
import { Controller, useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
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
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Send, Wallet } from 'lucide-react'
import { incomeSchema } from '@/validators/formIncome'
import { zodResolver } from '@hookform/resolvers/zod'
import { incomeType } from '@/types/income-data-props'
import { useEffect } from 'react'
import { format } from 'date-fns'

type ModalIncomeProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: incomeType) => Promise<void>
  isPending: boolean
  children?: React.ReactNode
  selectedIncomeUpdate?: incomeType
}

export const ModalIncome = ({
  isOpen,
  setIsOpen,
  onSubmit,
  isPending,
  selectedIncomeUpdate,
  children
}: ModalIncomeProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<incomeType>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      date: new Date()
    }
  })

  useEffect(() => {
    if (selectedIncomeUpdate) {
      reset({
        value: selectedIncomeUpdate.value,
        description: selectedIncomeUpdate.description,
        type: selectedIncomeUpdate.type,
        date: selectedIncomeUpdate.date
      })
    }
  }, [selectedIncomeUpdate, reset])

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Cadastro de Ganhos</ModalTitle>
          <ModalDescription className='text-sm text-foreground-secondary'>
            Formulario para cadastro/atualizações de ganhos
          </ModalDescription>
        </ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)} className='grid gap-3'>
          <FormField name='value'>
            <FormLabel>Valor</FormLabel>
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
            <FormLabel>Descrição</FormLabel>
            <FormControl asChild>
              <Textarea
                id='description'
                {...register('description')}
                placeholder='Descreva, em poucas palavras, o ganho'
              />
            </FormControl>
            {errors.description && (
              <FormMessage className='text-destructive'>
                {errors.description?.message}
              </FormMessage>
            )}
          </FormField>
          <FormField name='type'>
            <FormLabel>Tipo de ganho</FormLabel>
            <Controller
              name='type'
              control={control}
              defaultValue='VARIABLE'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='FIXED'>Ganho fixo</SelectItem>
                    <SelectItem value='VARIABLE'>Ganho variável</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField name='date'>
            <FormLabel>Data de obtenção</FormLabel>
            <Controller
              name='date'
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
            {errors.date && (
              <FormMessage className='text-destructive'>
                {errors.date?.message}
              </FormMessage>
            )}
          </FormField>
          <FormSubmit
            asChild
            className='w-full lg:w-fit mt-5 lg:justify-self-end'
          >
            <Button
              disabled={isPending}
              variant={isPending ? 'loading' : 'default'}
            >
              {isPending ? 'Cadastrando...' : 'Cadastrar'}
              <Send />
            </Button>
          </FormSubmit>
        </Form>
      </ModalContent>
    </Modal>
  )
}
