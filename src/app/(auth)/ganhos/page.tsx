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

import { Button } from '@/components/ui/Button'

import {
  BanknoteArrowUp,
  ChevronsUpDown,
  Plus,
  RefreshCw,
  Trash,
  TrendingUp,
  TriangleAlert
} from 'lucide-react'

import formatedCurrency from '@/lib/valueFormatter'
import UserBarSettings from '@/components/UserBarSettings'
import { useGetIncomes } from './_hooks/use-get-incomes'
import { ModalIncome } from './_components/ModalIncome'
import { categories, FilterIncomes } from './_components/FilterIncomes'
import Image from 'next/image'
import { useDelIncome } from './_hooks/use-del-income'
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle
} from '@/components/ui/Modal'
import { Divider } from '@/components/ui/Divider'
import Loading from './loading'
import { usePutIncome } from './_hooks/use-put-income'
import { usePostIncome } from './_hooks/use-post-income'
import { ptBR } from 'date-fns/locale'
import { incomeTypeFormatter } from '@/lib/incomeTypeFormatter'
import { usePathname, useSearchParams } from 'next/navigation'
import { ListIncomeQuery } from '@/modules/incomes/incomes.types'
import { useIncomeQuery } from './_hooks/use-query-income'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/Pagination'
import { useGetIncomeSumByMonth } from '@/hooks/use-get-income-sum'

export default function Income() {
  const searchParams = useSearchParams()

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    month: Number(searchParams.get('month')) || undefined,
    year: Number(searchParams.get('year')) || undefined,
    type: (searchParams.get('type') as ListIncomeQuery['type']) || undefined
  }

  const { incomes, isLoading } = useGetIncomes(filters)
  const { incomeSum } = useGetIncomeSumByMonth()

  const incomeSumActual = incomeSum?.at(-1)?.total ?? null

  const { setPage } = useIncomeQuery()
  const pathname = usePathname()

  const {
    handleDeleteIncome,
    isOpen,
    setIsOpen,
    openDeleteModal,
    selectedIncome
  } = useDelIncome()

  const {
    isOpen: isOpenPost,
    setIsOpen: setIsOpenPost,
    onSubmit,
    isPending
  } = usePostIncome()

  const {
    isOpen: isOpenPut,
    setIsOpen: setIsOpenPut,
    isPending: isPendingPut,
    openUpdateModal,
    handleUpdateIncome,
    selectedIncome: selectedIncomeUpdate
  } = usePutIncome()

  if (isLoading) return <Loading />

  return (
    <div className='flex flex-col flex-wrap p-3 gap-3 pb-22 lg:pb-0'>
      <UserBarSettings title='Renda' />
      <Card className='w-full p-2'>
        <CardHeader>
          <CardTitle className=' flex items-center gap-3'>
            <TrendingUp className='text-success' />
            Total de rendimentos
          </CardTitle>
          <CardDescription>Resumo do total de ganhos do mês</CardDescription>
          <Divider />
        </CardHeader>
        <CardContent className='py-3 flex flex-col text-4xl font-montserrat'>
          <p className='text-center tracking-widest'>
            {formatedCurrency(incomeSumActual)}
          </p>
          <ModalIncome
            isOpen={isOpenPost}
            setIsOpen={setIsOpenPost}
            isPending={isPending}
            onSubmit={onSubmit}
          >
            <Button className='bg-white rounded-lg text-background absolute right-2 top-2 lg:right-6 lg:top-4 hover:scale-105 hover:bg-button-foreground font-poppins'>
              <Plus />
            </Button>
          </ModalIncome>
        </CardContent>
      </Card>
      <FilterIncomes filters={filters} />
      <h2 className='pl-2'>Ganhos</h2>
      <p className='text-foreground-secondary text-sm -mt-2 pl-2 mb-2'>
        Acompanhamento de ganhos detalhadamente
      </p>
      {incomes.data.length !== 0 && (
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
            {incomes.data?.length !== 0 &&
              incomes.data?.map(income => (
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
                  <TableCell>{formatedCurrency(income.value)}</TableCell>
                  <TableCell>{income.description}</TableCell>
                  <TableCell>
                    {format(
                      parse(income.date, 'yyyy-MM-dd', new Date()),
                      'dd-MM-yyyy',
                      { locale: ptBR }
                    )}
                  </TableCell>
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

                    <Link href={`/ganhos/${income.id}`}>
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
      {incomes.data.length !== 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationPrev
              disabled={incomes.meta.page === 1}
              href={`${pathname}?page=${filters.page - 1}`}
            />
            {Array.from({ length: incomes.meta.totalPages }).map((_, index) => (
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
            ))}
            <PaginationNext
              disabled={incomes.meta.page === incomes.meta.totalPages}
              href={`${pathname}?page=${filters.page + 1}`}
            />
          </PaginationContent>
        </Pagination>
      )}
      <ModalIncome
        isOpen={isOpenPut}
        setIsOpen={setIsOpenPut}
        isPending={isPendingPut}
        onSubmit={handleUpdateIncome}
        selectedIncomeUpdate={selectedIncomeUpdate!}
      />
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Deseja apagar o rendimento?</ModalTitle>
            <ModalDescription className='text-sm text-foreground-secondary'>
              Essa ação apagará permanentemente essa renda, deseja mesmo fazer
              isso?
            </ModalDescription>
          </ModalHeader>
          <Badge variant='warning' className='justify-self-center gap-4 my-4'>
            <TriangleAlert size={18} strokeWidth={1.5} />
            {selectedIncome?.description} -{' '}
            {formatedCurrency(selectedIncome?.value || 0)}
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
                if (selectedIncome) handleDeleteIncome(selectedIncome.id!)
                setIsOpen(false)
              }}
              className='w-full lg:flex-1 bg-destructive/70 hover:bg-destructive/40'
            >
              <Trash />
              Apagar rendimento
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
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
            <ModalIncome
              isOpen={isOpenPost}
              setIsOpen={setIsOpenPost}
              isPending={isPending}
              onSubmit={onSubmit}
            >
              <Button className='w-full max-w-xl lg:w-fit'>
                <BanknoteArrowUp />
                Cadastre um novo ganho
              </Button>
            </ModalIncome>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
