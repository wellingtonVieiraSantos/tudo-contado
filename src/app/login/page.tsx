import { signIn } from '../../../auth'
import FormLogin from './FormLogin'
import Form from 'next/form'

export default async function Login() {
  return (
    <div className='w-[400px] min-h-[500px] flex flex-col border p-6 gap-10'>
      <h1 className='self-center text-xl font-bold'>Login</h1>
      <FormLogin />
      <span>ou faça login com:</span>
      <Form
        action={async () => {
          'use server'
          await signIn('github', { redirectTo: '/dashboard' })
        }}
      >
        <button type='submit' className='border w-full p-2'>
          Logar com Github
        </button>
      </Form>
    </div>
  )
}
