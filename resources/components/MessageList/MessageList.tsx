import useChannel from '@/hooks/useChannel'
import useMessages from '@/hooks/useMessages'
import useNewMessageEvent from '@/hooks/useNewMessageEvent'
import { css } from '@emotion/react'
import { useEffect, useRef } from 'react'
import MessageItem from './MessageItem'

export default function MessageList() {
  const { messages, addMessage } = useMessages()
  const { channel } = useChannel()
  const ref = useRef<HTMLUListElement>(null)

  const scrollBottom = (smooth = true) =>
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant',
    })
  useNewMessageEvent(channel.id, (message) => {
    addMessage(message)
    setTimeout(scrollBottom)
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
      {messages.map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
    </ul>
  )
}
