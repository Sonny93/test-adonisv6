import { USER_CONNECTED, USER_DISCONNECTED } from '#constants/channel_events'
import logger from '@adonisjs/core/services/logger'
import transmit from '@adonisjs/transmit/services/main'

transmit.on('connect', ({ uid }) => {
  logger.info('%s connected', uid)
  transmit.broadcast(USER_CONNECTED, { uid })
})
transmit.on('disconnect', ({ uid }) => {
  logger.info('%s connected', uid)
  transmit.broadcast(USER_DISCONNECTED, { uid })
})

transmit.on('broadcast', ({ channel, payload }) =>
  logger.info('"%s" broadcast %s', channel, JSON.stringify(payload))
)
