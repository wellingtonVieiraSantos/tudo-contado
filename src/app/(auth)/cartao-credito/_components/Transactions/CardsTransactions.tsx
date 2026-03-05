'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { useGetCreditCard } from '../../_hooks/use-get-creditcards'
import valueFormatter from '@/lib/valueFormatter'
import { dateStringFormatter } from '@/lib/dateStringFormatter'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { categories } from '@/app/(auth)/despesas/_components/ModalExpense'
import { Divider } from '@/components/ui/Divider'
import { Badge } from '@/components/ui/Badge'
import { Calendar, CreditCard } from 'lucide-react'

export default function CardsTransactions() {
  const { lastCreditTransactions } = useGetCreditCard()

  return (
    <div className='flex flex-col gap-3 lg:hidden'>
      {lastCreditTransactions.map(cct => (
        <Card className='bg-background rounded' key={cct.id}>
          <CardHeader>
            <CardTitle>
              <p className='flex items-center gap-3 text-sm mb-3 text-foreground-secondary justify-self-end'>
                <Calendar size={20} strokeWidth={1.1} />
                {dateStringFormatter(cct.date)}
              </p>
              <span className='flex items-center gap-4 font-poppins'>
                {(() => {
                  const category = categories.find(c => c.type === cct.category)
                  const Icon = category?.icon
                  return Icon ? (
                    <Icon
                      className='text-destructive'
                      size={30}
                      strokeWidth={1.1}
                    />
                  ) : null
                })()}
                {categoryFormatter(cct.category)}
              </span>
            </CardTitle>
            <Divider />
            <CardDescription className='text-balance'>
              {cct.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-xl font-montserrat'>
              {valueFormatter(cct.value)}
            </p>
            <p className='flex items-center gap-3 text-sm py-1 font-mono'>
              <CreditCard strokeWidth={1.1} />
              **** **** **** {cct.lastNumber}
            </p>
            <Badge variant='info' className='ml-auto'>
              {cct.installments}x
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
