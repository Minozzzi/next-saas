import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { getAbility, getCurrentOrganization } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import { ProjectList } from './project-list'

export default async function ProjectsPage() {
  const permissions = await getAbility()
  const currentOrganization = await getCurrentOrganization()

  if (!currentOrganization) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        {permissions?.can('create', 'Project') && (
          <Button size="sm" asChild>
            <Link
              href={`/organization/${currentOrganization}/create-project`}
              className="flex items-center"
            >
              <PlusIcon className="mr-2 size-4" />
              Create project
            </Link>
          </Button>
        )}
      </div>

      {permissions?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <p className="text-muted-foreground text-sm">
          You are not allowed to see organization projects.
        </p>
      )}
    </div>
  )
}
