import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetMembersResponse = {
  members: {
    id: string
    userId: string
    role: Role
    name: string | null
    email: string
    avatarUrl: string | null
  }[]
}

export async function getMembers(
  organization: string,
): Promise<GetMembersResponse> {
  const result = await api
    .get(`organizations/${organization}/members`, {
      next: {
        tags: [`${organization}/members`],
      },
    })
    .json<GetMembersResponse>()

  return result
}
