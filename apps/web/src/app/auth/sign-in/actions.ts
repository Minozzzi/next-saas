'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { signinWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.string().email({
    message: 'Please, provide a valid e-mail address',
  }),
  password: z.string().min(1, { message: 'Please, provide your password' }),
})

export async function signInWithEmailAndPasswordAction(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await signinWithPassword({
      email: String(email),
      password: String(password),
    })

    const cookiesStore = await cookies()
    cookiesStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return { success: true, message: null, errors: null }
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    return {
      success: false,
      message: 'Unexpected error. Please, try again in a few minutes.',
      errors: null,
    }
  }
}
