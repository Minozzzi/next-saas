import { organizationSchema } from '@saas/auth'
import { ArrowLeftRightIcon, CrownIcon, UserMinusIcon } from 'lucide-react'

import {
  getAbility,
  getCurrentMembership,
  getCurrentOrganization,
} from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export async function MemberList() {
  const [currentOrganization, currentMembership, permissions] =
    await Promise.all([
      getCurrentOrganization(),
      getCurrentMembership(),
      getAbility(),
    ])

  if (!currentOrganization || !currentMembership) {
    return null
  }

  const [{ organization }, { members }] = await Promise.all([
    getOrganization(currentOrganization),
    getMembers(currentOrganization),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="py-2.5" style={{ width: 40 }}>
                  <Avatar>
                    <AvatarFallback />

                    {member.avatarUrl && (
                      <AvatarImage
                        src={member.avatarUrl}
                        alt={member.name || member.email}
                        width={32}
                        height={32}
                        className="aspect-square size-full"
                      />
                    )}
                  </Avatar>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center gap-2 font-medium">
                      {member.name}{' '}
                      {member.userId === currentMembership.userId && ' (me)'}
                      {organization?.ownerId === member.userId && (
                        <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                          <CrownIcon />
                          Owner
                        </span>
                      )}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {member.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    {permissions?.can(
                      'transfer_ownership',
                      authOrganization,
                    ) && (
                      <Button size="sm" variant="ghost">
                        <ArrowLeftRightIcon className="mr-2 size-4" />
                        Transfer ownership
                      </Button>
                    )}

                    <UpdateMemberRoleSelect
                      disabled={
                        member.userId === currentMembership.userId ||
                        member.userId === organization.ownerId ||
                        permissions?.cannot('update', 'User')
                      }
                      value={member.role}
                      memberId={member.id}
                    />

                    {permissions?.can('delete', 'User') && (
                      <form action={removeMemberAction.bind(null, member.id)}>
                        <Button
                          disabled={
                            member.userId === currentMembership.userId ||
                            member.userId === organization.ownerId
                          }
                          type="submit"
                          size="sm"
                          variant="destructive"
                        >
                          <UserMinusIcon className="mr-2 size-4" />
                          Remove member
                        </Button>
                      </form>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
