import { MessagesContext } from '@/contexts/messagesContext';
import { useContext } from 'react';

export default function useMessages() {
  return useContext(MessagesContext);
}
