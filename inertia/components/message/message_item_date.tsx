import { Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useTime } from '~/hooks/use_time';
import { Message } from '~/types';

interface MessageDateProps {
  message: Message;
}
export function MessageDate({ message }: MessageDateProps) {
  const currentTime = useTime();
  const createdAt = dayjs(message.createdAt).from(dayjs(currentTime));
  const updatedAt = dayjs(message.updatedAt).from(dayjs(currentTime));

  if (createdAt === updatedAt) {
    return (
      <Text c="dimmed" size="xs">
        {createdAt}
      </Text>
    );
  }

  return (
    <Text c="dimmed" size="xs">
      {createdAt} (edited {updatedAt})
    </Text>
  );
}
