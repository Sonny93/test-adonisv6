import { useState } from 'react';
import useChannel from '~/hooks/useChannel';
import useRtpDevice from '~/hooks/useRtpDevice';
import useStream from '~/hooks/useStream';
import { useAuth } from '~/hooks/use_auth.js';
import { handleCreateProduceTransport } from '~/lib/produce_transport.js';
import type { MediaTransport } from '~/types/transport';
import { MediaTransportVideo } from './media_transport_video.js';

export default function ButtonProduceVideo() {
  const { createStream } = useStream({ screenShare: true });
  const { channel } = useChannel();
  const { device } = useRtpDevice();
  const { user } = useAuth();

  const [mediaTransport, setMediaTransport] = useState<MediaTransport | null>(
    null
  );

  async function handleClick() {
    const stream = await createStream();
    const transport = await handleCreateProduceTransport({
      channel,
      device,
      stream,
    });

    setMediaTransport({ stream, transport, user: user!, kind: 'video' });
  }

  function handleClose() {
    mediaTransport?.transport?.close();
    mediaTransport?.stream?.getTracks().forEach((track) => track.stop());
    setMediaTransport(null);
  }

  return (
    <>
      {!mediaTransport ? (
        <button onClick={handleClick}>Screen share</button>
      ) : (
        <button onClick={handleClose}>Stop screen share</button>
      )}
      {mediaTransport && (
        <MediaTransportVideo
          {...mediaTransport}
          key={mediaTransport.stream.id}
        />
      )}
    </>
  );
}
