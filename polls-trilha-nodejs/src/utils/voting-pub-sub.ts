type Message = { pollOptionId: string; votes: number }
type Subscriber = (message: Message) => void

class VotingPubSub {
  // cada enquete vai ter seu próprio canal
  private channels: Record<string, Subscriber[]> = {}

  subscribe(pollId: string, subscriber: Subscriber) {
    // se nenhuma pessoa tiver assinado o resultado dessa enquete, não vai existir o array.
    // cria o array se não tiver ninguém  escrito ainda
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }

    this.channels[pollId].push(subscriber)
  }

  // publicação de mensagem
  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(message)
    }
  }
}

export const voting = new VotingPubSub()
