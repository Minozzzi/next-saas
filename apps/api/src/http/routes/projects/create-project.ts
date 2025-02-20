import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth.middleware'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function createProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .post(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['projects'],
          summary: 'Create a new project.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          response: {
            201: z.object({
              projectId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(
          membership.userId,
          membership.role,
        )

        if (cannot('create', 'Project')) {
          throw new UnauthorizedError(
            `You're not allowed to create new projects.`,
          )
        }

        const { name, description } = request.body

        const { id: projectId } = await prisma.project.create({
          data: {
            name,
            description,
            slug: createSlug(name),
            organizationId: organization.id,
            ownerId: membership.userId,
          },
        })

        return reply.status(201).send({
          projectId,
        })
      },
    )
}
