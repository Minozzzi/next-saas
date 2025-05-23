import { XOctagonIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { revokeInviteAction } from './actions'

type RevokeInviteButtonProps = {
  inviteId: string
}

export async function RevokeInviteButton({
  inviteId,
}: RevokeInviteButtonProps) {
  return (
    <form action={revokeInviteAction.bind(null, inviteId)}>
      <Button size="sm" variant="destructive">
        <XOctagonIcon className="mr-2 size-4" />
        Revoke Invite
      </Button>
    </form>
  )
}
