import { TransmitContext } from '../contexts/transmitContext'
import { useContext } from 'react'

const useTransmit = () => useContext(TransmitContext)
export default useTransmit
