import { defineAbilitiesFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  const cookiesStore = await cookies()
  return !!cookiesStore.get('token')?.value
}

export async function getCurrentOrganization() {
  const cookieStore = await cookies()
  return cookieStore.get('organization')?.value ?? null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrganization()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)

  return membership
}

export async function getAbility() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilitiesFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
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
