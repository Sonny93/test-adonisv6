import transmit from '@adonisjs/transmit/services/main'

transmit.on('connect', console.log)
transmit.on('broadcast', console.log)

setInterval(() => {
  transmit.broadcast('chat', {
    content: Date.now().toString(),
  })
}, 500)
