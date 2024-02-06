import { useEffect } from 'react'

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
  return user.nickName
}
