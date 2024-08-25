import { createContext, type ReactNode } from 'react';

type ChannelContextType = {
  channel: Channel;
};

const iChannelContextState = {
  channel: undefined,
};

export const ChannelContext =
  createContext<ChannelContextType>(iChannelContextState);

export function ChannelContextProvider({
  children,
  channel,
}: {
  children: ReactNode;
  channel: ChannelContextType['channel'];
}) {
  return (
    <ChannelContext.Provider value={{ channel }}>
      {children}
    </ChannelContext.Provider>
  );
}
