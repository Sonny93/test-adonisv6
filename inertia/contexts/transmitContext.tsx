import { Transmit } from '@adonisjs/transmit-client';
import { createContext, useMemo, type ReactNode } from 'react';

type TransmitContextType = {
  transmit: Transmit;
};

const iTransmitContextState = {
  transmit: undefined,
};

export const TransmitContext = createContext<TransmitContextType>(
  iTransmitContextState as any
);

export function TransmitContextProvider({ children }: { children: ReactNode }) {
  const transmit = useMemo(
    () =>
      typeof window !== 'undefined' &&
      new Transmit({
        baseUrl: window.location.origin,
        maxReconnectAttempts: Infinity,
        onReconnectAttempt: (attempt) =>
          console.log('Connection lost, attempt', attempt),
      }),
    []
  );
  return (
    transmit && (
      <TransmitContext.Provider value={{ transmit }}>
        {children}
      </TransmitContext.Provider>
    )
  );
}
