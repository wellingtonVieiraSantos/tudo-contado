'use client'

import { format, parse } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import formatedCurrency from '@/lib/valueFormatter'
import { UserBarSettings } from '@/components/UserBarSettings'
import { Button } from '@/components/ui/Button'
import {
  BanknoteArrowUp,
  ChevronsUpDown,
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
import { usePathname, useSearchParams } from 'next/navigation'
import { ListExpensesQuery } from '@/modules/expenses/expenses.types'
import { useExpenseQuery } from './_hooks/use-query-expense'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import {
  Pagination,
  PaginationContent,
  PaginationElipse,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/Pagination'

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

  const { setPage } = useExpenseQuery()
  const pathname = usePathname()

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
      <FilterExpenses filters={filters} />
      <h2 className='pl-2'>Gastos</h2>
      <p className='text-foreground-secondary text-sm -mt-2 pl-2 mb-2'>
        Acompanhamento de gastos detalhadamente
      </p>
      {expenses.data.length !== 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead className='flex items-center gap-2'>
                Valor <ChevronsUpDown size={20} strokeWidth={1.3} />
              </TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className='flex items-center gap-2'>
                Data <ChevronsUpDown size={20} strokeWidth={1.3} />
              </TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead className='flex justify-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.data?.length !== 0 &&
              expenses.data?.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{formatedCurrency(expense.value)}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    {format(
                      parse(expense.date, 'yyyy-MM-dd', new Date()),
                      'dd-MM-yyyy',
                      { locale: ptBR }
                    )}
                  </TableCell>
                  <TableCell>{categoryFormatter(expense.category)}</TableCell>
                  <TableCell>
                    {paymentMethodFormatter(expense.method)}
                  </TableCell>
                  <TableCell className='flex gap-3 justify-center'>
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
                        <span className='hidden md:inline-block'>
                          Atualizar
                        </span>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      {expenses.data.length !== 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationPrev
              disabled={expenses.meta.page === 1}
              href={`${pathname}?page=${filters.page - 1}`}
            />
            {Array.from({ length: expenses.meta.totalPages }).map(
              (_, index) => (
                <PaginationLink
                  href={`${pathname}?page=${index + 1}`}
                  isActive={filters.page === index + 1}
                  data-disabled={filters.page === index + 1 ? '' : undefined}
                  onClick={() => {
                    setPage(index + 1)
                  }}
                  className='data-[disabled]:pointer-events-none'
                >
                  <PaginationItem>{index + 1}</PaginationItem>
                </PaginationLink>
              )
            )}
            <PaginationNext
              disabled={expenses.meta.page === expenses.meta.totalPages}
              href={`${pathname}?page=${filters.page + 1}`}
            />
          </PaginationContent>
        </Pagination>
      )}
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
