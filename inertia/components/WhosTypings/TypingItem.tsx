import { useEffect } from 'react'
import RoundedImage from '../RoundedImage.js'

export default function TypingItem({
  user,
  expiration,
  removeUser,
}: {
  user: User
  expiration: number
  removeUser: (user: User) => void
}) {
  useEffect(() => {
    const hideIn = expiration - Date.now()
    if (Math.sign(hideIn) !== 1) {
      removeUser(user)
    } else {
      const timeout = setTimeout(() => removeUser(user), hideIn)
      return () => clearTimeout(timeout)
    }
  }, [expiration])

  return (
    <span>
      <RoundedImage
        src={user.avatarUrl}
        size={20}
        css={{ verticalAlign: 'sub', fontSize: '.85em' }}
      />{' '}
      {user.nickName}
    </span>
  )
}
