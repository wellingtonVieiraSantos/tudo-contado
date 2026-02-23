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
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle
} from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToogleGroup'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { expenseSchema } from '@/modules/expenses/expenses.schema'
import { ExpenseProps } from '@/modules/expenses/expenses.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryType } from '@prisma/client'
import {
  AlertTriangle,
  BadgeDollarSign,
  Bus,
  Cpu,
  CreditCard,
  CreditCardIcon,
  Cross,
  DollarSign,
  Drama,
  Ellipsis,
  GraduationCap,
  Heart,
  House,
  PawPrint,
  Refrigerator,
  Send,
  Shirt,
  Wallet
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useGetCreditCard } from '../../cartao-credito/_hooks/use-get-creditcards'
import { useExpenseModalStore } from '@/store/modalPostPutStore'
import { maskMoney, unmaskMoney } from '@/lib/maskMoney'
import { usePostExpense } from '../_hooks/use-post-expense'
import { usePutExpense } from '../_hooks/use-put-expense'
import { useEffect } from 'react'
import Link from 'next/link'

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

export const ModalExpense = () => {
  const { data: prevData, open, closeModal, type } = useExpenseModalStore()
  const { handlePostExpense, isPending: isPendingPost } = usePostExpense()
  const { handlePutExpense, isPending: isPendingPut } = usePutExpense()
  const { creditCard } = useGetCreditCard()

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm<ExpenseProps>({
    resolver: zodResolver(expenseSchema)
  })

  useEffect(() => {
    if (open && type === 'PUT' && prevData) {
      reset({
        value: prevData.value,
        description: prevData.description,
        method: prevData.method,
        date: prevData.date,
        category: prevData.category,
        creditCardId: prevData.creditCardId ?? undefined,
        installments: prevData.installments
      })
    } else if (open && type === 'POST') {
      reset({
        value: undefined,
        description: '',
        method: 'DEBIT',
        date: new Date().toISOString().split('T')[0],
        category: 'OTHER',
        creditCardId: undefined,
        installments: undefined
      })
    }
  }, [open, type, prevData, reset])

  const onSubmit = (data: ExpenseProps) => {
    if (type === 'POST') {
      handlePostExpense(data)
      return
    }
    if (type === 'PUT') {
      handlePutExpense({ id: prevData?.id, ...data })
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) {
          reset()
          closeModal()
        }
      }}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            {type === 'POST'
              ? 'Cadastro de Despesas'
              : 'Atualização de Despesas'}
          </ModalTitle>
          <ModalDescription className='text-sm text-foreground-secondary'>
            Formulario para cadastro/atualizações de Despesas
          </ModalDescription>
        </ModalHeader>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className='size-full m-auto grid gap-6'
        >
          <FormField name='value'>
            <FormLabel>Valor *</FormLabel>
            <Controller
              name='value'
              control={control}
              render={({ field }) => (
                <Input
                  icon={Wallet}
                  {...field}
                  placeholder='R$ 0000,00'
                  className=''
                  value={maskMoney(field.value ?? 0)}
                  onChange={e => field.onChange(unmaskMoney(e.target.value))}
                />
              )}
            />
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
          <div className='flex flex-col sm:flex-row gap-3'>
            <FormField name='date' className='flex-1'>
              <FormLabel>Data de compra *</FormLabel>
              <Controller
                name='date'
                control={control}
                render={({ field }) => (
                  <input
                    type='date'
                    className='text-foreground-secondary border p-1 px-2'
                    {...field}
                    value={
                      field.value || new Date().toISOString().split('T')[0]
                    }
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
            <FormField name='category' className='flex-1'>
              <FormLabel>Categoria *</FormLabel>
              <Controller
                name='category'
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Escolha uma categoria' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem
                          key={category.type}
                          value={category.type}
                          className='flex items-center'
                        >
                          <span className='flex flex-row p-1 gap-3 items-center'>
                            <category.icon
                              strokeWidth={1.3}
                              className='size-5'
                            />
                            {categoryFormatter(category.type)}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <FormMessage className='text-destructive'>
                  {errors.category?.message}
                </FormMessage>
              )}
            </FormField>
          </div>
          <FormField name='method'>
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
                    <ToggleGroupItem
                      value='DEBIT'
                      className='flex items-center'
                    >
                      <DollarSign strokeWidth={1.5} size={20} />
                      Débito
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value='CREDIT'
                      className='flex items-center'
                    >
                      <CreditCardIcon strokeWidth={1.5} size={20} />
                      Crédito
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
          {watch('method') === 'CREDIT' && (
            <>
              {creditCard.cards.length > 0 && (
                <div className='flex flex-col sm:flex-row gap-3'>
                  <FormField name='creditCardId' className='flex-1'>
                    <FormLabel>Número do Cartão *</FormLabel>
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
                            {creditCard.cards.map(card => (
                              <SelectItem key={card.id} value={card.id!}>
                                {'**** **** **** ' + card.lastNumber}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.creditCardId && (
                      <FormMessage className='text-destructive'>
                        {errors.creditCardId?.message}
                      </FormMessage>
                    )}
                  </FormField>

                  <FormField name='installments' className='flex-1'>
                    <FormLabel>Número de parcelas *</FormLabel>
                    <FormControl asChild>
                      <Input
                        icon={CreditCard}
                        type='number'
                        placeholder='À vista, digite 1'
                        {...register('installments')}
                      />
                    </FormControl>
                    {errors.installments && (
                      <FormMessage className='text-destructive'>
                        {errors.installments.message}
                      </FormMessage>
                    )}
                  </FormField>
                </div>
              )}

              {creditCard.cards.length === 0 && (
                <p className='text-sm text-foreground-secondary text-center pb-6'>
                  Nenhum cartão encontrado. É necessário cadastrar um cartão.
                </p>
              )}
              <span className='text-sm text-center text-foreground-secondary flex items-center gap-2 justify-center border border-destructive/30 px-4 py-2 rounded-md'>
                <AlertTriangle
                  strokeWidth={1.5}
                  className='size-15 text-destructive'
                />
                Ao clicar no botão abaixo você será redirecionado para a página
                de cadastro de cartões de crédito e perderá o progresso de
                cadastro de despesas.
              </span>
              <Link href='/cartao-credito' onClick={() => closeModal()}>
                <Button
                  type='button'
                  variant='border'
                  className='w-full justify-self-center px-8'
                >
                  <CreditCardIcon />
                  Cadastrar cartão de crédito
                </Button>
              </Link>
            </>
          )}
          <FormSubmit asChild className='w-full mt-5'>
            <Button
              disabled={type === 'POST' ? isPendingPost : isPendingPut}
              variant={
                type === 'POST'
                  ? isPendingPost
                    ? 'loading'
                    : 'default'
                  : isPendingPut
                    ? 'loading'
                    : 'default'
              }
            >
              {type === 'POST'
                ? isPendingPost
                  ? 'Cadastrando...'
                  : 'Cadastrar'
                : isPendingPut
                  ? 'Atualizando...'
                  : 'Atualizar'}
              <Send />
            </Button>
          </FormSubmit>
        </Form>
      </ModalContent>
    </Modal>
  )
}
