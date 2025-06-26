'use client'
import Form from 'next/form'
import loginAction from './loginAction'
import { useActionState, useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function FormLogin() {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  useEffect(() => {
    if (state?.success) redirect('/dashboard')
  }, [state])

  return (
    <>
      {state?.success === false && <p>{state.error}</p>}
      <Form action={formAction} className='flex flex-col justify-center gap-5'>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' className='border' />
        <label htmlFor='password'>Senha</label>
        <input
          type='password'
          id='password'
          name='password'
          className='border'
        />
        <button type='submit' className='bg-blue-500 p-2'>
          {isPending ? 'Logando' : 'Logar'}
        </button>
      </Form>
      <span>ou faça login com:</span>
    </>
  )
}
