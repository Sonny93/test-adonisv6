import type { Device } from 'mediasoup-client';
import type {
  ConnectionState,
  RtpParameters,
} from 'mediasoup-client/lib/types';
import { Channel } from '~/types/index.js';
import { createTransport, handleConnect } from './transport.js';

export async function handleCreateProduceTransport({
  channel,
  device,
  stream,
  onStateChange,
}: {
  channel: Channel;
  device: Device;
  stream: MediaStream;
  onStateChange?: (connState: ConnectionState) => void;
}) {
  const routerTransport = await createTransport(channel.id, 'send');
  const transport = device.createSendTransport(routerTransport);

  onStateChange && transport.on('connectionstatechange', onStateChange);
  transport.once('connect', (...args) =>
    handleConnect(channel, 'send', ...args)
  );
  transport.on('produce', (...args) => handleProduce(channel, device, ...args));

  const videoTrack = stream.getTracks()[0];
  transport.produce({ track: videoTrack });

  return transport;
}

function handleProduce(
  channel: Channel,
  device: Device,
  { kind, rtpParameters }: { kind: any; rtpParameters: RtpParameters },
  callback: (produceId: { id: string }) => void,
  errback: (error: Error) => void
) {
  fetch(`/transport/${channel.id}/produce`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rtpParameters,
      kind,
      clientRtpCapabilities: device.rtpCapabilities,
    }),
  })
    .then((response) => response.json())
    .then(({ produceId }) => callback({ id: produceId }))
    .catch(errback);
}
