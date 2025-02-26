import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth.middleware'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { NotFoundError } from '../_errors/not-found-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function revokeInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .delete(
      '/organizations/:slug/invites/:inviteId',
      {
        schema: {
          tags: ['invites'],
          summary: 'Revoke an invite.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            inviteId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, inviteId } = request.params
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(
          membership.userId,
          membership.role,
        )

        if (cannot('delete', 'Invite')) {
          throw new UnauthorizedError(`You're not allowed to delete an invite.`)
        }

        const invite = await prisma.invite.findUnique({
          where: { id: inviteId, organizationId: organization.id },
        })

        if (!invite) {
          throw new NotFoundError(`Invite not found.`)
        }

        await prisma.invite.delete({
          where: { id: inviteId, organizationId: organization.id },
        })

        return reply.status(204).send()
      },
    )
}
