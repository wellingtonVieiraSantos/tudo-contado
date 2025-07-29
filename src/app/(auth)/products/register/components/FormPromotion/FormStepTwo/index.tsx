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
import { BadgeCheck } from 'lucide-react'
import ModalPostProductBrand from '../ModalPostProductBrand'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { productsPostType } from '@/validators/formPromotion'

type FormStepProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  register: UseFormRegister<productsPostType>
  handleChange: (e: ChangeEvent<HTMLInputElement>, type: string) => void
  brands: { id: string; name: string }[] | null
  handlePostBrand: (query: string) => Promise<void>
  setFormData: Dispatch<SetStateAction<Partial<productsPostType>>>
  setFormStep: Dispatch<SetStateAction<number>>
  setValue: UseFormSetValue<productsPostType>
}

export default function FormStepTwo({
  isOpen,
  setIsOpen,
  register,
  handleChange,
  brands,
  handlePostBrand,
  setFormData,
  setFormStep,
  setValue
}: FormStepProps) {
  return (
    <FormField name='brand'>
      <FormLabel>Qual a marca do produto?</FormLabel>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <FormControl asChild>
          <Input
            type='search'
            id='brand'
            icon={BadgeCheck}
            {...register('brand')}
            onChange={e => handleChange(e, 'brand')}
            autoComplete='off'
            placeholder='Digite a marca, caso não tenha, click no botão abaixo'
          />
        </FormControl>
        <PopoverTrigger />
        <PopoverContent
          sideOffset={2}
          onOpenAutoFocus={e => e.preventDefault()}
        >
          {isOpen && (
            <div>
              {brands?.length !== 0 && (
                <div className='text-sm text-foreground-secondary grid gap-2'>
                  <p>Você quis dizer?</p>
                  <Divider />
                </div>
              )}
              {brands?.length === 0 && (
                <div className='py-3 text-center grid gap-4'>
                  <span className='text-foreground-secondary'>
                    Nenhuma marca encontrada.
                  </span>
                  <ModalPostProductBrand
                    label='marca'
                    icon={BadgeCheck}
                    onSubmit={handlePostBrand}
                  />
                </div>
              )}
              {brands?.map(brand => (
                <Button
                  className='w-full'
                  variant='ghost'
                  key={brand.id}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev!,
                      brand: brand.name
                    }))
                    setValue('brand', brand.name)
                    setFormStep(2)
                    setIsOpen(false)
                  }}
                >
                  {brand.name}
                </Button>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
      {!isOpen && (
        <Button
          className='w-full'
          onClick={() => {
            setFormData(prev => ({
              ...prev!,
              brand: null
            }))
            setValue('brand', null)
            setFormStep(2)
          }}
        >
          Não tem marca
        </Button>
      )}
    </FormField>
  )
}
