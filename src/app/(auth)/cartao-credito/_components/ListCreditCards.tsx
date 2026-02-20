'use client'
import Image from 'next/image'
import { cardBrand } from '../../painel/_components/CreditCard'
import { useGetCreditCard } from '../_hooks/use-get-creditcards'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/Accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { useGetExpensesByCreditCard } from '../../despesas/_hooks/use-get-expense-by-creditCard'
import { Button } from '@/components/ui/Button'
import { Ban, Edit, RotateCcw, Trash, X } from 'lucide-react'
import valueFormatter from '@/lib/valueFormatter'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { useCreditCardModalStore } from '@/store/modalPostPutStore'
import { useModalDelStore } from '@/store/modalDelStore'
import { ModalDelete } from '@/components/ModalDelete'
import { useDelCreditCard } from '../_hooks/use-del-creditcard'
import { useDeactivateCreditCard } from '../_hooks/use-deactivate-creditcard'
import { useRestoreCreditCard } from '../_hooks/use-restore-creditcard'
import { Divider } from '@/components/ui/Divider'

export const ListCreditCards = () => {
  const { creditCard: CC } = useGetCreditCard()
  const { sumExpenseByCC } = useGetExpensesByCreditCard()
  const { openModal } = useCreditCardModalStore()
  const { openDeleteModal } = useModalDelStore()
  const { handleDeleteCreditCard } = useDelCreditCard()
  const { handleDeactivateCreditCard } = useDeactivateCreditCard()
  const { handleRestoreCreditCard } = useRestoreCreditCard()

  if (!CC) return

  const creditCard = CC.cards.map(card => {
    const spending =
      sumExpenseByCC.find(expense => expense.creditCardId === card.id)?._sum ||
      0
    return {
      ...card,
      spending
    }
  })

  const handleStatusCreditCard = (id: string, isDeleted: Date | null) => {
    if (isDeleted) {
      handleRestoreCreditCard(id)
    } else {
      handleDeactivateCreditCard(id)
    }
  }

  return (
    <Card className='w-full p-2'>
      <CardHeader>
        <CardTitle>Seus cartões de crédito</CardTitle>
        <CardDescription>
          Lista de cartões de crédito cadastrados
        </CardDescription>
        <Divider />
      </CardHeader>
      <CardContent>
        <Accordion type='single' collapsible className='grid gap-1'>
          {creditCard.map(card => (
            <AccordionItem value={card.id!} key={card.id}>
              <AccordionTrigger
                className={`bg-background rounded border ${card.deletedAt ? 'opacity-50 border-destructive' : 'border-button/70'}`}
              >
                <div className='flex items-center gap-4'>
                  <Image
                    src={
                      cardBrand.find(c => c.title === card.cardBrand)?.url ??
                      cardBrand.find(c => c.title === 'OTHER')!.url
                    }
                    alt={
                      cardBrand.find(c => c.title === card.cardBrand)?.title ??
                      cardBrand.find(c => c.title === 'OTHER')!.title
                    }
                    width={512}
                    height={512}
                    className='w-20 h-16 object-contain border p-2 rounded'
                  />
                  <div className='flex flex-col items-start'>
                    <span className='font-medium'>{card.holder}</span>
                    <span className='text-sm text-foreground-secondary'>
                      **** **** **** {card.lastNumber}
                    </span>
                    <span className='text-sm text-foreground-secondary'>
                      {card.expMonth}/{card.expYear}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className='relative bg-background py-3 px-4 border'>
                <div className='w-full'>
                  <ProgressBar
                    className='h-10 rounded-lg mt-8'
                    value={(card.spending / card.creditLimit) * 100}
                  />
                  <div className='flex justify-between items-center pt-1'>
                    <div className='flex flex-col text-sm pl-2'>
                      <span className='text-foreground-secondary'>
                        Utilizado
                      </span>
                      <span className='text-lg'>
                        {valueFormatter(card.spending)}
                      </span>
                    </div>
                    <div className='flex flex-col text-sm pr-2'>
                      <span className='text-foreground-secondary text-right'>
                        Limite
                      </span>
                      <span className='text-lg'>
                        {valueFormatter(card.creditLimit)}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge
                  className='absolute top-2 right-2'
                  variant={card.deletedAt ? 'error' : 'success'}
                >
                  Cartão {card.deletedAt ? 'Inativo' : 'Ativo'}
                </Badge>
                <div className='flex flex-col lg:flex-row gap-2 mt-5'>
                  <Button
                    variant='border'
                    className='w-full lg:w-fit hover:bg-foreground/10'
                    onClick={() => openModal('PUT', card)}
                  >
                    <Edit className='mr-2' />
                    Atualizar
                  </Button>
                  <Button
                    variant='border'
                    className='w-full lg:w-fit border-warning/70 text-warning hover:bg-warning/10 hover:border-warning'
                    onClick={() =>
                      handleStatusCreditCard(card.id, card.deletedAt)
                    }
                  >
                    {card.deletedAt ? (
                      <RotateCcw className='mr-2' />
                    ) : (
                      <Ban className='mr-2' />
                    )}
                    {card.deletedAt ? 'Reativar' : 'Desativar'}
                  </Button>
                  <Button
                    variant='border'
                    className='w-full lg:w-fit lg:ml-auto border-destructive/70 text-destructive hover:bg-destructive/10 hover:border-destructive'
                    onClick={() =>
                      openDeleteModal({ type: 'creditCard', data: card })
                    }
                  >
                    <Trash className='mr-2' />
                    Deletar
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <ModalDelete
        text='Cartão de crédito'
        handleDelete={handleDeleteCreditCard}
      />
    </Card>
  )
}
