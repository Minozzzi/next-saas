import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth.middleware'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { NotFoundError } from '../_errors/not-found-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function removeMember(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .delete(
      '/organizations/:slug/projects/:memberId',
      {
        schema: {
          tags: ['projects'],
          summary: 'Remove a member from the organization.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            memberId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, memberId } = request.params
        const { organization, membership } =
          await request.getUserMembership(slug)

        const member = await prisma.member.findUnique({
          where: { id: memberId, organizationId: organization.id },
        })

        if (!member) {
          throw new NotFoundError(`Member not found.`)
        }

        const { cannot } = getUserPermissions(
          membership.userId,
          membership.role,
        )

        if (cannot('delete', 'User')) {
          throw new UnauthorizedError(
            `You're not allowed to remove this member from organization.`,
          )
        }

        await prisma.member.delete({
          where: { id: memberId, organizationId: organization.id },
        })

        return reply.status(204).send()
      },
    )
}
