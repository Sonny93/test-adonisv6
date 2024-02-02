import useSubscribe from '@/hooks/useSubscribe'
import { useRef } from 'react'
import MessageItem from './MessageItem'

export default function MessageList() {
  const ref = useRef<HTMLUListElement>(null)
  const messages = useSubscribe<Message>('chat', {
    onNewData: () =>
      ref.current?.scrollTo({
        top: ref.current?.scrollHeight,
        behavior: 'smooth',
      }),
  })

  return (
    <ul
      ref={ref}
      style={{ height: '250px', display: 'block', overflow: 'auto', border: '1px solid red' }}
    >
      {messages.map((message, index) => (
        <MessageItem message={message} key={message.content + index} />
      ))}
    </ul>
  )
}
