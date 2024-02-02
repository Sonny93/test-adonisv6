import transmit from '@adonisjs/transmit/services/main'

transmit.on('connect', console.log)
transmit.on('broadcast', console.log)

setInterval(() => {
  transmit.broadcast('chat', {
    message: Date.now().toString(),
  })
}, 1000)
