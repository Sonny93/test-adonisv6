import { useEffect } from 'react'
import useTransmit from './useTransmit'

export default function useSubscribe<T>(channel: string, onNewData: (data: T) => void): void {
  const { transmit } = useTransmit()
  useEffect(() => {
    const unsubscribe = transmit.listenOn(channel, (newData: T) =>
      setTimeout(() => onNewData(newData))
    )
    return () => unsubscribe(true)
  }, [])
}
