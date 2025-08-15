import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LogInIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getInvite } from '@/http/get-invite'

dayjs.extend(relativeTime)

export default async function InvitePage({
  params,
}: {
  params: { id: string }
}) {
  const { id: inviteId } = params
  const { invite } = await getInvite(inviteId)

  const isUserAuthenticated = await isAuthenticated()

  async function signInFromInvite() {
    'use server'

    const cookiesStore = await cookies()
    cookiesStore.set('inviteId', inviteId)
    redirect(`/auth/sign-in?email=${invite.email}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {invite.author?.avatarUrl && (
              <AvatarImage
                src={invite.author.avatarUrl}
                alt={invite.author.name || 'Author Avatar'}
              />
            )}
            <AvatarFallback />
          </Avatar>

          <p className="text-muted-foreground text-center leading-relaxed text-balance">
            <span className="text-foreground font-medium">
              {invite.author?.name || 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="text-foreground font-medium">
              {invite.organization.name}
            </span>
            .{' '}
            <span className="text-xs">{dayjs(invite.createdAt).fromNow()}</span>
          </p>
        </div>

        <Separator />

        {!isUserAuthenticated && (
          <form action={signInFromInvite}>
            <Button type="submit" variant="secondary" className="w-full">
              <LogInIcon className="mr-2 size-4" />
              Sign in to accept the invite
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
