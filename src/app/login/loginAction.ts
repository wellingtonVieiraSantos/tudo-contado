/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { signIn } from '../../../auth'

export default async function loginAction(_prevState: any, formData: FormData) {
  try {
    await signIn('credentials', {
      email: formData.get('email') || '',
      password: formData.get('password') || '',
      redirect: false
    })
    return { success: true }
  } catch (e: any) {
    if (e.type === 'CredentialsSignin') {
      return { success: false, error: 'Email/Senha está incorreto.' }
    }
    return { success: false, error: 'Ops, ocorreu algum erro!' }
  }
}
