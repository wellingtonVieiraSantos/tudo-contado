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

import { Button } from '@/components/ui/Button'

import {
  BanknoteArrowUp,
  Plus,
  RefreshCw,
  Trash,
  TrendingUp,
  TriangleAlert,
  X
} from 'lucide-react'

import formatedCurrency from '@/lib/valueFormatter'
import { UserBarSettings } from '@/components/UserBarSettings'
import { useGetIncomes } from './_hooks/use-get-incomes'
import { ModalIncome } from './_components/ModalIncome'
import { FilterIncomes } from './_components/FilterIncomes'
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

export default function Income() {
  const { isLoading, filteredIncomes, months, totals, filters, updateFilters } =
    useGetIncomes()

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
      {filteredIncomes?.length !== 0 && (
        <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3'>
          <Card className='w-full p-2 lg:bg-none lg:bg-card bg-gradient-to-br from-button to-badge pb-8'>
            <CardHeader>
              <CardTitle className=' flex items-center gap-3'>
                <TrendingUp className='text-success' />
                Total de rendimentos
              </CardTitle>
              <CardDescription className='hidden lg:flex'>
                Somatório de todos os ganhos
              </CardDescription>
              <Divider className='hidden lg:flex' />
            </CardHeader>
            <CardContent className='py-3 text-center text-4xl font-montserrat'>
              {formatedCurrency(totals)}
              <ModalIncome
                isOpen={isOpenPost}
                setIsOpen={setIsOpenPost}
                isPending={isPending}
                onSubmit={onSubmit}
              >
                <Button className='bg-white rounded-lg text-background absolute right-2 bottom-2 hover:scale-105 hover:bg-button-foreground font-poppins'>
                  <Plus />
                  <span className='hidden md:inline-block'>
                    Novo rendimento
                  </span>
                </Button>
              </ModalIncome>
            </CardContent>
          </Card>
        </div>
      )}
      <FilterIncomes
        filters={filters}
        filteredIncomes={filteredIncomes}
        months={months}
        updateFilters={updateFilters}
      />
      <h2>Ganhos</h2>
      <p className='text-foreground-secondary text-sm -mt-2'>
        Acompanhamento de ganhos detalhadamente
      </p>
      <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3'>
        {filteredIncomes?.length !== 0 &&
          filteredIncomes?.map((income, i) => (
            <Card key={i} className=' w-full py-3'>
              <CardHeader>
                <CardTitle>{format(income.date, 'dd-MM-yyyy')}</CardTitle>
                <CardDescription>Entrada de rendimento</CardDescription>
                <Divider />
              </CardHeader>
              <CardContent className='gap-2'>
                <div className='flex flex-col gap-1'>
                  <p className='text-xl font-montserrat tracking-wide flex items-center gap-2'>
                    <TrendingUp className='text-success' />
                    {formatedCurrency(income.value)}
                  </p>
                  <p className='text-foreground-secondary'>
                    {income.description}
                  </p>
                </div>
                <Badge variant='info' className='absolute top-3 right-3 px-4'>
                  {income.type === 'FIXED' ? 'Fixo' : 'Variável'}
                </Badge>
              </CardContent>
              <CardFooter>
                <Button
                  variant='border'
                  onClick={() => openUpdateModal(income)}
                  disabled={isOpenPut}
                  className='self-end bg-info/40 px-4'
                >
                  <RefreshCw />
                  <span className='hidden md:inline-block'>Atualizar</span>
                </Button>
                <Button
                  variant='border'
                  onClick={() => openDeleteModal(income)}
                  className='self-end bg-destructive/40 px-4'
                >
                  <X />
                  <span className='hidden md:inline-block'>Deletar</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
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
            <TriangleAlert size={20} />
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
                if (selectedIncome) handleDeleteIncome(selectedIncome.id)
                setIsOpen(false)
              }}
              className='w-full lg:flex-1 bg-destructive hover:bg-destructive/50'
            >
              <Trash />
              Apagar rendimento
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
      {filteredIncomes?.length === 0 && (
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
