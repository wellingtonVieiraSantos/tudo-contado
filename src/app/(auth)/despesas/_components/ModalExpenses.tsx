'use client'
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
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit
} from '@/components/ui/Form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { CreditCard, Send, Wallet } from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'
import { Controller, useForm } from 'react-hook-form'
import { expenseSchema } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import { expenseType } from '@/types/expense-data-props'
import { useEffect } from 'react'
import { format } from 'date-fns'

type ModalExpenseProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: expenseType) => Promise<void>
  isPending: boolean
  children?: React.ReactNode
  selectedExpenseUpdate?: expenseType
}

export const ModalExpense = ({
  isOpen,
  setIsOpen,
  onSubmit,
  isPending,
  selectedExpenseUpdate,
  children
}: ModalExpenseProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch
  } = useForm<expenseType>({
    resolver: zodResolver(expenseSchema)
  })

  useEffect(() => {
    if (selectedExpenseUpdate) {
      reset({
        value: selectedExpenseUpdate.value,
        description: selectedExpenseUpdate.description,
        type: selectedExpenseUpdate.type,
        category: selectedExpenseUpdate.category,
        paymentMethod: selectedExpenseUpdate.paymentMethod,
        installments: selectedExpenseUpdate.installments,
        creditCardId: selectedExpenseUpdate.creditCardId,
        status: selectedExpenseUpdate.status,
        date: format(
          selectedExpenseUpdate.date,
          'yyyy-MM-dd'
        ) as unknown as Date
      })
      if (selectedExpenseUpdate.dueDate) {
        reset({
          dueDate: format(
            selectedExpenseUpdate.dueDate,
            'yyyy-MM-dd'
          ) as unknown as Date
        })
      }
    }
  }, [selectedExpenseUpdate, reset])

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Despesas</ModalTitle>
          <ModalDescription className='text-sm text-foreground-secondary'>
            Cadastre ou atualize seus gastos da forma que desejar.
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
                placeholder='Descreva, em poucas palavras, o gasto'
              />
            </FormControl>
            {errors.description && (
              <FormMessage className='text-destructive'>
                {errors.description?.message}
              </FormMessage>
            )}
          </FormField>

          <FormField name='type'>
            <FormLabel>Tipo</FormLabel>
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
                    <SelectItem value='FIXED'>Gasto fixo</SelectItem>
                    <SelectItem value='VARIABLE'>Gasto variável</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField name='category'>
            <FormLabel>Categoria</FormLabel>
            <Controller
              name='category'
              control={control}
              defaultValue='OTHER'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='HOUSE'>Moradia</SelectItem>
                    <SelectItem value='FOOD'>Alimentação</SelectItem>
                    <SelectItem value='TRANSPORT'>Transporte</SelectItem>
                    <SelectItem value='EDUCATION'>Educação</SelectItem>
                    <SelectItem value='HEALTH'>Saúde</SelectItem>
                    <SelectItem value='CLOTHING'>Vestuário</SelectItem>
                    <SelectItem value='TECH'>
                      Tecnologia e comunicação
                    </SelectItem>
                    <SelectItem value='PERSONAL_CARE'>
                      Higiene e cuidados pessoais
                    </SelectItem>
                    <SelectItem value='ENTERTAINMENT'>
                      Lazer e entretenimento
                    </SelectItem>
                    <SelectItem value='PETS'>Pets</SelectItem>
                    <SelectItem value='FINANCIAL'>Financeiro</SelectItem>
                    <SelectItem value='OTHER'>Outro</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField name='paymentMethod' className='w-fit'>
            <FormLabel>Forma de pagamento</FormLabel>
            <FormControl asChild>
              <Controller
                name='paymentMethod'
                control={control}
                defaultValue={'PIX'}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='PIX'>Pix</SelectItem>
                      <SelectItem value='MONEY'>Dinheiro</SelectItem>
                      <SelectItem value='CREDIT_CARD'>Crédito</SelectItem>
                      <SelectItem value='DEBIT_CARD'>Débito</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormControl>
          </FormField>
          {watch('paymentMethod') === 'CREDIT_CARD' && (
            <>
              <FormField name='creditCardId' className='w-fit'>
                <FormLabel>Cartão de crédito</FormLabel>
                <FormControl asChild>
                  <Controller
                    name='creditCardId'
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Vincule a um cartão cadastrado' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='PIX'>Pix</SelectItem>
                          <SelectItem value='MONEY'>Dinheiro</SelectItem>
                          <SelectItem value='CREDIT_CARD'>Crédito</SelectItem>
                          <SelectItem value='DEBIT_CARD'>Débito</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormControl>
              </FormField>

              <FormField name='installments'>
                <FormLabel>Numero de parcelas</FormLabel>
                <FormControl asChild>
                  <Input
                    icon={CreditCard}
                    id='installments'
                    {...register('installments')}
                    type='number'
                    min={1}
                    step={1}
                    placeholder='Para compra à vista, digite 1'
                  />
                </FormControl>
                {errors.value && (
                  <FormMessage className='text-destructive'>
                    {errors.value?.message}
                  </FormMessage>
                )}
              </FormField>
            </>
          )}

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

          <FormField name='status' className='w-fit'>
            <FormLabel>Situação</FormLabel>
            <FormControl asChild>
              <Controller
                name='status'
                control={control}
                defaultValue={'PENDING'}
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

          <FormSubmit
            asChild
            className='w-full lg:w-fit mt-2 lg:justify-self-end'
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
