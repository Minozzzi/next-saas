import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  const cookiesStore = await cookies()
  return !!cookiesStore.get('token')?.value
}

export async function auth() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  const { user } = await getProfile()

  if (user) {
    return { user }
  }

  redirect('/api/auth/sign-out')
}
