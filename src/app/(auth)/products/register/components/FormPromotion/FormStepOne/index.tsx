'use client'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import { FormControl, FormField, FormLabel } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/Popover'
import { Package } from 'lucide-react'
import ModalPostProductBrand from '../ModalPostProductBrand'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { productsPostType } from '@/validators/formPromotion'

type FormStepProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  register: UseFormRegister<productsPostType>
  handleChange: (e: ChangeEvent<HTMLInputElement>, type: string) => void
  products: { id: string; name: string }[] | null
  handlePostProduct: (query: string) => Promise<void>
  setFormData: Dispatch<SetStateAction<Partial<productsPostType>>>
  setFormStep: Dispatch<SetStateAction<number>>
  setValue: UseFormSetValue<productsPostType>
}

export default function FormStepOne({
  isOpen,
  setIsOpen,
  register,
  handleChange,
  products,
  handlePostProduct,
  setFormData,
  setFormStep,
  setValue
}: FormStepProps) {
  return (
    <FormField name='name'>
      <FormLabel>Qual o produto?</FormLabel>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <FormControl asChild>
          <Input
            type='search'
            icon={Package}
            id='name'
            {...register('name')}
            onChange={e => handleChange(e, 'product')}
            autoComplete='off'
            placeholder='Digite o nome do produto'
          />
        </FormControl>
        <PopoverTrigger />
        <PopoverContent
          sideOffset={2}
          onOpenAutoFocus={e => e.preventDefault()}
        >
          {isOpen && (
            <div>
              {products?.length !== 0 && (
                <div className='text-sm text-foreground-secondary grid gap-2'>
                  <p>Você quis dizer?</p>
                  <Divider />
                </div>
              )}
              {products?.length === 0 && (
                <div className='py-3 text-center grid gap-4'>
                  <span className='text-foreground-secondary'>
                    Nenhum produto encontrado.
                  </span>
                  <ModalPostProductBrand
                    label='produto'
                    icon={Package}
                    onSubmit={handlePostProduct}
                  />
                </div>
              )}
              {products?.map(product => (
                <Button
                  className='w-full'
                  variant='ghost'
                  key={product.id}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev!,
                      name: product.name
                    }))
                    setValue('name', product.name)
                    setFormStep(1)
                    setIsOpen(false)
                  }}
                >
                  {product.name}
                </Button>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </FormField>
  )
}
