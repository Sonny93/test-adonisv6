import { Stack } from '@mantine/core';
import { useRef } from 'react';
import useChannel from '~/hooks/useChannel';
import useMessages from '~/hooks/useMessages';
import useNewMessageEvent from '~/hooks/useNewMessageEvent';
import { MessageItem } from './message_item.js';

export default function MessageList() {
  const { messages, addMessage } = useMessages();
  const { channel } = useChannel();
  const ref = useRef<HTMLDivElement>(null);

  const scrollBottom = (smooth = true) =>
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant',
    });
  useNewMessageEvent(channel.id, (message) => {
    addMessage(message);
    setTimeout(scrollBottom);
  });

  return (
    <Stack ref={ref}>
      {messages.map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
    </Stack>
  );
}
