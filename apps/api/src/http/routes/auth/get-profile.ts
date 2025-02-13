import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth.middleware'
import { prisma } from '@/lib/prisma'

import { NotFoundError } from '../_errors/not-found-error'

export async function getUserProfile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get(
      '/profile',
      {
        schema: {
          tags: ['auth'],
          summary: 'Get authenticated user profile',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              user: z.object({
                id: z.string(),
                email: z.string(),
                name: z.string().nullable(),
                avatarUrl: z.string().url().nullable(),
              }),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const user = await prisma.user.findUnique({
          select: {
            id: true,
            email: true,
            name: true,
            avatarUrl: true,
          },
          where: {
            id: userId,
          },
        })

        if (!user) {
          throw new NotFoundError('User not found.')
        }

        return reply.send({
          user,
        })
      },
    )
}
