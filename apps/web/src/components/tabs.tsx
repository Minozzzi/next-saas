import { getAbility, getCurrentOrganization } from '@/auth/auth'

import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function Tabs() {
  const currentOrganization = await getCurrentOrganization()

  const permissions = await getAbility()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')

  const canGetMembers = permissions?.can('get', 'User')
  const canGetProjects = permissions?.can('get', 'Project')

  return (
    <div className="border-b py-4">
      <nav className="mt-auto flex max-w-[1200px] items-center gap-2">
        {canGetProjects && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
          >
            <NavLink href={`/organization/${currentOrganization}`}>
              Projects
            </NavLink>
          </Button>
        )}

        {canGetMembers && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
          >
            <NavLink href={`/organization/${currentOrganization}/members`}>
              Members
            </NavLink>
          </Button>
        )}

        {(canUpdateOrganization || canGetBilling) && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
          >
            <NavLink href={`/organization/${currentOrganization}/settings`}>
              Settings & Billing
            </NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}
