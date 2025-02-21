import { createContext, useState, type ReactNode } from 'react';
import { Message } from '~/types';

type MessagesContextType = {
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (message: Message) => void;
};

const iMessagesContextState = {
  messages: [],
  addMessage: () => {},
  removeMessage: () => {},
};

export const MessagesContext = createContext<MessagesContextType>(
  iMessagesContextState
);

export function MessagesContextProvider({
  children,
  messages: messagesParam,
}: {
  children: ReactNode;
  messages: MessagesContextType['messages'];
}) {
  const [messages, setMessages] = useState<Message[]>(messagesParam);
  const handleAddMessage = (message: Message) =>
    setMessages((messages) => [...messages, message]);
  const handleRemoveMessage = (message: Message) => {
    setMessages((_messages) => {
      const messageIndex = _messages.findIndex((m) => m.id === message.id);
      if (messageIndex !== -1) {
        _messages.splice(messageIndex, 1);
      }
      return _messages;
    });
  };

  return (
    <MessagesContext.Provider
      value={{
        messages: messages,
        addMessage: handleAddMessage,
        removeMessage: handleRemoveMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
