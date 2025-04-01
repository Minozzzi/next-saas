import { ChevronsUpDownIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'

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

export function OrganizationSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-40 items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        <span className="text-muted-foreground">Select organization</span>

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

          <DropdownMenuItem>
            <Avatar className="mr-2 size-4">
              <AvatarImage src="https://github.com/minozzzi.png" />
              <AvatarFallback />
            </Avatar>

            <span className="line-clamp-1">Guilherme Minozzi</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/create-organization">
            <PlusIcon className="mr-2 size-4" />
            Create new organization
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
