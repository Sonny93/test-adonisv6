import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default function MessageItem({ message }: Readonly<{ message: Message }>) {
  const { author: user, type, content } = message
  if (type === 'system') {
    return <li css={{ fontSize: '.85em', color: '#999' }}>system - {content}</li>
  }

  return (
    <li css={{ display: 'flex', gap: '.25em' }}>
      <img
        src={user.avatarUrl}
        alt={`${user.nickName}'s avatar`}
        css={{
          height: '24px',
          width: '24px',
          borderRadius: '50%',
        }}
      />
      <div
        css={{
          display: 'flex',
          gap: '.25em',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <span css={{ fontSize: '.85em', color: '#999' }}>
          {user.nickName} - <MessageDate message={message} />
        </span>
        <span>{content}</span>
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
