import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetPendingInvitesResponse = {
  invites: {
    id: string
    role: Role
    email: string
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
    organization: {
      name: string
    }
  }[]
}

export async function getPendingInvites(): Promise<GetPendingInvitesResponse> {
  const result = await api
    .get('pending-invite')
    .json<GetPendingInvitesResponse>()

  return result
}
