import useChannel from '@/hooks/useChannel'
import useRtpDevice from '@/hooks/useRtpDevice'
import useStream from '@/hooks/useStream'
import useUser from '@/hooks/useUser'
import { handleCreateProduceTransport } from '@/lib/produce-transport.js'
import type { MediaTransport } from '@/types/transport'
import { useState } from 'react'
import MediaTransportVideo from './MediaTransportVideo.js'

export default function ButtonProduceVideo() {
  const { createStream } = useStream({ screenShare: true })
  const { channel } = useChannel()
  const { device } = useRtpDevice()
  const { user } = useUser()

  const [mediaTransport, setMediaTransport] = useState<MediaTransport>(null)

  async function handleClick() {
    const stream = await createStream()
    const transport = await handleCreateProduceTransport({
      channel,
      device,
      stream,
    })

    setMediaTransport({ stream, transport, user, kind: 'video' })
  }

  function handleClose() {
    mediaTransport?.transport?.close()
    mediaTransport?.stream?.getTracks().forEach((track) => track.stop())
    setMediaTransport(null)
  }

  return (
    <>
      {!mediaTransport ? (
        <button onClick={handleClick}>Screen share</button>
      ) : (
        <button onClick={handleClose}>Stop screen share</button>
      )}
      {mediaTransport && <MediaTransportVideo {...mediaTransport} key={mediaTransport.stream.id} />}
    </>
  )
}
