'use client'
import {
  registerSchema,
  registerUserType
} from '@/modules/user/user.register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'

const fetchNewUser = async (data: registerUserType) => {
  const res = await fetch('api/user', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error)
  }
  return res.json()
}

export const useRegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<registerUserType>({
    resolver: zodResolver(registerSchema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: fetchNewUser,
    onSuccess: async (_, variables) => {
      await signIn('credentials', {
        redirect: true,
        email: variables.email,
        password: variables.password,
        callbackUrl: '/painel'
      })
    },
    onError: async error => {
      setError('root', { message: error.message })
    }
  })

  const onSubmit = (formData: registerUserType) => {
    mutate(formData)
  }

  return { onSubmit, isPending, register, handleSubmit, errors }
}
