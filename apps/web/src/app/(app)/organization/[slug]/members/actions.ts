'use server'

import { type Role, roleSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrganization } from '@/auth/auth'
import { createUserInvite } from '@/http/create-user-invite'
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

const inviteUserSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  role: roleSchema,
})

export async function createUserInviteAction(data: FormData) {
  const result = inviteUserSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, role } = result.data

  try {
    const organization = await getCurrentOrganization()

    if (!organization) {
      throw new Error('No current organization found')
    }

    await createUserInvite({
      organization,
      email,
      role,
    })

    revalidateTag(`${organization}/invites`)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error('Error creating user invite:', error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'User invite created successfully',
    errors: null,
  }
}
