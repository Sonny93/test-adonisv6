import type { Producer } from 'mediasoup-client/lib/Producer';
import { useEffect } from 'react';
import ButtonProduceVideo from '~/components/video_list/button_produce_video.js';
import useChannel from '~/hooks/useChannel';
import useMediaTransports from '~/hooks/useMediaTransports';
import useRtpDevice from '~/hooks/useRtpDevice';
import useSubscribe from '~/hooks/useSubscribe';
import useUser from '~/hooks/useUser';
import {
  handleConsume,
  handleCreateConsumeTransport,
} from '~/lib/consume-transport.js';
import type { NewMediaTransport } from '~/types/transport';
import { MediaTransportVideo } from './media_transport_video.js';

export function VideoList({ producers }: { producers: NewMediaTransport[] }) {
  const { channel } = useChannel();
  const { device } = useRtpDevice();
  const { user } = useUser();

  const { mediaTransports, addMediaTransport, removeMediaTransport } =
    useMediaTransports();

  const handleOui = async (data: NewMediaTransport) => {
    if (user?.id === data.user.id)
      return console.info('ignore current user', data);
    const { stream, transport } = await createConsumeTransport(data.producerId);
    addMediaTransport({
      stream,
      transport,
      kind: data.kind,
      user: data.user,
      producerId: data.producerId,
    });
  };
  useEffect(() => {
    producers.forEach(handleOui);
  }, []);

  useSubscribe<NewMediaTransport>(`channels/${channel.id}/produce`, handleOui);

  useSubscribe<NewMediaTransport>(
    `channels/${channel.id}/produce/stop`,
    async (data) => {
      if (user?.id === data.user.id)
        return console.info('ignore current user', data);
      removeMediaTransport(data);
    }
  );

  const createConsumeTransport = async (producerId: Producer['id']) => {
    const transport = await handleCreateConsumeTransport({
      channel,
      device,
    });

    const data = await handleConsume(channel, {
      clientRtpCapabilities: device.rtpCapabilities,
      producerId: producerId,
    });
    const consumer = await transport.consume({
      id: data.consumerId,
      producerId: producerId,
      rtpParameters: data.rtpParameters,
      kind: 'video',
    });

    return { transport, stream: new MediaStream([consumer.track]), consumer };
  };

  return (
    <ul>
      <li>
        <ButtonProduceVideo />
      </li>
      {mediaTransports.map((mediaTransport) => (
        <li key={mediaTransport.stream.id}>
          <MediaTransportVideo
            {...mediaTransport}
            removeMediaTransport={removeMediaTransport}
          />
        </li>
      ))}
    </ul>
  );
}
