'use client'

import { useParams } from 'next/navigation'
import { useGetCreditcardById } from '../_hooks/use-get-creditcard-by-id'
import Loading from '../loading'
import { UserBarSettings } from '@/components/UserBarSettings'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RefreshCw, Trash, TriangleAlert } from 'lucide-react'
import { usePutCreditCard } from '../_hooks/use-put-creditcard'
import valueFormatter from '@/lib/valueFormatter'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Divider } from '@/components/ui/Divider'
import { categories } from '../../despesas/_components/FormStepTwo'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/Badge'
import { categoryFormatter } from '@/lib/categoryFormatter'
import Link from 'next/link'
import CardCreditFrontInfo from '../_components/CardCreditFrontInfo'

export default function CreditCardDetails() {
  const params = useParams()
  const id = params.id as string
  const { data: card, isLoading } = useGetCreditcardById(id)
  const { handleDeactivateCreditCard } = usePutCreditCard()

  if (isLoading || !card) return <Loading />

  const today = new Date().getDate()
  const billingDay = Number(card.billingDay)
  const isUpcoming = billingDay >= today

  return (
    <div className='h-full flex flex-col p-3 gap-2 pb-22 lg:pb-0'>
      <UserBarSettings title='Detalhes do Cartão' />
      <div className='w-full max-w-3xl mx-auto space-y-3'>
        <div className='flex justify-center mb-6'>
          <CardCreditFrontInfo data={card} />
        </div>

        <Card className='flex justify-between'>
          <CardHeader>
            <CardDescription>Cartão ativo</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant='border'
              className='bg-destructive/40'
              onClick={() => handleDeactivateCreditCard(card.id!)}
            >
              Desativar cartão
            </Button>
          </CardFooter>
        </Card>

        <Card className='flex justify-between'>
          <CardHeader>
            <CardDescription>Atualizar os dados?</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant='border' className='bg-info/40'>
              <RefreshCw />
              <span>Atualizar</span>
            </Button>
          </CardFooter>
        </Card>

        {isUpcoming ? (
          <Card>
            <CardHeader className='gap-2'>
              <CardTitle>Próxima fatura</CardTitle>
              <CardDescription className='text-xl text-info font-montserrat'>
                {valueFormatter(card.totalExpenseValue)}
              </CardDescription>
            </CardHeader>
            <CardContent className='px-3 pt-0 flex-row items-center text-sm'>
              <p className='text-sm'>Vence em</p>
              <span className='text-lg'>
                {billingDay}/{new Date().getMonth() + 1}
              </span>
            </CardContent>
          </Card>
        ) : (
          <Card className='bg-destructive/20 border-destructive/80'>
            <CardHeader className='gap-2'>
              <CardTitle>Fatura atrasada</CardTitle>
              <CardDescription className='text-xl text-destructive font-montserrat'>
                {valueFormatter(card.totalExpenseValue)}
              </CardDescription>
            </CardHeader>
            <CardContent className='px-3 pt-0 flex-row items-center text-sm'>
              <p className='text-sm'>Vencida em</p>
              <span className='text-lg'>
                {billingDay}/{new Date().getMonth() + 1}
              </span>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Limite</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar
              className='h-8 rounded-lg'
              rounded='rounded-lg'
              value={(card.totalExpenseValue / card.creditLimit) * 100}
            />
            <div className='flex justify-between items-center'>
              <div className='flex flex-col text-sm'>
                <span className='text-foreground-secondary'>Utilizado</span>
                <span className='text-base'>
                  {valueFormatter(card.totalExpenseValue)}
                </span>
              </div>
              <div className='flex flex-col text-sm text-right'>
                <span className='text-foreground-secondary'>Disponível</span>
                <span className='text-base'>
                  {valueFormatter(card.creditLimit - card.totalExpenseValue)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas transações</CardTitle>
            <CardDescription>
              Resumo das últimas compras feitas com o cartão
            </CardDescription>
            <Divider className='mt-2' />
          </CardHeader>
          <CardContent className='space-y-6'>
            {card.expense.length === 0 && (
              <p className='text-center py-3 text-sm text-foreground-secondary'>
                Nenhuma despesa cadastrada à esse cartão.
              </p>
            )}
            {card.expense.map(exp => {
              const category = categories.find(c => c.type === exp.category)
              const Icon = category?.icon
              return (
                <div key={exp.id} className='grid gap-3 relative'>
                  <p className='text-sm text-foreground-secondary'>
                    {format(new Date(exp.date), "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR
                    })}
                  </p>
                  <div className='flex items-center gap-4 p-2'>
                    <div className='size-25 shrink-0 grid place-items-center rounded-xl bg-hover'>
                      {Icon ? (
                        <Icon
                          className='text-destructive/80'
                          size={50}
                          strokeWidth={1.3}
                        />
                      ) : null}
                    </div>
                    <div className='grid gap-2'>
                      <h2 className='text-xl'>{valueFormatter(exp.value)}</h2>
                      <p className='text-foreground-secondary'>
                        {exp.description}
                      </p>
                      <p className='text-sm text-foreground-secondary'>
                        Parcelas:{' '}
                        <span className='text-base text-foreground font-montserrat'>
                          {exp.installments}x
                        </span>
                      </p>
                    </div>
                    <Badge className='absolute right-2 top-2'>
                      {categoryFormatter(exp.category)}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
