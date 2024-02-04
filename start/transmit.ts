import { USER_CONNECTED, USER_DISCONNECTED } from '#constants/channel_events'
import logger from '@adonisjs/core/services/logger'
import transmit from '@adonisjs/transmit/services/main'

transmit.on('connect', ({ uid }) => {
  logger.debug('%s connected', uid)
  transmit.broadcast(USER_CONNECTED, { uid })
  transmit.broadcast('chat', { type: 'system', content: `${uid} joined` })
})
transmit.on('disconnect', ({ uid }) => {
  logger.debug('%s connected', uid)
  transmit.broadcast(USER_DISCONNECTED, { uid })
  transmit.broadcast('chat', { type: 'system', content: `${uid} leaved` })
})

transmit.on('broadcast', ({ channel, payload }) =>
  logger.debug('"%s" broadcast %s', channel, JSON.stringify(payload))
)

// setInterval(() => {
//   transmit.broadcast('chat', {
//     type: 'system',
//     content: Date.now().toString(),
//   })
// }, 3000)
