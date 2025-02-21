import { Avatar, Box, Group, Text } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Message } from '~/types/index.js';
dayjs.extend(relativeTime);

export function MessageItem({ message }: Readonly<{ message: Message }>) {
  const { author: user, type, content } = message;
  if (type === 'system') {
    return <MessageItemSystem content={content} />;
  }

  return (
    <Box>
      <Group>
        <Avatar src={user?.avatarUrl} alt={user?.nickName} />
        <div>
          <Text size="sm">{user?.nickName}</Text>
          <Text size="xs" c="dimmed">
            {dayjs(message.createdAt).fromNow()}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {content}
      </Text>
    </Box>
  );
}

function MessageItemSystem({ content }: { content: string }) {
  return (
    <li>
      <Text c="dimmed">system - {content}</Text>
    </li>
  );
}
