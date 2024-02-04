import { createContext, type ReactNode } from 'react'

type MessagesContextType = {
  messages: Message[]
}

const iMessagesContextState = {
  messages: [],
}

export const MessagesContext = createContext<MessagesContextType>(iMessagesContextState)

export function MessagesContextProvider({
  children,
  messages,
}: {
  children: ReactNode
  messages: MessagesContextType['messages']
}) {
  return <MessagesContext.Provider value={{ messages }}>{children}</MessagesContext.Provider>
}
