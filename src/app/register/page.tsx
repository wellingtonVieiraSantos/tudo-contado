'use client'
import Form from 'next/form'
import registerUserAction from './registerUserAction'
import { useActionState, useEffect } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function RegisterUser() {
  const [state, formAction, isPending] = useActionState(
    registerUserAction,
    null
  )
  useEffect(() => {
    if (state?.success) redirect('/login')
  }, [state])
  return (
    <div className='w-[400px] min-h-[500px] flex flex-col border p-6 gap-10'>
      <h1 className='self-center text-xl font-bold'>Login</h1>
      {state?.error?.email && (
        <div>
          <p>{state.error?.email}</p>
          <Link href='/login'>Faça Login.</Link>
        </div>
      )}
      <Form action={formAction} className='flex flex-col justify-center gap-5'>
        <label htmlFor='name'>Nome</label>
        <input type='text' id='name' name='name' className='border' />
        {state?.error?.formError && (
          <p>{state?.error?.formError.fieldErrors?.name}</p>
        )}
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' className='border' />
        {state?.error?.formError && (
          <p>{state?.error?.formError.fieldErrors?.email}</p>
        )}
        <label htmlFor='password'>Senha</label>
        <input
          type='password'
          id='password'
          name='password'
          className='border'
        />
        {state?.error?.formError && (
          <p>{state?.error?.formError.fieldErrors?.password}</p>
        )}
        <label htmlFor='confirmPassword'>Confirmar Senha</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          className='border'
        />
        {state?.error?.formError && (
          <p>{state?.error?.formError.fieldErrors?.confirmPassword}</p>
        )}
        <button
          type='submit'
          disabled={isPending}
          className='bg-blue-500 p-2 cursor-pointer hover:bg-blue-600'
        >
          {isPending ? 'Aguarde...' : 'Cadastrar'}
        </button>
      </Form>
    </div>
  )
}
