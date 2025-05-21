import type { Role } from '@saas/auth'

import { api } from './api-client'

type UpdateMemberRoleRequest = {
  organization: string
  memberId: string
  role: Role
}

export async function updateMemberRole({
  organization,
  memberId,
  role,
}: UpdateMemberRoleRequest): Promise<void> {
  await api.put(`organizations/${organization}/members/${memberId}`, {
    json: {
      role,
    },
  })
}
