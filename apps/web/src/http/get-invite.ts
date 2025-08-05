import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetInviteResponse = {
  invite: {
    id: string
    role: Role
    email: string
    createdAt: string
    organization: {
      name: string
    }
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }
}

export async function getInvite(id: string): Promise<GetInviteResponse> {
  const result = await api.get(`invites/${id}`).json<GetInviteResponse>()

  return result
}
