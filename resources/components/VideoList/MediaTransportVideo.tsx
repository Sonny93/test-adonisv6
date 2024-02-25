import type { MediaTransportsContextType } from '@/contexts/mediaTransportsContext'
import useUser from '@/hooks/useUser'
import type { MediaTransport } from '@/types/transport'
import type { Transport } from 'mediasoup-client/lib/Transport'
import { useEffect, useRef, useState } from 'react'
import RoundedImage from '../RoundedImage'

export default function MediaTransportVideo({
  stream,
  transport,
  user,
  kind,
  producerId,
  removeMediaTransport,
}: MediaTransport & { removeMediaTransport?: MediaTransportsContextType['removeMediaTransport'] }) {
  const { user: currentUser } = useUser()

  const videoRef = useRef<HTMLVideoElement>(null)
  const [connectionState, setConnectionState] = useState<Transport['connectionState']>(
    transport.connectionState
  )

  const [videoLoading, setVideoLoading] = useState<boolean>(true)

  useEffect(() => {
    videoRef.current.srcObject = stream
    videoRef.current.play()
    transport.on('connectionstatechange', (connState: Transport['connectionState']) => {
      setConnectionState(connState)
      if (connState !== 'new' && connState !== 'connecting' && connState !== 'connected') {
        removeMediaTransport &&
          removeMediaTransport({
            kind,
            user,
            producerId,
          })
      }
    })
  }, [])

  return (
    <>
      <div css={{ position: 'relative', borderRadius: '5px', overflow: 'hidden' }}>
        <video
          css={{ width: '100%' }}
          ref={videoRef}
          onCanPlayThrough={() => setVideoLoading(false)}
        />
        {videoLoading && (
          <div
            css={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              color: '#fff',
              fontSize: '24px',
              backgroundColor: 'rgba(0, 0, 0, .5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Loading
          </div>
        )}
      </div>
      <p>Conn. state: {connectionState}</p>
      <p css={{ display: 'flex', gap: '.35em', alignItems: 'center' }}>
        <RoundedImage src={user.avatarUrl} size={24} /> {user.name}{' '}
        {currentUser.id === user.id && '(you)'}
      </p>
    </>
  )
}
