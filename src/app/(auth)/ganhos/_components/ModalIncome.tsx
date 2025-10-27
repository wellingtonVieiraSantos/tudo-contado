'use client'
import { Textarea } from '@/components/ui/Textarea'
import { Controller, useForm } from 'react-hook-form'
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
import {
  Send,
  Wallet,
  Briefcase,
  Coins,
  Hammer,
  TrendingUp
} from 'lucide-react'
import { incomeSchema } from '@/validators/formIncome'
import { zodResolver } from '@hookform/resolvers/zod'
import { IncomeProps } from '@/types/income-data-props'
import { useEffect } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToogleGroup'

type ModalIncomeProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: IncomeProps) => Promise<void>
  isPending: boolean
  children?: React.ReactNode
  selectedIncomeUpdate?: IncomeProps
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
  } = useForm<IncomeProps>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      value: undefined,
      description: undefined,
      type: 'ACTIVE',
      date: new Date().toISOString().split('T')[0]
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
        <Form onSubmit={handleSubmit(onSubmit)} className='grid gap-1'>
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
            <FormLabel>Tipo de Renda</FormLabel>
            <Controller
              name='type'
              control={control}
              defaultValue='ACTIVE'
              render={({ field }) => (
                <ToggleGroup
                  type='single'
                  onValueChange={field.onChange}
                  value={field.value}
                  className='grid-cols-2 sm:grid-cols-4'
                >
                  <ToggleGroupItem
                    value='ACTIVE'
                    className='text-[12px] flex-col'
                  >
                    <Briefcase strokeWidth={1.5} size={20} />
                    Ativa
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='PASSIVE'
                    className='text-[12px] flex-col'
                  >
                    <Coins strokeWidth={1.5} size={20} />
                    Passiva
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='EXTRA'
                    className='text-[12px] flex-col'
                  >
                    <Hammer strokeWidth={1.5} size={20} />
                    Extra
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='CAPITAL_GAIN'
                    className='text-[12px] flex-col'
                  >
                    <TrendingUp strokeWidth={1.5} size={20} />
                    Ganho de capital
                  </ToggleGroupItem>
                </ToggleGroup>
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
          <FormSubmit asChild className='w-full mt-5'>
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
