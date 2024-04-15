import useChannel from '@/hooks/useChannel'
import useNewMessageEvent from '@/hooks/useNewMessageEvent'
import useSubscribe from '@/hooks/useSubscribe'
import useUser from '@/hooks/useUser'
import { Fragment, useState } from 'react'
import TypingItem from './TypingItem.js'

const REMOVE_DELAY = 3000

export default function WhosTyping() {
  const { channel } = useChannel()
  const [typings, setTypings] = useState<{ user: User; expiration: number }[]>([])
  const { user: currentUser } = useUser()

  useSubscribe<{ user: User }>(`channels/${channel.id}/typing`, ({ user }) => {
    if (currentUser.id === user.id) return
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
    <div
      css={{
        fontSize: '.85em',
        height: '20px',
        marginTop: '.35em',
        padding: '0.3em 0.5em',
        boxSizing: 'content-box',
        borderTop: '1px solid #dadce0',
      }}
    >
      {typings.map(({ user, expiration }, index) => (
        <Fragment key={user.id}>
          {!!index && ', '}
          <TypingItem user={user} expiration={expiration} removeUser={removeTypingUser} />
        </Fragment>
      ))}{' '}
      {typings.length !== 0 && label}
    </div>
  )
}
