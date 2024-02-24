import { TransportsContext } from '@/contexts/transportsContext'
import { useContext } from 'react'

export default function useTransports() {
  return useContext(TransportsContext)
}
