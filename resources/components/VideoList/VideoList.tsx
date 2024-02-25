import { handleConsume, handleCreateConsumeTransport } from '@/lib/consume-transport'
import ButtonProduceVideo from './ButtonProduceVideo'
import MediaTransportVideo from './MediaTransportVideo'
import type { Producer } from 'mediasoup-client/lib/Producer'
import type { NewMediaTransport } from '@/types/transport'
import useSubscribe from '@/hooks/useSubscribe'
import useUser from '@/hooks/useUser'
import useRtpDevice from '@/hooks/useRtpDevice'
import useChannel from '@/hooks/useChannel'
import useMediaTransports from '@/hooks/useMediaTransports'

export default function VideoList() {
  const { channel } = useChannel()
  const { device } = useRtpDevice()
  const { user } = useUser()

  const { mediaTransports, addMediaTransport, removeMediaTransport } = useMediaTransports()

  useSubscribe<NewMediaTransport>(`channels/${channel.id}/produce`, async (data) => {
    if (user.id === data.user.id) return console.info('ignore current user', data)
    const { stream, transport } = await createConsumeTransport(data.producerId)
    addMediaTransport({
      stream,
      transport,
      kind: data.kind,
      user: data.user,
      producerId: data.producerId,
    })
  })

  useSubscribe<NewMediaTransport>(`channels/${channel.id}/produce/stop`, async (data) => {
    if (user.id === data.user.id) return console.info('ignore current user', data)
    removeMediaTransport(data)
  })

  const createConsumeTransport = async (producerId: Producer['id']) => {
    const transport = await handleCreateConsumeTransport({
      channel,
      device,
    })

    const data = await handleConsume(channel, {
      clientRtpCapabilities: device.rtpCapabilities,
      producerId: producerId,
    })
    const consumer = await transport.consume({
      id: data.consumerId,
      producerId: producerId,
      rtpParameters: data.rtpParameters,
      kind: 'video',
    })

    return { transport, stream: new MediaStream([consumer.track]), consumer }
  }

  return (
    <ul
      css={{
        height: '100%',
        width: '1000px',
        fontSize: '.85em',
        padding: '.85em',
        display: 'block',
        overflow: 'auto',
        border: '1px solid #dadce0',
      }}
    >
      <li>
        <ButtonProduceVideo />
      </li>
      {mediaTransports.map((mediaTransport) => (
        <li key={mediaTransport.stream.id}>
          <MediaTransportVideo {...mediaTransport} removeMediaTransport={removeMediaTransport} />
        </li>
      ))}
    </ul>
  )
}