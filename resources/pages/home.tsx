import MessageForm from '@/components/MessageForm'
import MessageList from '@/components/MessageList/MessageList'
import UserList from '@/components/UserList/UserList'
import TransmitContext from '@/contexts/transmitContext'
import { Transmit } from '@adonisjs/transmit-client'
import { useMemo } from 'react'

export default function HomeWrapper() {
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
      <Home />
    </TransmitContext.Provider>
  )
}

function Home() {
  return (
    <>
      <h1>coucou</h1>
      <UserList />
      <MessageForm />
      <MessageList />
    </>
  )
}
