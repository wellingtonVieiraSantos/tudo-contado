'use client'
import { Card, CardContent } from '@/components/ui/Card'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'
import {
  expenseType,
  expenseWithPaymentsType
} from '@/types/expense-data-props'
import { expenseSchema } from '@/validators/formExpense'
import { FormStepOne } from '../_components/FormStepOne'
import { FormStepTwo } from '../_components/FormStepTwo'
import { FormStepThree } from '../_components/FormStepThree'
import { FormPostCreditCard } from '../../cartao-credito/_components/FormPostCreditCard'
import { useEffect, useState } from 'react'
import { usePutExpense } from '../_hooks/use-put-expense'
import { useGetExpenseById } from '../_hooks/use-get-expense-by-id'
import { useParams } from 'next/navigation'
import { FormStepZero } from '../_components/FormStepZero'
import { FormStepResume } from '../_components/FormStepResume'

export default function Atualização() {
  const { updateId }: { updateId: string } = useParams()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<expenseType>>({})

  const { data } = useGetExpenseById(updateId)
  const { isPending, handleUpdateExpense } = usePutExpense()

  useEffect(() => {
    if (data) {
      const typedData = data as expenseWithPaymentsType
      const payment = typedData.payments?.[0]

      const cleaned = {
        ...typedData,
        paymentMethod: payment?.method ?? 'PIX',
        installments: payment?.installments ?? undefined,
        creditCardId: payment?.creditCard?.id ?? undefined,
        dueDate: typedData.dueDate || new Date()
      }
      setFormData(cleaned)
    }
  }, [data])

  const handleNextStep = (data: Partial<expenseType>) => {
    setFormData(prev => ({ ...prev, ...data }))
    setStep(prev => prev + 1)
  }

  const handleFinish = () => {
    const result = expenseSchema.safeParse(formData)
    if (result.success) {
      handleUpdateExpense(result.data)
    } else {
      console.error('Erro de validação final', result.error)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FormStepZero formData={formData} onNext={handleNextStep} />
      case 2:
        return (
          <FormStepOne
            formData={formData}
            onNext={handleNextStep}
            setStep={setStep}
          />
        )
      case 3:
        return (
          <FormStepTwo
            formData={formData}
            onNext={handleNextStep}
            setStep={setStep}
          />
        )
      case 4:
        return (
          <FormStepThree
            formData={formData}
            onNext={handleNextStep}
            setStep={setStep}
          />
        )

      case 5:
        return (
          <FormStepResume
            formData={formData}
            onNext={handleFinish}
            setStep={setStep}
            isPending={isPending}
          />
        )

      case 99:
        return <FormPostCreditCard setStep={setStep} />
      default:
        return null
    }
  }

  return (
    <div className='min-h-full flex flex-col p-3 gap-3 pb-22 lg:pb-3'>
      <div className='h-10 flex items-center gap-6 text-lg'>
        <Link href='/despesas'>
          <Undo2 size={24} />
        </Link>
        <span>Atualização de despesa</span>
      </div>
      <Card className='w-full m-auto lg:w-3xl'>
        <CardContent className='p-4 w-full'>{renderStep()}</CardContent>
      </Card>
    </div>
  )
}
