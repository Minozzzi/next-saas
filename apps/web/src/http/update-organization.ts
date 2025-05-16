import { api } from './api-client'

type UpdateOrganizationRequest = {
  organization: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export async function updateOrganization({
  organization,
  name,
  domain,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequest): Promise<void> {
  await api.put(`organizations/${organization}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}
