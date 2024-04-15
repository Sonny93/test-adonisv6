import type { DtlsParameters } from 'mediasoup-client/lib/types'

export async function createTransport(channelId: Channel['id'], direction: TransportDirection) {
  const request = await fetch(`/transport/${channelId}/create/${direction}`, {
    method: 'POST',
  })
  return (await request.json()) as TransportCreateResponse
}

export async function connectTransport(
  channelId: Channel['id'],
  direction: TransportDirection,
  dtlsParameters: DtlsParameters
) {
  await fetch(`/transport/${channelId}/connect/${direction}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dtlsParameters,
    }),
  })
}

export function handleConnect(
  channel: Channel,
  direction: TransportDirection,
  { dtlsParameters },
  callback,
  errback
) {
  connectTransport(channel.id, direction, dtlsParameters).then(callback).catch(errback)
}
