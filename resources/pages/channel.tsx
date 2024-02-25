import ChannelName from '@/components/ChannelName'
import CreateMessageForm from '@/components/CreateMessageForm'
import MessageList from '@/components/MessageList/MessageList'
import Navbar from '@/components/Navbar'
import RoundedImage from '@/components/RoundedImage'
import UserList from '@/components/UserList/UserList'
import WhosTyping from '@/components/WhosTypings/WhosTypings'
import { ChannelContextProvider } from '@/contexts/channelContext'
import {
  MediaTransportsContextProvider,
  type MediaTransportsContextType,
} from '@/contexts/mediaTransportsContext'
import { MessagesContextProvider } from '@/contexts/messagesContext'
import { RtpDeviceContextProvider } from '@/contexts/rtpDeviceContext'
import { TransmitContextProvider } from '@/contexts/transmitContext'
import useChannel from '@/hooks/useChannel'
import useMediaTransports from '@/hooks/useMediaTransports'
import useRtpDevice from '@/hooks/useRtpDevice'
import useStream from '@/hooks/useStream'
import useSubscribe from '@/hooks/useSubscribe'
import useUser from '@/hooks/useUser'
import { handleConsume, handleCreateConsumeTransport } from '@/lib/consume-transport'
import { handleCreateProduceTransport } from '@/lib/produce-transport'
import type { MediaTransport, NewMediaTransport } from '@/types/transport'
import type { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters'
import { Transport, type Producer } from 'mediasoup-client/lib/types'
import { useEffect, useRef, useState } from 'react'

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
              <MediaTransportsContextProvider mediaTransports={[]}>
                <VideoList />
              </MediaTransportsContextProvider>
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

  const { mediaTransports, addMediaTransport, removeMediaTransport } = useMediaTransports()

  useSubscribe<NewMediaTransport>(`channels/${channel.id}/produce`, async (data) => {
    if (user.id === data.user.id) return console.info('ignore current user', data)
    console.log('new producer', data)
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
    console.log('remove producer', data)
    removeMediaTransport(data)
  })

  const createConsumeTransport = async (producerId: Producer['id']) => {
    console.log('c', device)
    const transport = await handleCreateConsumeTransport({
      channel,
      device,
      onStateChange: console.log,
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

function ButtonProduceVideo() {
  const { createStream } = useStream({ screenShare: true })
  const { channel } = useChannel()
  const { device } = useRtpDevice()
  const { user } = useUser()

  const [mediaTransport, setMediaTransport] = useState<MediaTransport>(null)

  async function handleClick() {
    const stream = await createStream()
    const transport = await handleCreateProduceTransport({
      channel,
      device,
      stream,
    })

    setMediaTransport({ stream, transport, user, kind: 'video' })
  }

  function handleClose() {
    mediaTransport?.transport?.close()
    mediaTransport?.stream?.getTracks().forEach((track) => track.stop())
    setMediaTransport(null)
  }

  return (
    <>
      {!mediaTransport ? (
        <button onClick={handleClick}>Screen share</button>
      ) : (
        <button onClick={handleClose}>Stop screen share</button>
      )}
      {mediaTransport && <MediaTransportVideo {...mediaTransport} key={mediaTransport.stream.id} />}
    </>
  )
}

function MediaTransportVideo({
  stream,
  transport,
  user,
  kind,
  producerId,
  removeMediaTransport,
}: MediaTransport & { removeMediaTransport?: MediaTransportsContextType['removeMediaTransport'] }) {
  const { user: currentUser } = useUser()

  const videoRef = useRef<HTMLVideoElement>(null)
  const [connectionState, setConnectionState] = useState<Transport['connectionState']>(
    transport.connectionState
  )

  const [videoLoading, setVideoLoading] = useState<boolean>(true)

  useEffect(() => {
    videoRef.current.srcObject = stream
    videoRef.current.play()
    transport.on('connectionstatechange', (connState: Transport['connectionState']) => {
      setConnectionState(connState)
      if (connState !== 'new' && connState !== 'connecting' && connState !== 'connected') {
        removeMediaTransport &&
          removeMediaTransport({
            kind,
            user,
            producerId,
          })
      }
    })
  }, [])

  return (
    <>
      <div css={{ position: 'relative', borderRadius: '5px', overflow: 'hidden' }}>
        <video
          css={{ width: '100%' }}
          ref={videoRef}
          onCanPlayThrough={() => setVideoLoading(false)}
        />
        {videoLoading && (
          <div
            css={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              color: '#fff',
              fontSize: '24px',
              backgroundColor: 'rgba(0, 0, 0, .5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Loading
          </div>
        )}
      </div>
      <p>Conn. state: {connectionState}</p>
      <p css={{ display: 'flex', gap: '.35em', alignItems: 'center' }}>
        <RoundedImage src={user.avatarUrl} size={24} /> {user.name}{' '}
        {currentUser.id === user.id && '(you)'}
      </p>
    </>
  )
}
