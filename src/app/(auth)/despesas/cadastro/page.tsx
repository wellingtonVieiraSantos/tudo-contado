'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { Stepper } from '../_components/Stepper'
import { useState } from 'react'
import { expenseType } from '@/types/expense-data-props'
import { expenseSchema } from '@/validators/formExpense'
import { FormStepOne } from '../_components/FormStepOne'
import { FormStepTwo } from '../_components/FormStepTwo'
import { FormStepThree } from '../_components/FormStepThree'
import { FormStepFour } from '../_components/FormStepFour'
import { FormPostCreditCard } from '../_components/FormPostCreditCard'
import { usePostExpense } from '../_hooks/use-post-expense'

export default function Cadastro() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<expenseType>>({
    value: undefined,
    description: '',
    type: 'VARIABLE',
    category: 'OTHER',
    paymentMethod: 'PIX',
    creditCardId: undefined,
    installments: undefined,
    date: new Date(),
    dueDate: new Date(),
    status: 'PAID'
  })

  const { onSubmit, isPending } = usePostExpense()

  const handleNextStep = (data: Partial<expenseType>) => {
    setFormData(prev => ({ ...prev, ...data }))
    setStep(prev => prev + 1)
  }

  const handleFinish = (data: Partial<expenseType>) => {
    const result = expenseSchema.safeParse({ ...formData, ...data })
    if (result.success) {
      onSubmit(result.data)
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
    <div className='h-full grid place-items-center'>
      <Card className='w-full lg:w-2xl p-3 pb-22'>
        <CardHeader className='text-center sm:text-left'>
          <CardTitle>Despesas</CardTitle>
          <CardDescription className='text-sm text-foreground-secondary'>
            Cadastre ou atualize seus gastos da forma que desejar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Stepper step={step === 99 ? 2 : step} />
          <Divider className='bg-gradient-to-r via-foreground-secondary' />
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  )
}
