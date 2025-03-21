import { type CookiesFn, getCookie } from 'cookies-next'
import type { KyRequest } from 'ky'

export async function handleSetAuthorization(request: KyRequest) {
  let cookiesStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')

    cookiesStore = serverCookies
  }

  const token = await getCookie('token', { cookies: cookiesStore })

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`)
  }
}
