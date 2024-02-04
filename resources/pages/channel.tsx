import CreateMessageForm from '@/components/CreateMessageForm'
import MessageList from '@/components/MessageList/MessageList'
import UserList from '@/components/UserList/UserList'
import TransmitContext from '@/contexts/transmitContext'
import { Transmit } from '@adonisjs/transmit-client'
import { useMemo } from 'react'

export default function ChannelPageWrapper({ channel }: { channel: ChannelExtended }) {
  const transmit = useMemo(
    () =>
      new Transmit({
        baseUrl: 'http://localhost:3333',
        maxReconnectAttempts: 5,
        removeSubscriptionOnZeroListener: true,
        onSubscribeFailed: console.log,
        onReconnectAttempt: console.log,
        onReconnectFailed: console.log,
        beforeSubscribe: console.log,
        beforeUnsubscribe: console.log,
        onSubscription: console.log,
        onUnsubscription: console.log,
      }),
    []
  )
  return (
    <TransmitContext.Provider value={{ transmit }}>
      <ChannelPage channel={channel} />
    </TransmitContext.Provider>
  )
}

function ChannelPage({ channel }: { channel: ChannelExtended }) {
  return (
    <div
      css={{
        height: '100%',
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
        <ChannelName channel={channel} />
        <MessageList messages={channel.messages} />
        <CreateMessageForm channelId={channel.id} />
      </div>
    </div>
  )
}

function ChannelName({ channel }: { channel: ChannelExtended }) {
  return <div>{channel.name}</div>
}
