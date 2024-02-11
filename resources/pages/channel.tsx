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
import { handleCreateTransport } from '@/lib/transport'
import type { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters'

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
        <button onClick={() => handleCreateTransport(channel, device, 'send')}>
          create send transport
        </button>
      </li>
      list of videos
    </ul>
  )
}

function ChannelName() {
  const { channel } = useChannel()
  return <div>{channel.name}</div>
}
