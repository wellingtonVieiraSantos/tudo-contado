'use client'
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
import { incomeTypeFormatter } from '@/lib/incomeTypeFormatter'

import { ptBR } from 'date-fns/locale'
import {
  ChevronsUpDown,
  Trash,
  Link,
  RefreshCw,
  BanknoteArrowUp
} from 'lucide-react'
import { categories } from './FilterIncomes'
import { format, parse } from 'date-fns'
import { Button } from '@/components/ui/Button'
import valueFormatter from '@/lib/valueFormatter'
import { usePathname, useSearchParams } from 'next/navigation'
import { useIncomeQuery } from '../_hooks/use-query-income'
import { useGetIncomes } from '../_hooks/use-get-incomes'
import { ListIncomeQuery } from '@/modules/incomes/incomes.types'
import { Card, CardContent, CardDescription } from '@/components/ui/Card'
import Image from 'next/image'
import { useModalDelStore } from '@/store/modalDelStore'
import { useIncomeModalStore } from '@/store/modalPostPutStore'
import { useDelIncome } from '../_hooks/use-del-income'
import { ModalDelete } from '@/components/ModalDelete'
import { dateStringFormatter } from '@/lib/dateStringFormatter'

export const TableIncomes = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    month: Number(searchParams.get('month')) || undefined,
    year: Number(searchParams.get('year')) || undefined,
    type: (searchParams.get('type') as ListIncomeQuery['type']) || undefined
  }

  const { incomes } = useGetIncomes(filters)
  const { handleDeleteIncome } = useDelIncome()
  const { setPage } = useIncomeQuery()
  const { openDeleteModal } = useModalDelStore()
  const { openModal } = useIncomeModalStore()

  return (
    <>
      {incomes.data.length !== 0 && (
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
                <TableHead>Tipo</TableHead>
                <TableHead className='flex justify-center'>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomes.data?.map(income => (
                <TableRow key={income.id}>
                  <TableCell>
                    {(() => {
                      const category = categories.find(
                        c => c.type === income.type
                      )
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
                  <TableCell>{income.description}</TableCell>
                  <TableCell>{dateStringFormatter(income.date)}</TableCell>
                  <TableCell>{incomeTypeFormatter(income.type)}</TableCell>
                  <TableCell className='flex gap-3 justify-center'>
                    <Button
                      variant='border'
                      onClick={() => openDeleteModal(income)}
                      className='self-end hover:bg-destructive/40 rounded-lg'
                    >
                      <Trash />
                      <span className='hidden md:inline-block'>Deletar</span>
                    </Button>
                    <Button
                      variant='border'
                      className='self-end bg-foreground text-background md:px-4 rounded-lg'
                      onClick={() => openModal('PUT', income)}
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
                disabled={incomes.meta.page === 1}
                href={`${pathname}?page=${filters.page - 1}`}
              />
              {Array.from({ length: incomes.meta.totalPages }).map(
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
                disabled={incomes.meta.page === incomes.meta.totalPages}
                href={`${pathname}?page=${filters.page + 1}`}
              />
            </PaginationContent>
          </Pagination>
        </>
      )}
      {incomes.data.length === 0 && (
        <Card className='max-w-3xl w-full m-auto flex p-3 justify-center items-center lg:mt-10'>
          <CardContent className='items-center gap-8'>
            <Image
              src='/empty-wallet.webp'
              alt='mão colocando moeda no porquinho'
              width={128}
              height={128}
              className='size-50 grayscale-100'
            />
            <CardDescription className='text-center'>
              Nenhuma receita ainda. Vamos registrar sua primeira entrada?
            </CardDescription>
            <Button
              className='w-full max-w-xl lg:w-fit'
              onClick={() => openModal('POST', null)}
            >
              <BanknoteArrowUp />
              Cadastre um novo ganho
            </Button>
          </CardContent>
        </Card>
      )}
      <ModalDelete text='Rendimento' handleDelete={handleDeleteIncome} />
    </>
  )
}
