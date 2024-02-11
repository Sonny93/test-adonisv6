import type { Device } from 'mediasoup-client'
import type { DtlsParameters } from 'mediasoup-client/lib/types'

export async function handleCreateTransport(
  channel: Channel,
  device: Device,
  direction: TransportDirection
) {
  const routerTransport = await createTransport(channel.id, direction)
  const transport = device.createSendTransport(routerTransport)

  transport.on('connect', (...args) => handleConnect(channel, ...args))
  transport.on('connectionstatechange', console.log)
  transport.on('produce', (...args) => handleProduce(channel, device, ...args))

  const stream = await getUserStream()
  const videoTrack = stream.getVideoTracks()[0]
  transport.produce({ track: videoTrack })
}

function handleConnect(channel: Channel, { dtlsParameters }, callback, errback) {
  console.log('connect', dtlsParameters, channel)
  connectTransport(channel.id, 'send', dtlsParameters)
    .then(() => {
      console.log('ok')
      callback()
    })
    .catch((error) => {
      console.error('connect error', error)
      errback()
    })
}

function handleProduce(
  channel: Channel,
  device: Device,
  { kind, rtpParameters },
  callback,
  errback
) {
  console.log('produce')
  fetch(`/transport/${channel.id}/produce`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rtpParameters,
      kind,
      clientRtpCapabilities: device.rtpCapabilities,
    }),
  })
    .then((produceId) => {
      console.log('produce success', produceId)
      callback({ id: produceId })
    })
    .catch((error) => {
      console.error('produce error', error)
      errback()
    })
}

async function createTransport(channelId: Channel['id'], direction: TransportDirection) {
  const request = await fetch(`/transport/${channelId}/create/${direction}`, {
    method: 'POST',
  })
  return (await request.json()) as TransportCreateResponse
}

async function connectTransport(
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

export function getUserStream(
  options: DisplayMediaStreamOptions = {
    video: true,
    audio: false,
  }
) {
  return navigator.mediaDevices.getUserMedia(options)
}
