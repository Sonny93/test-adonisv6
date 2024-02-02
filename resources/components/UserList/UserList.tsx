import useSubscribe from '@/hooks/useSubscribe'
import UserItem from './UserItem'

export default function UserList() {
  const users = useSubscribe<User>('user_connected')

  return (
    <ul style={{ height: '250px', display: 'block', overflow: 'auto', border: '1px solid red' }}>
      {users.map((user) => (
        <UserItem user={user} key={user.uid} />
      ))}
    </ul>
  )
}
