'use client'
import { Card, CardContent } from '@/components/ui/Card'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'
import { Stepper } from '../_components/Stepper'
import { Divider } from '@/components/ui/Divider'
import { expenseType } from '@/types/expense-data-props'
import { expenseSchema } from '@/validators/formExpense'
import { FormStepOne } from '../_components/FormStepOne'
import { FormStepTwo } from '../_components/FormStepTwo'
import { FormStepThree } from '../_components/FormStepThree'
import { FormStepFour } from '../_components/FormStepFour'
import { FormPostCreditCard } from '../_components/FormPostCreditCard'
import { useEffect, useState } from 'react'
import { usePutExpense } from '../_hooks/use-put-expense'
import { useGetExpenseById } from '../_hooks/use-get-expense-by-id'
import { useParams } from 'next/navigation'

export default function Atualização() {
  const { updateId }: { updateId: string } = useParams()

  const { isPending, handleUpdateExpense } = usePutExpense()
  const { data } = useGetExpenseById(updateId)

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<expenseType>>({ ...data })

  useEffect(() => {
    if (data) {
      const cleaned = {
        ...data,
        installments: data.installments ?? undefined,
        date: data.date,

        dueDate: data.dueDate || new Date()
      }
      setFormData(cleaned)
    }
  }, [data])

  const handleNextStep = (data: Partial<expenseType>) => {
    setFormData(prev => ({ ...prev, ...data }))
    setStep(prev => prev + 1)
  }

  const handleFinish = (data: Partial<expenseType>) => {
    const result = expenseSchema.safeParse({ ...formData, ...data })
    if (result.success) {
      handleUpdateExpense(result.data)
    } else {
      console.error('Erro de validação final', result.error)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FormStepOne formData={formData} onNext={handleNextStep} />
      case 2:
        return (
          <FormStepTwo
            formData={formData}
            onNext={handleNextStep}
            setStep={setStep}
          />
        )
      case 3:
        return (
          <FormStepThree
            formData={formData}
            onNext={handleNextStep}
            setStep={setStep}
          />
        )
      case 4:
        return (
          <FormStepFour
            isPending={isPending}
            formData={formData}
            onNext={handleFinish}
            setStep={setStep}
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
      <Card className='w-full m-auto lg:w-2xl'>
        <CardContent className='p-4'>
          <Stepper step={step === 99 ? 2 : step} />
          <Divider className='bg-gradient-to-r via-foreground-secondary' />
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  )
}
