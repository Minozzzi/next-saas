import { ChevronsUpDownIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { getCurrentOrganization } from '@/auth/auth'
import { getOrganizations } from '@/http/get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function OrganizationSwitcher() {
  const currentOrgByCookie = await getCurrentOrganization()

  const { organizations } = await getOrganizations()

  const currentOrganization = organizations.find(
    (organization) => organization.slug === currentOrgByCookie,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-40 items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {currentOrganization ? (
          <>
            <Avatar className="size-4">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>

            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )}

        <ChevronsUpDownIcon className="text-muted-foreground ml-auto size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={14}
        sideOffset={12}
        className="w-52"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          {organizations.map((organization) => (
            <DropdownMenuItem key={organization.id} asChild>
              <Link href={`/organization/${organization.slug}`}>
                <Avatar className="size-4">
                  {organization.avatarUrl && (
                    <AvatarImage src={organization.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>

                <span className="line-clamp-1">{organization.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/create-organization">
            <PlusIcon className="size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
