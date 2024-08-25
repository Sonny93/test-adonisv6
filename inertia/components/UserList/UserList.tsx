import useSubscribe from '@/hooks/useSubscribe';
import { useState } from 'react';
import UserItem from './UserItem.js';

type EventData = {
  uid: string;
};

export default function UserList() {
  const [users, setUsers] = useState<string[]>([]);
  useSubscribe<EventData>('user_connected', ({ uid }) => {
    setUsers((users) => [...users, uid]);
  });
  useSubscribe<EventData>('user_disconnected', ({ uid }) => {
    setUsers((users) => {
      const userIndex = users.indexOf(uid);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
      }
      return users;
    });
  });

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
        <UserItem user={user} key={user} />
      ))}
    </ul>
  );
}
