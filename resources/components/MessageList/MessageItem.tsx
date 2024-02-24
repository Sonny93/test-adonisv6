import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import RoundedImage from '../RoundedImage'
dayjs.extend(relativeTime)

export default function MessageItem({ message }: Readonly<{ message: Message }>) {
  const { author: user, type, content } = message
  if (type === 'system') {
    return <li css={{ fontSize: '.9em', color: '#888' }}>system - {content}</li>
  }

  return (
    <li css={{ display: 'flex', gap: '.5em' }}>
      <RoundedImage src={user.avatarUrl} alt={`${user.nickName}'s avatar`} size={24} />
      <div
        css={{
          display: 'flex',
          gap: '.25em',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <span css={{ height: '100%', fontSize: '.85em', color: '#888' }}>
          {user.nickName} - <MessageDate message={message} />
        </span>
        <span css={{ wordBreak: 'break-word' }}>{content}</span>
      </div>
    </li>
  )
}

function MessageDate({ message }: { message: Message }) {
  const { createdAt, updatedAt } = message
  if (createdAt === updatedAt) {
    return <>{dayjs(createdAt).fromNow()}</>
  }

  return (
    <>
      {dayjs(createdAt).fromNow()} (edited {`${dayjs(updatedAt).fromNow()}`})
    </>
  )
}
