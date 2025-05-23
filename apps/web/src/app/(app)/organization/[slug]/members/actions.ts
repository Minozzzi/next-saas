'use server'

import type { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrganization } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMemberRole } from '@/http/update-member-role'

export async function removeMemberAction(memberId: string) {
  const currentOrganization = await getCurrentOrganization()

  if (!currentOrganization) {
    throw new Error('No current organization found')
  }

  await removeMember({
    organization: currentOrganization,
    memberId,
  })

  revalidateTag(`${currentOrganization}/members`)
}

export async function updateMemberRoleAction(memberId: string, role: Role) {
  const currentOrganization = await getCurrentOrganization()

  if (!currentOrganization) {
    throw new Error('No current organization found')
  }

  await updateMemberRole({
    organization: currentOrganization,
    memberId,
    role,
  })

  revalidateTag(`${currentOrganization}/members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrganization = await getCurrentOrganization()

  if (!currentOrganization) {
    throw new Error('No current organization found')
  }

  await revokeInvite({
    organization: currentOrganization,
    inviteId,
  })

  revalidateTag(`${currentOrganization}/invites`)
}
