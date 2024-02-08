import { z } from "zod"
import { FastifyInstance } from "fastify"

import { prisma } from "../../lib/prisma"

export async function getPoll(app: FastifyInstance) {
  app.get("/polls/:pollId", async (request, reply) => {
    console.log(request.params)

    const getPollBody = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = getPollBody.parse(request.params)

    /* transaction */
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return reply.send({ poll })
  })
}
