'use client'

import { format, parse } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import formatedCurrency from '@/lib/valueFormatter'
import { UserBarSettings } from '@/components/UserBarSettings'
import { Button } from '@/components/ui/Button'
import {
  BanknoteArrowUp,
  Plus,
  RefreshCw,
  Trash,
  TrendingDown,
  TriangleAlert,
  X
} from 'lucide-react'
import { FilterExpenses } from './_components/FilterExpenses'
import Image from 'next/image'
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle
} from '@/components/ui/Modal'
import { Divider } from '@/components/ui/Divider'
import { categoryFormatter } from '@/lib/categoryFormatter'
import Loading from './loading'
import { useGetExpenses } from './_hooks/use-get-expenses'
import { useDelExpense } from './_hooks/use-del-expense'
import Link from 'next/link'
import { ptBR } from 'date-fns/locale'
import { categories } from './_components/FormStepTwo'
import { paymentMethodFormatter } from '@/lib/paymentMethodFormatter'
import { useSearchParams } from 'next/navigation'
import { ListExpensesQuery } from '@/modules/expenses/expenses.types'
import { useExpenseQuery } from './_hooks/use-query-expense'

export default function Expense() {
  const searchParams = useSearchParams()

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    month: Number(searchParams.get('month')) || undefined,
    year: Number(searchParams.get('year')) || undefined,
    method:
      (searchParams.get('method') as ListExpensesQuery['method']) || undefined,
    category:
      (searchParams.get('category') as ListExpensesQuery['category']) ||
      undefined
  }

  const { expenses, isLoading } = useGetExpenses(filters)

  const { setFilters } = useExpenseQuery()

  const {
    handleDeleteExpense,
    isOpen,
    setIsOpen,
    openDeleteModal,
    selectedExpense
  } = useDelExpense()

  if (isLoading) return <Loading />

  return (
    <div className='flex flex-col flex-wrap p-3 gap-3 pb-22 lg:pb-0'>
      <UserBarSettings title='Despesas' />
      <Card className='w-full p-2'>
        <CardHeader>
          <CardTitle className=' flex items-center gap-3'>
            <TrendingDown className='text-destructive' />
            Total de Despesas
          </CardTitle>
          <CardDescription>Resumo do total de despesas mensal</CardDescription>
          <Divider />
        </CardHeader>
        <CardContent className='py-2 flex flex-col text-4xl font-montserrat'>
          <p className='text-center'> {formatedCurrency(100)}</p>
          <Link href='/despesas/cadastro'>
            <Button className='bg-white rounded-lg text-background absolute right-2 top-2 lg:right-6 lg:top-4 hover:scale-105 hover:bg-button-foreground font-poppins'>
              <Plus />
            </Button>
          </Link>
        </CardContent>
      </Card>
      <div className='flex flex-col md:flex-row gap-3'>
        <FilterExpenses filters={filters} />
        <div className='flex gap-2 text-sm'>
          {filters.method && (
            <div className='border-success flex items-center gap-3 border px-2 md:px-4 rounded'>
              {paymentMethodFormatter(filters.method)}
              <X
                size={18}
                strokeWidth={1.3}
                className='cursor-pointer'
                onClick={() => setFilters({ method: undefined })}
              />
            </div>
          )}
          {filters.category && (
            <div className='border-success flex items-center gap-3 border px-2 md:px-4 rounded'>
              {categoryFormatter(filters.category)}
              <X
                size={18}
                strokeWidth={1.3}
                className='cursor-pointer'
                onClick={() => setFilters({ category: undefined })}
              />
            </div>
          )}
        </div>
      </div>
      <h2>Gastos</h2>
      <p className='text-foreground-secondary text-sm -mt-2'>
        Acompanhamento de gastos detalhadamente
      </p>
      <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3'>
        {expenses.data?.length !== 0 &&
          expenses.data?.map(expense => (
            <Card key={expense.id} className={`w-full py-3 `}>
              <CardHeader>
                <CardTitle>
                  {format(
                    parse(expense.date, 'yyyy-MM-dd', new Date()),
                    "dd 'de' MMMM 'de' yyyy",
                    { locale: ptBR }
                  )}
                </CardTitle>
                <CardDescription>
                  {categoryFormatter(expense.category)}
                </CardDescription>
                <Divider />
              </CardHeader>
              <CardContent className='gap-2'>
                <div className='flex items-center gap-3'>
                  <div className='size-16 md:size-20 shrink-0 grid place-items-center rounded-xl bg-background border border-disabled'>
                    {(() => {
                      const category = categories.find(
                        c => c.type === expense.category
                      )
                      const Icon = category?.icon
                      return Icon ? (
                        <Icon
                          className='text-destructive/80'
                          size={35}
                          strokeWidth={1.5}
                        />
                      ) : null
                    })()}
                  </div>
                  <div className='grid gap-2 w-full'>
                    <p className='text-2xl font-montserrat tracking-wider'>
                      {formatedCurrency(expense.value)}
                    </p>
                    <p className='text-foreground-secondary line-clamp-1'>
                      {expense.description}
                    </p>
                  </div>
                </div>
                <Badge className='absolute top-3 right-3'>
                  {paymentMethodFormatter(expense.method)}
                </Badge>
              </CardContent>
              <CardFooter>
                <Button
                  variant='border'
                  onClick={() => openDeleteModal(expense)}
                  className='self-end hover:bg-destructive/40 rounded-lg'
                >
                  <Trash />
                  <span className='hidden md:inline-block'>Deletar</span>
                </Button>

                <Link href={`/despesas/${expense.id}`}>
                  <Button
                    variant='border'
                    className='self-end bg-foreground text-background md:px-4 rounded-lg'
                  >
                    <RefreshCw />
                    <span className='hidden md:inline-block'>Atualizar</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>

      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Apagar a despesa</ModalTitle>
            <ModalDescription className='text-sm text-foreground-secondary'>
              Essa ação apagará permanentemente essa despesa, deseja mesmo fazer
              isso?
            </ModalDescription>
          </ModalHeader>

          <Badge variant='warning' className='justify-self-center gap-4 my-4'>
            <TriangleAlert size={18} strokeWidth={1.5} />
            {selectedExpense?.description} -{' '}
            {formatedCurrency(selectedExpense?.value || 0)}
          </Badge>
          <ModalActions>
            <Button
              variant='border'
              onClick={() => setIsOpen(false)}
              className='w-full lg:flex-1'
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (selectedExpense) handleDeleteExpense(selectedExpense.id!)
                setIsOpen(false)
              }}
              className='w-full lg:flex-1 bg-destructive/70 hover:bg-destructive/40'
            >
              <Trash />
              Apagar despesa
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
      {expenses.data?.length === 0 && (
        <Card className='max-w-3xl w-full m-auto flex p-3 justify-center items-center lg:mt-10 '>
          <CardContent className='items-center gap-8'>
            <Image
              src='/empty-wallet.webp'
              alt='mao colocando moeda no porquinho'
              width={300}
              height={390}
              className='size-50 grayscale-100'
            />
            <CardDescription className='text-center'>
              Nenhuma despesa registrada. Que tal adicionar a primeira?
            </CardDescription>

            <Link href='/despesas/cadastro'>
              <Button className='w-full max-w-xl lg:w-fit'>
                <BanknoteArrowUp />
                Cadastre uma nova despesa
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
