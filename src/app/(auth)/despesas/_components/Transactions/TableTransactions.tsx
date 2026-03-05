'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { dateStringFormatter } from '@/lib/dateStringFormatter'
import valueFormatter from '@/lib/valueFormatter'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/Tooltip'
import { ExpenseWithIdProps } from '@/modules/expenses/expenses.types'
import { useModalDelStore } from '@/store/modalDelStore'
import { useExpenseModalStore } from '@/store/modalPostPutStore'
import { usePathname } from 'next/navigation'
import { useExpenseQuery } from '../../_hooks/use-query-expense'
import { RefreshCw, Trash } from 'lucide-react'
import { categories } from '../ModalExpense'
import { paymentMethodFormatter } from '@/lib/paymentMethodFormatter'
import { Button } from '@/components/ui/Button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/Pagination'

export default function TableTransactions({
  expenses
}: {
  expenses: {
    data: ExpenseWithIdProps[]
    meta: {
      totalPages: number
      total_items: number
      page: number
      limit: number
    }
  }
}) {
  const pathname = usePathname()

  const { openModal } = useExpenseModalStore()
  const { setPage } = useExpenseQuery()
  const { openDeleteModal } = useModalDelStore()
  return (
    <div className='hidden lg:flex flex-col gap-3'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Valor</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Data</TableHead>
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
              <TableCell>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{expense.description}</span>
                    </TooltipTrigger>
                    <TooltipContent>{expense.description}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>{dateStringFormatter(expense.date)}</TableCell>
              <TableCell>{categoryFormatter(expense.category)}</TableCell>
              <TableCell>{paymentMethodFormatter(expense.method)}</TableCell>
              <TableCell className='flex gap-3 justify-center m-auto'>
                <Button
                  variant='border'
                  onClick={() =>
                    openDeleteModal({
                      type: 'expense',
                      data: expense
                    })
                  }
                  className='hover:bg-destructive/20 hover:border-destructive'
                >
                  <Trash />
                  <span>Deletar</span>
                </Button>
                <Button
                  variant='border'
                  onClick={() => openModal('PUT', expense)}
                  className='bg-foreground text-background hover:bg-foreground/80'
                >
                  <RefreshCw />
                  <span>Atualizar</span>
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
            href={`${pathname}?page=${expenses.meta.page - 1}`}
          />
          {Array.from({ length: expenses.meta.totalPages }).map((_, index) => (
            <PaginationLink
              key={index}
              href={`${pathname}?page=${index + 1}`}
              isActive={expenses.meta.page === index + 1}
              data-disabled={expenses.meta.page === index + 1 ? '' : undefined}
              onClick={() => {
                setPage(index + 1)
              }}
              className='data-[disabled]:pointer-events-none'
            >
              <PaginationItem>{index + 1}</PaginationItem>
            </PaginationLink>
          ))}
          <PaginationNext
            disabled={expenses.meta.page === expenses.meta.totalPages}
            href={`${pathname}?page=${expenses.meta.page + 1}`}
          />
        </PaginationContent>
      </Pagination>
    </div>
  )
}
