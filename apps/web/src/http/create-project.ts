import { api } from './api-client'

type CreateProjectRequest = {
  organizationSlug: string
  name: string
  description: string
}

export async function createProject({
  organizationSlug,
  name,
  description,
}: CreateProjectRequest): Promise<void> {
  await api.post(`organizations/${organizationSlug}/projects`, {
    json: {
      name,
      description,
    },
  })
}
