import { List, ThemeIcon } from '@mantine/core';
import { useState } from 'react';
import useChannel from '~/hooks/useChannel.js';
import useSubscribe from '~/hooks/useSubscribe';
import type { User } from '~/types/index.js';

import { CiUser } from 'react-icons/ci';
import { UserItem } from '~/components/user_list/user_item';

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
        if (userIndex !== -1) {
          newNusers.splice(userIndex, 1);
        }
        return newNusers;
      });
    }
  );

  return (
    <List
      spacing="xs"
      center
      icon={
        <ThemeIcon size={24} radius="xl">
          <CiUser />
        </ThemeIcon>
      }
    >
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </List>
  );
}
