import { Avatar, Group, Text } from '@mantine/core';
import { useEffect } from 'react';
import { User } from '~/types/index.js';

export function TypingItem({
  user,
  expiration,
  removeUser,
}: {
  user: User;
  expiration: number;
  removeUser: (user: User) => void;
}) {
  useEffect(() => {
    const hideIn = expiration - Date.now();
    if (Math.sign(hideIn) !== 1) {
      removeUser(user);
    } else {
      const timeout = setTimeout(() => removeUser(user), hideIn);
      return () => clearTimeout(timeout);
    }
  }, [expiration]);

  return (
    <Group gap={2}>
      <Avatar src={user.avatarUrl} size="xs" />
      <Text size="xs">{user.nickName}</Text>
    </Group>
  );
}
