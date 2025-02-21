import dayjs from 'dayjs';
import { Message } from '~/types';

export function MessageDate({ message }: { message: Message }) {
  const { createdAt, updatedAt } = message;
  if (createdAt === updatedAt) {
    return <>{dayjs(createdAt).fromNow()}</>;
  }

  return (
    <>
      {dayjs(createdAt).fromNow()} (edited {`${dayjs(updatedAt).fromNow()}`})
    </>
  );
}
