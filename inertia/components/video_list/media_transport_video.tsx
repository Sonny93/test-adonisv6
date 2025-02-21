import { Avatar, Box, Button, Group, Stack, Text } from '@mantine/core';
import type { Transport } from 'mediasoup-client/lib/Transport';
import { useEffect, useRef, useState } from 'react';
import type { MediaTransportsContextType } from '~/contexts/mediaTransportsContext';
import { useAuth } from '~/hooks/use_auth';
import type { MediaTransport } from '~/types/transport';

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        color: '#fff',
        fontSize: 24,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

export function MediaTransportVideo({
  stream,
  transport,
  user,
  kind,
  producerId,
  removeMediaTransport,
}: MediaTransport & {
  removeMediaTransport?: MediaTransportsContextType['removeMediaTransport'];
}) {
  const { user: currentUser } = useAuth();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [connectionState, setConnectionState] = useState<
    Transport['connectionState']
  >(transport.connectionState);

  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [canAutoPlay, setCanAutoPlay] = useState<boolean>(true);

  const playVideo = () =>
    videoRef.current!.play().catch(() => setCanAutoPlay(false));

  useEffect(() => {
    videoRef.current!.srcObject = stream;
    playVideo();

    transport.on(
      'connectionstatechange',
      (connState: Transport['connectionState']) => {
        setConnectionState(connState);
        if (
          connState !== 'new' &&
          connState !== 'connecting' &&
          connState !== 'connected'
        ) {
          removeMediaTransport &&
            removeMediaTransport({
              kind,
              user,
              producerId: producerId!,
            });
        }
      }
    );
  }, []);

  return (
    <Stack gap="xs">
      <Box
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <video
          style={{ width: '100%' }}
          ref={videoRef}
          onCanPlayThrough={() => setVideoLoading(false)}
        />
        {videoLoading && <Overlay>Loading</Overlay>}
        {!videoLoading && !canAutoPlay && (
          <Overlay>
            <Button
              onClick={() => {
                setCanAutoPlay(true);
                playVideo();
              }}
            >
              Click to play video
            </Button>
          </Overlay>
        )}
      </Box>
      <Text>Conn. state: {connectionState}</Text>
      <Group>
        <Avatar src={user?.avatarUrl} size={24} />
        <Text>
          {user?.name} {currentUser.id === user.id && '(you)'}
        </Text>
      </Group>
    </Stack>
  );
}
