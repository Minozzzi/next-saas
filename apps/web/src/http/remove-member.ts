import { api } from './api-client'

type RemoveMemberRequest = {
  organization: string
  memberId: string
}

export async function removeMember({
  organization,
  memberId,
}: RemoveMemberRequest): Promise<void> {
  await api.delete(`organizations/${organization}/members/${memberId}`)
}
