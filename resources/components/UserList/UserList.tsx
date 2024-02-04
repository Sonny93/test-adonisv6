import useSubscribe from '@/hooks/useSubscribe'
import UserItem from './UserItem'

export default function UserList() {
  const users = useSubscribe<User>('user_connected')

  return (
    <ul
      css={{
        height: '100%',
        width: '350px',
        fontSize: '.85em',
        padding: '.85em',
        display: 'block',
        overflow: 'auto',
        border: '1px solid #dadce0',
      }}
    >
      {users.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </ul>
  )
}
