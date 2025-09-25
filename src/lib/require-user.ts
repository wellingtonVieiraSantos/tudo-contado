import { redirect } from 'next/navigation'
import { auth } from '../../auth'
import { cache } from 'react'

export const requireUser = cache(async () => {
  const session = await auth()
  if (!session?.user) redirect('/login')
  return session.user
})
