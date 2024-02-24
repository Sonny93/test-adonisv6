import { Transmit } from '@adonisjs/transmit-client'
import { createContext, useMemo, type ReactNode } from 'react'

type TransmitContextType = {
  transmit: Transmit
}

const iTransmitContextState = {
  transmit: undefined,
}

export const TransmitContext = createContext<TransmitContextType>(iTransmitContextState)

export function TransmitContextProvider({ children }: { children: ReactNode }) {
  const transmit = useMemo(
    () =>
      new Transmit({
        baseUrl: window.location.origin,
        removeSubscriptionOnZeroListener: true,
        maxReconnectAttempts: Infinity,
        onReconnectAttempt: (attempt) => console.log('Connection lost, attempt', attempt),
      }),
    []
  )
  return <TransmitContext.Provider value={{ transmit }}>{children}</TransmitContext.Provider>
}
