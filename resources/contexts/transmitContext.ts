import type { Transmit } from '@adonisjs/transmit-client'
import { createContext } from 'react'

type TransmitContextType = {
  transmit: Transmit
}

const iTransmitContextState = {
  transmit: undefined,
}

const TransmitContext = createContext<TransmitContextType>(iTransmitContextState)

export default TransmitContext
