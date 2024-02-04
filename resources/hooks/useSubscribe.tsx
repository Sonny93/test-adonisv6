import { useEffect, useState } from 'react'
import useTransmit from './useTransmit'

export default function useSubscribe<T>(
  channel: string,
  { initData = [], onNewData }: { initData?: T[]; onNewData?: (data: T) => void } = {}
): T[] {
  const { transmit } = useTransmit()
  const [data, setData] = useState<T[]>(initData)

  useEffect(() => {
    const unsubscribe = transmit.listenOn(channel, (newData: T) => {
      setData((prevData) => [...prevData, newData])
      onNewData && setTimeout(() => onNewData(newData))
    })
    return () => unsubscribe(true)
  }, [])

  return data
}
