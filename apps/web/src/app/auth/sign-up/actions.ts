'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, provide your full name.',
    }),
    email: z.string().email({
      message: 'Please, provide a valid e-mail address.',
    }),
    password: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password confirmation does not match.',
    path: ['passwordConfirmation'],
  })

export async function signUpAction(data: FormData) {
  console.log('data: ', data)
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, email, password } = result.data

  try {
    await signUp({
      name: String(name),
      email: String(email),
      password: String(password),
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
