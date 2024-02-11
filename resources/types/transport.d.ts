type TransportCreateResponse = {
  id: string
  iceParameters: IceParameters
  iceCandidates: IceCandidate[]
  sctpParameters: SctpParameters
  dtlsParameters: DtlsParameters
}

type TransportDirection = 'send' | 'recv'
