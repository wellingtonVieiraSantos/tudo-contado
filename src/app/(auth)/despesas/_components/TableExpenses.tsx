'use client'
import { Card, CardContent, CardDescription } from '@/components/ui/Card'
import {
  PaginationContent,
  PaginationPrev,
  PaginationLink,
  PaginationNext,
  Pagination,
  PaginationItem
} from '@/components/ui/Pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { paymentMethodFormatter } from '@/lib/paymentMethodFormatter'
import Image from 'next/image'
import { ChevronsUpDown, Trash, RefreshCw, BanknoteArrowUp } from 'lucide-react'
import valueFormatter from '@/lib/valueFormatter'
import { Button } from '@/components/ui/Button'
import { usePathname, useSearchParams } from 'next/navigation'
import { ListExpensesQuery } from '@/modules/expenses/expenses.types'
import { useGetExpenses } from '../_hooks/use-get-expenses'
import { useExpenseQuery } from '../_hooks/use-query-expense'
import { useDelExpense } from '../_hooks/use-del-expense'
import { ModalDelete } from '@/components/ModalDelete'
import { useModalDelStore } from '@/store/modalDelStore'
import { categories } from './ModalExpense'
import { useExpenseModalStore } from '@/store/modalPostPutStore'
import { dateStringFormatter } from '@/lib/dateStringFormatter'

export const TableExpenses = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

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
  const { expenses } = useGetExpenses(filters)
  const { openModal } = useExpenseModalStore()
  const { handleDeleteExpense } = useDelExpense()
  const { setPage } = useExpenseQuery()
  const { openDeleteModal } = useModalDelStore()

  return (
    <>
      {expenses.data.length !== 0 && (
        <>
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
              {expenses.data?.map(expense => (
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
                  <TableCell>{valueFormatter(expense.value)}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{dateStringFormatter(expense.date)}</TableCell>
                  <TableCell>{categoryFormatter(expense.category)}</TableCell>
                  <TableCell>
                    {paymentMethodFormatter(expense.method)}
                  </TableCell>
                  <TableCell className='flex gap-3 justify-center'>
                    <Button
                      variant='border'
                      onClick={() =>
                        openDeleteModal({
                          type: 'expense',
                          data: expense
                        })
                      }
                      className='self-end hover:bg-destructive/40 rounded-lg'
                    >
                      <Trash />
                      <span className='hidden md:inline-block'>Deletar</span>
                    </Button>

                    <Button
                      variant='border'
                      onClick={() => openModal('PUT', expense)}
                      className='self-end bg-foreground text-background md:px-4 rounded-lg'
                    >
                      <RefreshCw />
                      <span className='hidden md:inline-block'>Atualizar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationPrev
                disabled={expenses.meta.page === 1}
                href={`${pathname}?page=${filters.page - 1}`}
              />
              {Array.from({ length: expenses.meta.totalPages }).map(
                (_, index) => (
                  <PaginationLink
                    key={index}
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
        </>
      )}
      {expenses.data?.length === 0 && (
        <Card className='max-w-3xl w-full m-auto flex p-3 justify-center items-center xl:mt-10 '>
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
            <Button
              className='w-full max-w-xl'
              onClick={() => openModal('POST', null)}
            >
              <BanknoteArrowUp />
              Cadastre uma nova despesa
            </Button>
          </CardContent>
        </Card>
      )}
      <ModalDelete text='Despesa' handleDelete={handleDeleteExpense} />
    </>
  )
}
