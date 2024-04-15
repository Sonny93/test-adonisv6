import { useEffect } from 'react'
import useTransmit from './useTransmit.js'

export default function useSubscribe<T>(channel: string, onNewData: (data: T) => void): void {
  const { transmit } = useTransmit()
  useEffect(() => {
    const subscription = transmit.subscription(channel)
    subscription.create().then(() => {
      subscription.onMessage((newData: T) => setTimeout(() => onNewData(newData)))
    })
    return () => {
      subscription.delete()
    }
  }, [])
}
