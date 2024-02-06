import CreateMessageForm from '@/components/CreateMessageForm'
import MessageList from '@/components/MessageList/MessageList'
import UserList from '@/components/UserList/UserList'
import WhosTyping from '@/components/WhosTypings/WhosTypings'
import { ChannelContextProvider } from '@/contexts/channelContext'
import { MessagesContextProvider } from '@/contexts/messagesContext'
import { TransmitContextProvider } from '@/contexts/transmitContext'
import useChannel from '@/hooks/useChannel'
import { Link } from '@inertiajs/react'

export default function ChannelPage({ channel }: { channel: ChannelExtended }) {
  return (
    <TransmitContextProvider>
      <ChannelContextProvider channel={channel}>
        <MessagesContextProvider messages={channel.messages}>
          <nav>
            <ul>
              <li>
                <Link href="/">Channels</Link>
              </li>
            </ul>
          </nav>
          <div
            css={{
              height: 'calc(100% - 24px)', // 24px = height of navbar
              padding: '1em',
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
