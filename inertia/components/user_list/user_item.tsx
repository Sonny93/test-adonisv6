import { Avatar, List, Text, ThemeIcon } from '@mantine/core';
import { useAuth } from '~/hooks/use_auth';
import { User } from '~/types';

export function UserItem({ user }: { user: User }) {
  const authUser = useAuth();
  const isCurrentUser = authUser?.user?.id === user.id;

  return (
    <List.Item
      key={user.id}
      icon={
        <ThemeIcon color="blue" size={24} radius="xl">
          <Avatar src={user.avatarUrl} size={24} />
        </ThemeIcon>
      }
    >
      {user.nickName} {isCurrentUser && <Text c="dimmed">(You)</Text>}
    </List.Item>
  );
}
