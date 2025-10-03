import { checkEmailExists, registerNewUser } from '@/dal/user'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password: rawPassword } = await req.json()

    const emailExists = await checkEmailExists(email)
    if (emailExists)
      return NextResponse.json(
        {
          success: false,
          error: 'Email já está em uso.'
        },
        { status: 409 }
      )

    const password = await bcrypt.hash(rawPassword, 10)

    await registerNewUser(name, email, password)

    return NextResponse.json({ success: true, data: email }, { status: 201 })
  } catch (e) {
    console.error('POST /user', e)
    return NextResponse.json({ error: 'Erro ao criar conta.' }, { status: 500 })
  }
}
