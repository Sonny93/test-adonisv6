import ChannelName from '@/components/ChannelName'
import CreateMessageForm from '@/components/CreateMessageForm'
import MessageList from '@/components/MessageList/MessageList'
import Navbar from '@/components/Navbar'
import UserList from '@/components/UserList/UserList'
import WhosTyping from '@/components/WhosTypings/WhosTypings'
import { ChannelContextProvider } from '@/contexts/channelContext'
import { MessagesContextProvider } from '@/contexts/messagesContext'
import { RtpDeviceContextProvider } from '@/contexts/rtpDeviceContext'
import { TransmitContextProvider } from '@/contexts/transmitContext'
import useChannel from '@/hooks/useChannel'
import useRtpDevice from '@/hooks/useRtpDevice'
import useStream from '@/hooks/useStream'
import useSubscribe from '@/hooks/useSubscribe'
import useTransports from '@/hooks/useTransports'
import useUser from '@/hooks/useUser'
import { handleConsume, handleCreateConsumeTransport } from '@/lib/consume-transport'
import { handleCreateProduceTransport } from '@/lib/produce-transport'
import type { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters'
import { type ConnectionState, type Producer } from 'mediasoup-client/lib/types'
import { useRef, useState } from 'react'

interface ChannelPageProps {
  channel: ChannelExtended
  routerRtpCapabilities: {
    rtpCapabilities: RtpCapabilities
  }
}

export default function ChannelPage({
  channel,
  routerRtpCapabilities: { rtpCapabilities },
}: ChannelPageProps) {
  return (
    <TransmitContextProvider>
      <ChannelContextProvider channel={channel}>
        <MessagesContextProvider messages={channel.messages}>
          <Navbar />
          <div
            css={{
              height: 'calc(100% - 24px - 1.5em)', // 24px = height of navbar; 1.5em navbar padding
              padding: '1em',
              paddingTop: '0',
              display: 'flex',
              flex: '1',
              gap: '.5em',
            }}
          >
            <UserList />
            <div
              css={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ChannelName />
              <MessageList />
              <WhosTyping />
              <CreateMessageForm />
            </div>
            <RtpDeviceContextProvider routerRtpCapabilities={rtpCapabilities}>
              <VideoList />
            </RtpDeviceContextProvider>
          </div>
        </MessagesContextProvider>
      </ChannelContextProvider>
    </TransmitContextProvider>
  )
}

function VideoList() {
  const { channel } = useChannel()
  const { device } = useRtpDevice()
  const { user } = useUser()
  console.log('render', device)

  const { transports, addTransport, removeTransport } = useTransports()
  useSubscribe<{ producerId: Producer['id']; kind: 'video' | 'audio'; user: User }>(
    `channels/${channel.id}/produce`,
    (data) => {
      if (user.id === data.user.id) return console.info('ignore current user', data)
      console.log('new producer', data)
      createConsumeTransport(data.producerId)
    }
  )

  const { createStream } = useStream({ screenShare: true })
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

  const [connectionState, setConnectionState] = useState<ConnectionState>()

  async function handleClick() {
    const stream = await createStream()
    const transport = await handleCreateProduceTransport({
      channel,
      device,
      stream,
      onStateChange: (connState) => {
        console.log(connState)
        setConnectionState(connState)
      },
    })

    videoRef.current.srcObject = stream
    videoRef.current.play()
  }

  const createConsumeTransport = async (producerId: Producer['id']) => {
    console.log('c', device)
    const transport = await handleCreateConsumeTransport({
      channel,
      device,
      onStateChange: console.log,
    })
    console.log('created')
    const data = await handleConsume(channel, {
      clientRtpCapabilities: device.rtpCapabilities,
      producerId: producerId,
    })
    console.log(data)
    const consumer = await transport.consume({
      id: data.consumerId,
      producerId: producerId,
      rtpParameters: data.rtpParameters,
      kind: 'video',
    })
    console.log('Consume success', consumer)
    const stream = new MediaStream([consumer.track])

    videoRef2.current.srcObject = stream
    videoRef2.current.play()
    return stream
  }

  return (
    <ul
      css={{
        height: '100%',
        width: '350px',
        fontSize: '.85em',
        padding: '.85em',
        display: 'block',
        overflow: 'auto',
        border: '1px solid #dadce0',
      }}
    >
      <li>
        <button onClick={handleClick}>create send transport</button>
      </li>
      <video css={{ width: '100%' }} ref={videoRef} autoPlay muted controls />
      <video css={{ width: '100%' }} ref={videoRef2} autoPlay muted controls />
    </ul>
  )
}
