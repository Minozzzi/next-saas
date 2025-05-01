import { api } from './api-client'

type GetProjectsResponse = {
  projects: {
    id: string
    name: string
    description: string
    slug: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    createdAt: string
    owner: {
      id: string
      name: string
      avatarUrl: string | null
    }
  }[]
}

export async function getProjects(org: string): Promise<GetProjectsResponse> {
  const result = await api
    .get(`organizations/${org}/projects`)
    .json<GetProjectsResponse>()

  return result
}
