import useSubscribe from '@/hooks/useSubscribe'
import { css } from '@emotion/react'
import { useEffect, useRef } from 'react'
import MessageItem from './MessageItem'

export default function MessageList({ messages }: { messages: Message[] }) {
  const ref = useRef<HTMLUListElement>(null)

  const scrollBottom = (smooth = true) =>
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant',
    })
  const allMessages = useSubscribe<Message>('chat', {
    initData: messages,
    onNewData: (data) => {
      scrollBottom()
      console.log(data)
    },
  })

  useEffect(() => scrollBottom(false), [])

  return (
    <ul
      ref={ref}
      css={css({
        width: '100%',
        padding: '.5em',
        display: 'flex',
        flex: 1,
        gap: '.75em',
        flexDirection: 'column',
        overflow: 'auto',
      })}
    >
      {allMessages.map((message, index) => (
        <MessageItem message={message} key={message.content + index} />
      ))}
    </ul>
  )
}
