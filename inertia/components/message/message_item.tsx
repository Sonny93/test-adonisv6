import { Avatar, Box, Group, Text } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MessageDate } from '~/components/message/message_item_date';
import { Message } from '~/types/index.js';
dayjs.extend(relativeTime);

interface MessageItemProps {
  message: Message;
}
export function MessageItem({ message }: Readonly<MessageItemProps>) {
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
          <MessageDate message={message} />
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
