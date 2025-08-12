'use client'

import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

import formatedCurrency from '@/lib/valueFormatter'
import { UserBarSettings } from '@/components/UserBarSettings'
import { useGetExpenses } from './hooks/use-get-expenses'
import { ModalPostExpense } from './components/ModalPostExpenses'
import { Button } from '@/components/ui/Button'
import {
  ArrowDown,
  BanknoteArrowUp,
  BanknoteX,
  Plus,
  Trash,
  TriangleAlert
} from 'lucide-react'
import { FilterExpenses } from './components/FilterExpenses'
import Image from 'next/image'
import { useDelExpense } from './hooks/use-del-expense'
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle
} from '@/components/ui/Modal'

export default function Expense() {
  const {
    filteredExpenses,
    months,
    totals,
    filters,
    updateFilters,
    isLoading
  } = useGetExpenses()

  const {
    handleDeleteExpense,
    isOpen,
    setIsOpen,
    openDeleteModal,
    selectedExpense
  } = useDelExpense()
  return (
    <div className='flex flex-col flex-wrap p-3 gap-2 pb-22'>
      <UserBarSettings title='Despesas' />
      {isLoading && <p>Carregando...</p>}
      {filteredExpenses?.length !== 0 && (
        <div className='grid grid-cols-1 lg:grid-cols-3 place-items-center gap-2'>
          <Card className='w-full max-w-xl p-3'>
            <CardDescription className='text-foreground-secondary'>
              Total de despesas:
            </CardDescription>
            <CardTitle className='text-3xl tracking-wide text-center'>
              {formatedCurrency(totals.total)}
            </CardTitle>
          </Card>
          <Card className='w-full max-w-xl p-3'>
            <CardDescription className='text-foreground-secondary'>
              Despesas à pagar:
            </CardDescription>
            <CardTitle
              className={`text-3xl tracking-wide ${
                totals.notPaid && 'text-destructive'
              } text-center`}
            >
              {formatedCurrency(totals.notPaid)}
            </CardTitle>
          </Card>
          <ModalPostExpense>
            <Button className='w-full max-w-xl lg:w-fit'>
              <Plus />
              Nova despesa
            </Button>
          </ModalPostExpense>
        </div>
      )}
      <FilterExpenses
        months={months}
        filteredExpenses={filteredExpenses}
        filters={filters}
        updateFilters={updateFilters}
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center gap-2'>
        {filteredExpenses?.length !== 0 &&
          filteredExpenses?.map(expense => (
            <Card key={expense.id} className=' w-full py-3'>
              <CardContent className='gap-2'>
                <div className='flex flex-col gap-1'>
                  <p className='text-foreground-secondary'>
                    {expense.description}
                  </p>
                  <p className='text-xl font-montserrat tracking-wide flex items-center gap-2'>
                    <ArrowDown className='text-destructive' />
                    {formatedCurrency(expense.value)}
                  </p>
                </div>
                <div className='absolute top-3 right-3'>
                  <Badge variant={expense.paid ? 'success' : 'error'}>
                    {expense.paid ? 'Pago' : 'À pagar'}
                  </Badge>
                </div>
                <div className='text-sm flex justify-between items-center'>
                  <Button
                    variant='border'
                    onClick={() => openDeleteModal(expense)}
                  >
                    <BanknoteX />
                    Deletar entrada
                  </Button>
                  <p className='text-foreground-secondary'>
                    {format(expense.date, 'dd-MM-yyyy')}
                  </p>
                </div>
              </CardContent>
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
                if (selectedExpense) handleDeleteExpense(selectedExpense.id)
                setIsOpen(false)
              }}
              className='w-full lg:flex-1'
            >
              <Trash />
              Apagar despesa
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
      {filteredExpenses?.length === 0 && (
        <Card className='max-w-3xl w-full m-auto flex p-3 justify-center items-center mt-20 h-1/2'>
          <CardContent className='items-center gap-8'>
            <Image
              src='/empty-wallet.png'
              alt='empty wallet'
              width={128}
              height={128}
              className='size-40 invert-100 brightness-200'
            />
            <CardDescription className='text-center'>
              Nenhuma despesa registrada. Que tal adicionar a primeira?
            </CardDescription>
            <ModalPostExpense>
              <Button variant='border' className='w-full max-w-xl lg:w-fit'>
                <BanknoteArrowUp />
                Cadastre uma nova despesa
              </Button>
            </ModalPostExpense>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
