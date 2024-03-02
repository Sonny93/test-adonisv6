import type { MediaTransportsContextType } from '@/contexts/mediaTransportsContext'
import useUser from '@/hooks/useUser'
import type { MediaTransport } from '@/types/transport'
import styled from '@emotion/styled'
import type { Transport } from 'mediasoup-client/lib/Transport'
import { useEffect, useRef, useState } from 'react'
import RoundedImage from '../RoundedImage'

const OverlayElement = styled.div({
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
})

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
  const [canAutoPlay, setCanAutoPlay] = useState<boolean>(true)

  const playVideo = () => videoRef.current.play().catch(() => setCanAutoPlay(false))

  useEffect(() => {
    videoRef.current.srcObject = stream
    playVideo()

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
        {videoLoading && <OverlayElement>Loading</OverlayElement>}
        {!videoLoading && !canAutoPlay && (
          <OverlayElement>
            <button
              onClick={() => {
                setCanAutoPlay(true)
                playVideo()
              }}
            >
              Click to play video
            </button>
          </OverlayElement>
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
