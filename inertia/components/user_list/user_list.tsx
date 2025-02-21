import { useState } from 'react';
import useChannel from '~/hooks/useChannel.js';
import useSubscribe from '~/hooks/useSubscribe';
import type { User } from '~/types/index.js';
import { UserItem } from './user_item.js';

type NewUserData = {
  user: User;
};

type RemoveUserData = {
  userId: User['id'];
};

export function UserList(props: { users: User[] }) {
  const [users, setUsers] = useState<User[]>(props.users);
  const { channel } = useChannel();

  useSubscribe<NewUserData>(`user_connected/${channel.id}`, ({ user }) => {
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex === -1) {
      setUsers((users) => [...users, user]);
    }
  });
  useSubscribe<RemoveUserData>(
    `user_disconnected/${channel.id}`,
    ({ userId }) => {
      setUsers((propsUsers) => {
        const newNusers = [...propsUsers];
        const userIndex = newNusers.findIndex((u) => u.id === userId);
        console.log('remove', newNusers, userId, userIndex);
        if (userIndex !== -1) {
          newNusers.splice(userIndex, 1);
        }
        return newNusers;
      });
    }
  );

  return (
    <ul>
      {users.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </ul>
  );
}
