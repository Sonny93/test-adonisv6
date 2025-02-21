import { Avatar, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MessageDate } from '~/components/message/message_item_date.js';
import { Message } from '~/types/index.js';
dayjs.extend(relativeTime);

export function MessageItem({ message }: Readonly<{ message: Message }>) {
  const { author: user, type, content } = message;
  if (type === 'system') {
    return <MessageItemSystem content={content} />;
  }

  return (
    <li>
      <Avatar
        src={user?.avatarUrl}
        alt={`${user?.nickName}'s avatar`}
        size={24}
      />
      <Stack>
        <Text>
          {user?.nickName} - <MessageDate message={message} />
        </Text>
        <Text>{content}</Text>
      </Stack>
    </li>
  );
}

function MessageItemSystem({ content }: { content: string }) {
  return (
    <li>
      <Text c="dimmed">system - {content}</Text>
    </li>
  );
}
