import { useEffect, useState } from 'react'
import useTransmit from './useTransmit'

export default function useSubscribe<T>(
  channel: string,
  { onNewData }: { onNewData?: (data: T) => void } = {}
): T[] {
  const { transmit } = useTransmit()
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    transmit.listenOn(channel, (newData: T) => {
      setData((prevData) => [...prevData, newData])
      onNewData && setTimeout(() => onNewData(newData))
    })
  }, [])

  return data
}
