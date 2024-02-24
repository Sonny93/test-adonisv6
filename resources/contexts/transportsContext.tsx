import type { Transport } from 'mediasoup-client/lib/types'
import { createContext, useState, type ReactNode } from 'react'

type TransportsContextType = {
  transports: Transport[]
  addTransport: (message: Transport) => void
  removeTransport: (message: Transport) => void
}

const iTransportsContextState = {
  transports: [],
  addTransport: () => {},
  removeTransport: () => {},
}

export const TransportsContext = createContext<TransportsContextType>(iTransportsContextState)

export function TransportsContextProvider({
  children,
  transports: transportsParam,
}: {
  children: ReactNode
  transports: TransportsContextType['transports']
}) {
  const [transports, setTransports] = useState<Transport[]>(transportsParam)
  const handleAddTransport = (transport: Transport) =>
    setTransports((transports) => {
      const newTransports = [...transports]
      newTransports.push(transport)
      return newTransports
    })

  const handleRemoveTransport = (transport: Transport) => {
    setTransports((_transports) => {
      const transportIndex = _transports.findIndex((m) => m.id === transport.id)
      if (transportIndex !== -1) {
        _transports.splice(transportIndex, 1)
      }
      return _transports
    })
  }

  return (
    <TransportsContext.Provider
      value={{
        transports,
        addTransport: handleAddTransport,
        removeTransport: handleRemoveTransport,
      }}
    >
      {children}
    </TransportsContext.Provider>
  )
}
