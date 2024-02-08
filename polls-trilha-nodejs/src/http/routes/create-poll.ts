import { z } from "zod"
import { FastifyInstance } from "fastify"

import { prisma } from "../../lib/prisma"

export async function createPoll(app: FastifyInstance) {
  app.post("/polls", async (request, reply) => {
    console.log(request.body)

    const createPollBody = z.object({
      title: z.string(),
      options: z.array(z.string()),
    })

    const { title, options } = createPollBody.parse(request.body)

    /* transaction */
    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map(option => {
              return { title: option }
            }),
          },
        },
      },
    })

    return reply.status(201).send({ pollId: poll.id })
  })
}
