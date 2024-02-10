import CreateMessageForm from '@/components/CreateMessageForm'
import MessageList from '@/components/MessageList/MessageList'
import Navbar from '@/components/Navbar'
import UserList from '@/components/UserList/UserList'
import WhosTyping from '@/components/WhosTypings/WhosTypings'
import { ChannelContextProvider } from '@/contexts/channelContext'
import { MessagesContextProvider } from '@/contexts/messagesContext'
import { TransmitContextProvider } from '@/contexts/transmitContext'
import useChannel from '@/hooks/useChannel'

export default function ChannelPage({ channel }: { channel: ChannelExtended }) {
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
          </div>
        </MessagesContextProvider>
      </ChannelContextProvider>
    </TransmitContextProvider>
  )
}

function ChannelName() {
  const { channel } = useChannel()
  return <div>{channel.name}</div>
}
