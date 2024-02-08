import { z } from "zod"
import { randomUUID } from "node:crypto"
import { FastifyInstance } from "fastify"

import { prisma } from "../../lib/prisma"

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/votes", async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    })

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = voteOnPollParams.parse(request.params)
    const { pollOptionId } = voteOnPollBody.parse(request.body)

    let { sessionId } = request.cookies

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          // buscando por índice para uma busca mais performática
          sessionId_pollId: {
            sessionId,
            pollId,
          },
        },
      })

      if (
        userPreviousVoteOnPoll &&
        userPreviousVoteOnPoll.pollOptionId !== pollOptionId
      ) {
        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id,
          },
        })
      } else if (userPreviousVoteOnPoll) {
        return reply
          .status(400)
          .send({ message: "You already voted on this poll." })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie("sessionId", sessionId, {
        path: "/", // quais rotas da aplicação o cookie vai estar disponível. nesse caso '/' em todas
        maxAge: 60 * 60 * 24 * 30, //30 dias
        signed: true,
        httpOnly: true, //acessível apenas pelo back da aplicação. Não disponível para o front
      })
    }

    await prisma.vote.create({
      data: {
        pollId,
        sessionId,
        pollOptionId,
      },
    })

    return reply.status(201).send()
  })
}
