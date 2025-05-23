import type { Role } from '@saas/auth'

import { api } from './api-client'

type CreateUserInviteProps = {
  organization: string
  email: string
  role: Role
}

export async function createUserInvite({
  organization,
  email,
  role,
}: CreateUserInviteProps): Promise<void> {
  await api.post(`organizations/${organization}/invites`, {
    json: {
      email,
      role,
    },
  })
}
