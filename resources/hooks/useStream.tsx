import { useState } from 'react'

type MediaStreamOptions = DisplayMediaStreamOptions & {
  screenShare?: boolean
}

export default function useStream(
  options: MediaStreamOptions = {
    video: true,
    audio: false,
    screenShare: false,
  }
) {
  const [stream, setStream] = useState<MediaStream>(null)

  async function createStream() {
    const stream = await (options.screenShare
      ? navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 60 } })
      : navigator.mediaDevices.getUserMedia(options))
    setStream(stream)
    return stream
  }

  const stopStream = () => stream?.getTracks().forEach((track) => track.stop())

  return {
    createStream,
    stopStream,
    stream,
  }
}
