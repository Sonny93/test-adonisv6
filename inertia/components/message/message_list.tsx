import { useEffect, useRef } from 'react';
import useChannel from '~/hooks/useChannel';
import useMessages from '~/hooks/useMessages';
import useNewMessageEvent from '~/hooks/useNewMessageEvent';
import { MessageItem } from './message_item.js';

export default function MessageList() {
  const { messages, addMessage } = useMessages();
  const { channel } = useChannel();
  const ref = useRef<HTMLUListElement>(null);

  const scrollBottom = (smooth = true) =>
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant',
    });
  useNewMessageEvent(channel.id, (message) => {
    addMessage(message);
    setTimeout(scrollBottom);
  });

  useEffect(() => scrollBottom(false), []);

  return (
    <ul ref={ref}>
      {messages.map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
    </ul>
  );
}
