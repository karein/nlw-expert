import { z } from "zod"
import { FastifyInstance } from "fastify"

import { voting } from "../../utils/voting-pub-sub"

export async function pollResults(app: FastifyInstance) {
  app.get(
    "/polls/:pollId/results",
    { websocket: true },
    (connection, request) => {
      // Inscrever apenas nas mensagens publicadas ano canal com o ID da enquete (`pollId`)
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      })

      const { pollId } = getPollParams.parse(request.params)

      voting.subscribe(pollId, message => {
        connection.socket.send(JSON.stringify(message))
      })
    }
  )
}
