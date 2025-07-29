import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import FormPromotion from './components/FormPromotion'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export default function RegisterPromotion() {
  return (
    <div className='size-full grid place-content-center p-1'>
      <Button
        size='icon'
        variant='ghost'
        className='absolute hover:bg-transparent inset-2 [&>svg]:size-8 lg:hidden'
      >
        <ArrowLeft />
      </Button>
      <Card className='w-full max-w-5xl px-2 py-6'>
        <CardHeader>
          <CardTitle>Cadastro de Promoções</CardTitle>
          <CardDescription>
            Viu alguma promoção boa? Compartilhe para que outros aproveitem
            também.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormPromotion />
        </CardContent>
      </Card>
    </div>
  )
}
