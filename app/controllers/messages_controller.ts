import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'

export default class MessagesController {
  index({ inertia }: HttpContext) {
    return inertia.render('home')
  }

  createMessage({ request, response }: HttpContext) {
    const message = (request.input('message') ?? '').trim()

    if (message) {
      transmit.broadcast('chat', { content: message })
    }

    return response.noContent()
  }
}
