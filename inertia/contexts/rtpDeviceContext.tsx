import { Device } from 'mediasoup-client'
import type { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters'
import { createContext, useEffect, useState, type ReactNode } from 'react'

type RtpDeviceContextType = {
  device: Device
}

const iRtpDeviceContextState = {
  device: undefined,
}

export const RtpDeviceContext = createContext<RtpDeviceContextType>(iRtpDeviceContextState)

export function RtpDeviceContextProvider({
  children,
  routerRtpCapabilities,
}: {
  children: ReactNode
  routerRtpCapabilities: RtpCapabilities
}) {
  const [device, setDevice] = useState<Device | null>(null)

  useEffect(() => {
    if (device) return
    const newDevice = new Device()

    newDevice.load({ routerRtpCapabilities }).then(() => setDevice(newDevice))
  }, [])

  return (
    device?.loaded && (
      <RtpDeviceContext.Provider value={{ device }}>{children}</RtpDeviceContext.Provider>
    )
  )
}
