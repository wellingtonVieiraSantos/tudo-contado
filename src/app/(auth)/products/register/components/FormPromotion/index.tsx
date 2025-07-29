'use client'
import { Form } from '@/components/ui/Form'
import { postPromotionAction } from '../../../actions/post-promotion-action'
import { getProductAction } from '../../../actions/get-products-action'
import { getBrandAction } from '../../../actions/get-brands-action'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { productsPostType, productsSchema } from '@/validators/formPromotion'
import { postProductAction } from '../../../actions/post-product-action'
import { postBrandAction } from '../../../actions/post-brand-action'
import FormStepOne from './FormStepOne'
import FormStepTwo from './FormStepTwo'
import FormStepThree from './FormStepThree'

export default function FormPromotion() {
  const [isOpen, setIsOpen] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [products, setProducts] = useState<
    { id: string; name: string }[] | null
  >(null)
  const [brands, setBrands] = useState<{ id: string; name: string }[] | null>(
    null
  )
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState<Partial<productsPostType>>({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<productsPostType>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: '',
      brand: '',
      value: undefined,
      location: '',
      date: undefined
    }
  })

  const onSubmit = async (data: productsPostType) => {
    console.log(data)

    const { success } = await postPromotionAction(data)
    if (success) {
      reset()
      setFormStep(0)
      console.log(data)
    }
  }

  const handleSearchProduct = async (query: string) => {
    if (!query.trim()) {
      setProducts(null)
      setIsOpen(false)
      return
    }

    const { data } = await getProductAction(query)

    setProducts(data || null)
    setIsOpen(true)
  }

  const handlePostProduct = async (query: string) => {
    const { data, success } = await postProductAction(query)
    if (!data) return
    setValue('name', data.name)
    setFormData(prev => ({ ...prev, name: data.name }))
    if (success) setFormStep(1)
  }
  const handlePostBrand = async (query: string) => {
    const { data, success } = await postBrandAction(query)
    if (!data) return
    setValue('brand', data.name)
    setFormData(prev => ({ ...prev, brand: data.name }))
    if (success) setFormStep(2)
  }

  const handleSearchBrand = async (query: string) => {
    if (!query?.trim()) {
      setBrands(null)
      setIsOpen(false)
      return
    }
    const { data } = await getBrandAction(query)

    setBrands(data || null)
    setIsOpen(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const value = e.target.value

    if (timer) clearTimeout(timer)
    const newTimer = setTimeout(() => {
      if (type === 'product') handleSearchProduct(value)
      if (type === 'brand') handleSearchBrand(value)
    }, 500)

    setTimer(newTimer)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {formStep === 0 && (
        <FormStepOne
          products={products}
          handleChange={handleChange}
          handlePostProduct={handlePostProduct}
          isOpen={isOpen}
          register={register}
          setFormData={setFormData}
          setFormStep={setFormStep}
          setIsOpen={setIsOpen}
          setValue={setValue}
        />
      )}
      {formStep === 1 && (
        <FormStepTwo
          brands={brands}
          handleChange={handleChange}
          handlePostBrand={handlePostBrand}
          isOpen={isOpen}
          register={register}
          setFormData={setFormData}
          setFormStep={setFormStep}
          setIsOpen={setIsOpen}
          setValue={setValue}
        />
      )}
      {formStep === 2 && (
        <FormStepThree
          errors={errors}
          formData={formData}
          register={register}
          setFormStep={setFormStep}
          reset={reset}
        />
      )}
    </Form>
  )
}
