import { projectSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth.middleware'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { NotFoundError } from '../_errors/not-found-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function deleteProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .delete(
      '/organizations/:slug/projects/:projectSlug',
      {
        schema: {
          tags: ['projects'],
          summary: 'Delete a project.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            projectSlug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, projectSlug } = request.params
        const { organization, membership } =
          await request.getUserMembership(slug)

        const project = await prisma.project.findUnique({
          where: { slug: projectSlug, organizationId: organization.id },
        })

        if (!project) {
          throw new NotFoundError(`Project not found.`)
        }

        const { cannot } = getUserPermissions(
          membership.userId,
          membership.role,
        )

        const authProject = projectSchema.parse(project)

        if (cannot('delete', authProject)) {
          throw new UnauthorizedError(
            `You're not allowed to delete this project.`,
          )
        }

        await prisma.project.delete({
          where: { slug: projectSlug },
        })

        return reply.status(204).send()
      },
    )
}
