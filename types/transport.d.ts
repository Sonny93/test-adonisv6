type TransportDirection = 'send' | 'recv'

type ProducerMedia = {
  producerId: Producer['id']
  kind: 'audio' | 'video'
  user: User
}
