'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import valueFormatter from '@/lib/valueFormatter'
import { dateStringFormatter } from '@/lib/dateStringFormatter'
import { Divider } from '@/components/ui/Divider'
import { Calendar, TrendingDown, TrendingUp } from 'lucide-react'
import { CategoryType, IncomeType, PaymentMethodType } from '@prisma/client'

export default function CardsTransactions({
  recentTransactions
}: {
  recentTransactions: {
    id: string
    value: number
    description: string
    date: string
    type: IncomeType
    category: CategoryType
    method: PaymentMethodType
    transationKind: 'income' | 'expense'
  }[]
}) {
  return (
    <div className='flex flex-col gap-3 lg:hidden order-last'>
      {recentTransactions.map(transaction => (
        <Card className='bg-background rounded' key={transaction.id}>
          <CardHeader>
            <CardTitle>
              <p className='flex items-center gap-3 text-sm text-foreground-secondary mb-3 justify-self-end'>
                <Calendar size={20} strokeWidth={1.1} />
                {dateStringFormatter(transaction.date)}
              </p>
              <span className='flex items-center gap-4 font-poppins'>
                {transaction.transationKind === 'income' ? (
                  <span className='flex items-center gap-3'>
                    <TrendingUp
                      size={35}
                      strokeWidth={1.1}
                      className='text-success'
                    />
                    Entrada de capital
                  </span>
                ) : (
                  <span className='flex items-center gap-3'>
                    <TrendingDown
                      size={35}
                      strokeWidth={1.1}
                      className='text-destructive'
                    />
                    Saída de capital
                  </span>
                )}
              </span>
            </CardTitle>
            <Divider />
            <CardDescription className='text-balance'>
              {transaction.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-xl font-montserrat'>
              {valueFormatter(transaction.value)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
