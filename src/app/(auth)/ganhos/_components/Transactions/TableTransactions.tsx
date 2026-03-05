'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import { dateStringFormatter } from '@/lib/dateStringFormatter'
import valueFormatter from '@/lib/valueFormatter'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/Tooltip'
import { useModalDelStore } from '@/store/modalDelStore'
import { useIncomeModalStore } from '@/store/modalPostPutStore'
import { usePathname } from 'next/navigation'
import { RefreshCw, Trash } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/Pagination'
import { useIncomeQuery } from '../../_hooks/use-query-income'
import { categories } from '../FilterIncomes'
import { IncomeWithIdProps } from '@/modules/incomes/incomes.types'
import { incomeTypeFormatter } from '@/lib/incomeTypeFormatter'

export default function TableTransactions({
  incomes
}: {
  incomes: {
    data: IncomeWithIdProps[]
    meta: {
      totalPages: number
      total_items: number
      page: number
      limit: number
    }
  }
}) {
  const pathname = usePathname()

  const { openModal } = useIncomeModalStore()
  const { setPage } = useIncomeQuery()
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
            <TableHead>Tipo</TableHead>
            <TableHead className='flex justify-center'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.data?.map(income => (
            <TableRow key={income.id}>
              <TableCell>
                {(() => {
                  const category = categories.find(c => c.type === income.type)
                  const Icon = category?.icon
                  return Icon ? (
                    <Icon
                      className='text-success/80'
                      size={35}
                      strokeWidth={1.5}
                    />
                  ) : null
                })()}
              </TableCell>
              <TableCell>{valueFormatter(income.value)}</TableCell>
              <TableCell>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{income.description}</span>
                    </TooltipTrigger>
                    <TooltipContent>{income.description}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>{dateStringFormatter(income.date)}</TableCell>
              <TableCell>{incomeTypeFormatter(income.type)}</TableCell>
              <TableCell className='flex gap-3 justify-center m-auto'>
                <Button
                  variant='border'
                  onClick={() =>
                    openDeleteModal({
                      type: 'income',
                      data: income
                    })
                  }
                  className='hover:bg-destructive/20 hover:border-destructive'
                >
                  <Trash />
                  <span>Deletar</span>
                </Button>
                <Button
                  variant='border'
                  onClick={() => openModal('PUT', income)}
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
            disabled={incomes.meta.page === 1}
            href={`${pathname}?page=${incomes.meta.page - 1}`}
          />
          {Array.from({ length: incomes.meta.totalPages }).map((_, index) => (
            <PaginationLink
              key={index}
              href={`${pathname}?page=${index + 1}`}
              isActive={incomes.meta.page === index + 1}
              data-disabled={incomes.meta.page === index + 1 ? '' : undefined}
              onClick={() => {
                setPage(index + 1)
              }}
              className='data-[disabled]:pointer-events-none'
            >
              <PaginationItem>{index + 1}</PaginationItem>
            </PaginationLink>
          ))}
          <PaginationNext
            disabled={incomes.meta.page === incomes.meta.totalPages}
            href={`${pathname}?page=${incomes.meta.page + 1}`}
          />
        </PaginationContent>
      </Pagination>
    </div>
  )
}
