import MessageForm from '@/components/MessageForm'
import TransmitContext from '@/contexts/transmitContext'
import useSubscribe from '@/hooks/useSubscribe'
import { Transmit } from '@adonisjs/transmit-client'
import React, { useMemo, useRef } from 'react'

type Message = {
  content: string
}

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
  const ref = useRef<HTMLUListElement>(null)
  const messages = useSubscribe<Message>('chat', {
    onNewData: () =>
      ref.current?.scrollTo({
        top: ref.current?.scrollHeight,
        behavior: 'smooth',
      }),
  })
  return (
    <>
      <h1>coucou</h1>
      <MessageForm />
      <ul ref={ref} style={{ height: '250px', display: 'block', overflow: 'auto' }}>
        {messages.map((message) => (
          <MessageItem message={message} key={message.content} />
        ))}
      </ul>
    </>
  )
}

function MessageItem({ message }: Readonly<{ message: Message }>) {
  return <li>{message.content}</li>
}
