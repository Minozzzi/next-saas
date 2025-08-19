import dayjs from 'dayjs'
import { CheckIcon, UserPlus2Icon, XIcon } from 'lucide-react'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export function PendingInvites() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2Icon className="size-4" />
          <span className="sr-only">Pending Invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <span className="block text-sm font-medium">Pending invites (2)</span>

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm leading-relaxed">
            <span className="text-foreground font-medium">
              {invite.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="text-foreground font-medium">
              {invite.organization.name}
            </span>{' '}
            <span>{dayjs(invite.createdAt).fromNow()}</span>
          </p>

          <div className="flex gap-1">
            <Button size="xs" variant="outline">
              <CheckIcon className="mr-1.5 size-3" />
              Accept
            </Button>

            <Button size="xs" variant="ghost" className="text-muted-foreground">
              <XIcon className="mr-1.5 size-3" />
              Revoke
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
