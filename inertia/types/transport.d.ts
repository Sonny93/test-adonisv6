import type { Producer } from 'mediasoup-client/lib/Producer'

type TransportCreateResponse = {
  id: string
  iceParameters: IceParameters
  iceCandidates: IceCandidate[]
  sctpParameters: SctpParameters
  dtlsParameters: DtlsParameters
}

type TransportDirection = 'send' | 'recv'

type MediaTransport = {
  stream: MediaStream
  transport: Transport
  kind: MediaKind
  user: User
  producerId?: Producer['id']
}

type NewMediaTransport = {
  producerId: Producer['id']
  kind: 'video' | 'audio'
  user: User
}
