/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

export default async function loginAction(_prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    return { success: true, credentials: { email, password } }
  } catch (e: any) {
    if (e.type === 'CredentialsSignin') {
      return { success: false, error: 'Email/Senha está incorreto.' }
    }
    return { success: false, error: 'Ops, ocorreu algum erro!' }
  }
}
