import { api } from './api-client'

type ShutdownOrganizationRequest = {
  organization: string
}

export async function shutdownOrganization({
  organization,
}: ShutdownOrganizationRequest): Promise<void> {
  await api.delete(`organizations/${organization}`)
}
