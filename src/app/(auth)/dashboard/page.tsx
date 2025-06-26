import { auth, signOut } from '../../../../auth'
import Form from 'next/form'

export default async function Dashboard() {
  const session = await auth()

  return (
    <div>
      Dashboard
      {<p>{'Bem vindo, ' + session?.user?.name}</p>}
      <Form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/login' })
        }}
      >
        <button
          type='submit'
          className='bg-blue-500 p-2 px-4 cursor-pointer hover:bg-blue-700'
        >
          Logout
        </button>
      </Form>
      <div></div>
    </div>
  )
}
