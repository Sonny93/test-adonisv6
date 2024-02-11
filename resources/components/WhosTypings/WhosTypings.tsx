import useChannel from '@/hooks/useChannel'
import useNewMessageEvent from '@/hooks/useNewMessageEvent'
import useSubscribe from '@/hooks/useSubscribe'
import { useState } from 'react'
import TypingItem from './TypingItem'

const REMOVE_DELAY = 3000

export default function WhosTyping() {
  const { channel } = useChannel()
  const [typings, setTypings] = useState<{ user: User; expiration: number }[]>([])

  useSubscribe<{ user: User }>(`channels/${channel.id}/typing`, ({ user }) => {
    setTypings((_typings) => {
      const newTypings = [..._typings]
      const userIndex = newTypings.findIndex(({ user: u }) => u.id === user.id)
      const expirationTimestamp = Date.now() + REMOVE_DELAY

      if (userIndex === -1) {
        newTypings.push({ user, expiration: expirationTimestamp })
      } else {
        newTypings[userIndex] = {
          user,
          expiration: expirationTimestamp,
        }
      }

      return newTypings
    })
  })
  useNewMessageEvent(channel.id, ({ author }) => removeTypingUser(author))

  function removeTypingUser(user: User) {
    setTypings((_typings) => {
      const typs = [..._typings]
      const userIndex = typs.findIndex(({ user: u }) => u.id === user.id)
      if (userIndex !== -1) {
        typs.splice(userIndex, 1)
      }
      return typs
    })
  }

  const label = typings.length === 1 ? 'is typing' : 'are typings'
  return (
    <div css={{ fontSize: '.85em', height: '21px', marginTop: '.35em' }}>
      {typings.map(({ user, expiration }, index) => (
        <span key={user.id + expiration}>
          {!!index && ', '}
          <TypingItem user={user} expiration={expiration} removeUser={removeTypingUser} />
        </span>
      ))}{' '}
      {typings.length !== 0 && label}
    </div>
  )
}
