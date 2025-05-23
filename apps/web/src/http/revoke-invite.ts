import { api } from './api-client'

type RevokeInviteRequest = {
  organization: string
  inviteId: string
}

export async function revokeInvite({
  organization,
  inviteId,
}: RevokeInviteRequest): Promise<void> {
  await api.delete(`organizations/${organization}/invites/${inviteId}`)
}
