'use client'

import { format } from 'date-fns'
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
import { ModalExpense } from './_components/ModalExpenses'
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
import { usePostExpense } from './_hooks/use-post-expense'
import { usePutExpense } from './_hooks/use-put-expense'
import { paymentStatusFormatter } from '@/lib/paymentStatusFormatter'

export default function Expense() {
  const {
    filteredExpenses,
    months,
    totals,
    filters,
    updateFilters,
    isLoading
  } = useGetExpenses()

  /*  const {
    isOpen: isOpenPost,
    setIsOpen: setIsOpenPost,
    onSubmit,
    isPending
  } = usePostExpense() */

  const {
    handleDeleteExpense,
    isOpen,
    setIsOpen,
    openDeleteModal,
    selectedExpense
  } = useDelExpense()

  /*  const {
    isOpen: isOpenPut,
    setIsOpen: setIsOpenPut,
    isPending: isPendingPut,
    openUpdateModal,
    handleUpdateExpense,
    selectedExpense: selectedExpenseUpdate
  } = usePutExpense() */

  if (isLoading) return <Loading />

  return (
    <div className='flex flex-col flex-wrap p-3 gap-3 pb-22'>
      <UserBarSettings title='Despesas' />
      {isLoading && <p>Carregando...</p>}
      {filteredExpenses?.length !== 0 && (
        <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3'>
          <Card className='w-full p-2 lg:bg-none lg:bg-card bg-gradient-to-br from-button to-badge pb-8'>
            <CardHeader>
              <CardTitle className=' flex items-center gap-3'>
                <TrendingDown className='text-destructive' />
                Total de Despesas
              </CardTitle>
              <CardDescription className='hidden lg:flex'>
                Resumo das despesas totais e saldo devedor
              </CardDescription>
              <Divider className='hidden lg:flex' />
            </CardHeader>
            <CardContent className='py-3 flex flex-col gap-4 text-4xl font-montserrat'>
              <p className='text-center'> {formatedCurrency(totals.total)}</p>
              <p className='text-lg'>
                <span className='text-sm font-poppins'>
                  Total ainda à pagar:
                </span>{' '}
                {formatedCurrency(totals.pending)}
              </p>

              <Button
                size='icon'
                className='size-9 bg-white rounded-lg text-background absolute right-2 bottom-2 hover:scale-110 hover:bg-button-foreground'
              >
                <Plus />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      <FilterExpenses
        months={months}
        filteredExpenses={filteredExpenses}
        filters={filters}
        updateFilters={updateFilters}
      />
      <h2>Gastos</h2>
      <p className='text-foreground-secondary text-sm -mt-2'>
        Acompanhamento de gastos detalhadamente
      </p>
      <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3'>
        {filteredExpenses?.length !== 0 &&
          filteredExpenses?.map(expense => (
            <Card key={expense.id} className=' w-full py-3'>
              <CardHeader>
                <CardTitle>{format(expense.date, 'dd-MM-yyyy')}</CardTitle>
                <CardDescription>
                  {categoryFormatter(expense.category)}
                </CardDescription>
                <Divider />
              </CardHeader>
              <CardContent className='gap-2'>
                <div className='flex flex-col gap-1'>
                  <p className='text-xl font-montserrat tracking-wide flex items-center gap-2'>
                    <TrendingDown className='text-destructive' />
                    {formatedCurrency(expense.value)}
                  </p>
                  <p className='text-foreground-secondary'>
                    {expense.description}
                  </p>
                </div>
                <Badge
                  variant={
                    paymentStatusFormatter(expense.status) === 'Pago'
                      ? 'success'
                      : 'error'
                  }
                  className='absolute top-3 right-3 px-4'
                >
                  {paymentStatusFormatter(expense.status) === 'Pago'
                    ? 'Pago'
                    : 'À pagar'}
                </Badge>
              </CardContent>
              <CardFooter>
                <Button
                  variant='border'
                  onClick={() => {
                    openUpdateModal(expense)
                  }}
                  disabled={isOpenPut}
                  className='self-end bg-info/40 px-4'
                >
                  <RefreshCw />
                  <span className='hidden md:inline-block'>Atualizar</span>
                </Button>
                <Button
                  variant='border'
                  onClick={() => openDeleteModal(expense)}
                  className='self-end bg-destructive/40 px-4'
                >
                  <X />
                  <span className='hidden md:inline-block'>Deletar</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>

      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Deseja apagar a despesa?</ModalTitle>
            <ModalDescription className='text-sm text-foreground-secondary'>
              Essa ação apagará permanentemente essa despesa, deseja mesmo fazer
              isso?
            </ModalDescription>
          </ModalHeader>

          <Badge variant='warning' className='justify-self-center gap-4 my-4'>
            <TriangleAlert size={20} />
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
              className='w-full lg:flex-1 bg-destructive hover:bg-destructive/50'
            >
              <Trash />
              Apagar despesa
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
      {filteredExpenses?.length === 0 && (
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

            <Button className='w-full max-w-xl lg:w-fit'>
              <BanknoteArrowUp />
              Cadastre uma nova despesa
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
