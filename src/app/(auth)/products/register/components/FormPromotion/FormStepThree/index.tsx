'use client'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { productsPostType } from '@/validators/formPromotion'
import { MapPin, Send, Wallet } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { FieldErrors, UseFormRegister, UseFormReset } from 'react-hook-form'

type FormStepProps = {
  errors: FieldErrors<productsPostType>
  formData: Partial<productsPostType>
  register: UseFormRegister<productsPostType>
  setFormStep: Dispatch<SetStateAction<number>>
  reset: UseFormReset<productsPostType>
}

export default function FormStepThree({
  formData,
  register,
  errors,
  setFormStep,
  reset
}: FormStepProps) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex gap-2 pb-2'>
        {formData?.name && <Badge variant='info'>{formData.name}</Badge>}
        {formData?.brand && <Badge variant='info'>{formData.brand}</Badge>}
      </div>
      <FormField name='value'>
        <FormLabel>Preço</FormLabel>
        <FormControl asChild>
          <Input
            icon={Wallet}
            id='value'
            {...register('value')}
            type='number'
            step='0.01'
            placeholder='R$ 0000,00'
          />
        </FormControl>
        {errors.value && (
          <FormMessage className='text-destructive'>
            {errors.value?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='location'>
        <FormLabel>Local</FormLabel>
        <FormControl asChild>
          <Input
            icon={MapPin}
            id='location'
            {...register('location')}
            placeholder='Escreva o local da promoção'
          />
        </FormControl>
        {errors.location && (
          <FormMessage className='text-destructive'>
            {errors.location?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='date'>
        <FormLabel>Data</FormLabel>
        <FormControl asChild>
          <input
            type='date'
            id='date'
            {...register('date')}
            className='text-foreground-secondary border p-1 px-2 rounded'
          />
        </FormControl>
        {errors.date && (
          <FormMessage className='text-destructive'>
            {errors.date?.message}
          </FormMessage>
        )}
      </FormField>
      <div className='flex flex-col lg:flex-row gap-2 mt-4'>
        <Button
          variant='border'
          onClick={() => {
            reset()
            setFormStep(0)
          }}
          className='lg:flex-1 w-full'
        >
          Cancelar
        </Button>
        <FormSubmit asChild className='lg:flex-1 w-full'>
          <Button>
            Cadastrar Promoção
            <Send />
          </Button>
        </FormSubmit>
      </div>
    </div>
  )
}
